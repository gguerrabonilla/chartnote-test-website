(function () {
  var LIVE = "https://chartnote.com/";
  var MAX_MS = 60000;
  var CIRC = 2 * Math.PI * 98;
  var open = false;
  var root = null;
  var media = null;
  var chunks = [];
  var blob = null;
  var recording = false;
  var started = 0;
  var timer = null;

  function splitJson(text) {
    var items = [];
    var depth = 0;
    var start = -1;
    var inString = false;
    var escape = false;
    var consumed = 0;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (inString) {
        if (escape) escape = false;
        else if (ch === "\\") escape = true;
        else if (ch === '"') inString = false;
      } else if (ch === '"') inString = true;
      else if (ch === "{") {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === "}" && depth > 0 && --depth === 0) {
        try { items.push(JSON.parse(text.slice(start, i + 1))); } catch (err) {}
        consumed = i + 1;
        start = -1;
      }
    }
    return { items: items, rest: start === -1 ? text.slice(consumed) : text.slice(start) };
  }

  function openLive(event) {
    if (event) event.preventDefault();
    var link = document.createElement("a");
    link.href = LIVE;
    link.target = "_blank";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function setStatus(text) {
    var el = root && root.querySelector("[data-demo-status]");
    if (el) el.textContent = text || "";
  }

  function setRing(elapsed) {
    var fill = root.querySelector(".fill");
    if (!fill) return;
    var offset = CIRC * (1 - Math.min(elapsed / MAX_MS, 1));
    fill.style.strokeDasharray = String(CIRC);
    fill.style.strokeDashoffset = String(offset);
  }

  function stopTracks() {
    if (media) {
      media.getTracks().forEach(function (track) { track.stop(); });
      media = null;
    }
    recording = false;
    clearInterval(timer);
    var mic = root && root.querySelector(".hub-demo-mic");
    if (mic) mic.classList.remove("is-recording");
  }

  async function startRecording() {
    chunks = [];
    blob = null;
    var startSound = root.querySelector("[data-sound-start]");
    if (startSound) startSound.play().catch(function () {});
    media = await navigator.mediaDevices.getUserMedia({
      audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
    });
    var mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
    var recorder = new MediaRecorder(media, mime ? { mimeType: mime, bitsPerSecond: 128000 } : { bitsPerSecond: 128000 });
    recorder.ondataavailable = function (event) {
      if (event.data && event.data.size) chunks.push(event.data);
    };
    recorder.onstop = function () {
      blob = new Blob(chunks, { type: mime || "audio/webm" });
      var button = root.querySelector("[data-generate]");
      if (button) button.disabled = !blob || !blob.size;
    };
    recorder.start(1000);
    root._recorder = recorder;
    recording = true;
    started = Date.now();
    root.querySelector(".hub-demo-mic").classList.add("is-recording");
    setRing(0);
    setStatus("Recording. Click the microphone again to stop.");
    timer = setInterval(function () {
      var elapsed = Date.now() - started;
      setRing(elapsed);
      if (elapsed >= MAX_MS) stopRecording();
    }, 200);
  }

  function stopRecording() {
    var stopSound = root.querySelector("[data-sound-stop]");
    if (stopSound) stopSound.play().catch(function () {});
    if (root._recorder && root._recorder.state !== "inactive") root._recorder.stop();
    stopTracks();
    setStatus(blob ? "Recording ready. Generate the note." : "Recording stopped.");
  }

  async function toggleMic() {
    try {
      if (recording) stopRecording();
      else await startRecording();
    } catch (err) {
      setStatus("Microphone permission is required. Use Continue on chartnote.com if this browser blocks recording here.");
    }
  }

  async function generate() {
    if (!blob) return;
    var button = root.querySelector("[data-generate]");
    button.disabled = true;
    button.textContent = "Generating…";
    showResult(true);
    try {
      await new Promise(function (resolve) { setTimeout(resolve, 1200); });
      var file = new File([blob], "recording.weba", { type: blob.type || "audio/webm" });
      var body = new FormData();
      body.append("fileInfo", file, file.name);
      var response = await fetch("https://chartnote.com/api/copilot/anonymous/stream", { method: "POST", body: body });
      if (!response.ok || !response.body) throw new Error("upstream " + response.status);
      var reader = response.body.getReader();
      var decoder = new TextDecoder();
      var buffer = "";
      var title = "";
      var content = "";
      var inTitle = false;
      var sawBold = false;
      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        var parsed = splitJson(buffer);
        buffer = parsed.rest;
        parsed.items.forEach(function (item) {
          if (item.error) {
            var detail = item.error.detail || item.error.description || "Chartnote could not transcribe that recording.";
            throw new Error(detail);
          }
          if (item.response && item.response.text) {
            var text = item.response.text;
            if (text.indexOf("**") !== -1) {
              if (sawBold) {
                content += text.replace("**", "");
                inTitle = false;
              } else {
                sawBold = true;
                inTitle = true;
              }
            } else if (inTitle) title += text;
            else content += text;
          }
          if (item.fullTitle) title = item.fullTitle;
          if (item.fullContent) content = item.fullContent;
        });
        paintNote(title, content, false);
      }
      if (!title && !content) throw new Error("Chartnote returned an empty note.");
      paintNote(title, content, false);
      root.querySelectorAll("[data-needs-note]").forEach(function (el) { el.disabled = false; });
    } catch (err) {
      var message = String(err && err.message || err);
      var blocked = /failed to fetch|network|proxy|cors/i.test(message);
      paintNote("", blocked
        ? "Recording stays in this browser, but chartnote.com does not yet allow this site to call /api/copilot/anonymous/stream. Continue on chartnote.com to finish the note."
        : message, false);
      if (blocked) {
        var live = root.querySelector("[data-live]");
        if (live) live.hidden = false;
      }
    }
  }

  function paintNote(title, content, loading) {
    var box = root.querySelector("[data-note]");
    if (loading) {
      box.innerHTML = '<div class="hub-demo-loading">Transcribing your recording…</div>';
      return;
    }
    box.innerHTML = (title ? "<h3></h3>" : "") + '<div class="streamed"></div>';
    if (title) box.querySelector("h3").textContent = title;
    box.querySelector(".streamed").textContent = content;
  }

  function showResult(loading) {
    root.querySelector("[data-recorder]").hidden = true;
    root.querySelector("[data-result]").hidden = false;
    paintNote("", "", loading);
  }

  function showRecorder() {
    root.querySelector("[data-recorder]").hidden = false;
    root.querySelector("[data-result]").hidden = true;
    var button = root.querySelector("[data-generate]");
    button.disabled = true;
    button.textContent = "Generate note";
    blob = null;
    chunks = [];
    setRing(0);
    setStatus("");
  }

  function close() {
    stopTracks();
    if (root._recorder && root._recorder.state !== "inactive") root._recorder.stop();
    document.body.style.overflow = "";
    window.__chartnoteDemoOpen = false;
    if (root) root.remove();
    root = null;
    open = false;
  }

  function playIntro(modal) {
    var gsap = window.gsap;
    var intro = modal.querySelector(".hub-demo-intro");
    var phrases = [].slice.call(intro.querySelectorAll(".hub-demo-phrase"));
    var orbA = intro.querySelector(".hub-demo-orb-a");
    var orbB = intro.querySelector(".hub-demo-orb-b");
    var contents = modal.querySelector(".hub-demo-contents");
    var width = modal.offsetWidth;
    var height = modal.offsetHeight;
    var fade = 0.9;
    var move = 1.08;
    var gap = 0.54;
    var fadeIn = 0.144;
    var hold = 0.288;
    var lastOut = 0.55;
    if (!gsap) {
      intro.remove();
      contents.style.opacity = "1";
      return;
    }
    gsap.set(phrases, { opacity: 0 });
    gsap.set([orbA, orbB], { opacity: 0 });
    gsap.set(contents, { opacity: 0 });
    var timeline = gsap.timeline({
      onComplete: function () {
        intro.remove();
        gsap.fromTo(contents, { opacity: 0, scale: 0.92, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.3)" });
      },
    });
    timeline.to([orbA, orbB], { opacity: 1, duration: fade, ease: "power1.in" });
    timeline.to(orbA, { x: width, duration: move, ease: "sine.inOut" }, fade);
    timeline.to(orbA, { y: height, duration: move, ease: "sine.inOut" }, 1.98);
    timeline.to(orbB, { x: -width, duration: move, ease: "sine.inOut" }, fade);
    timeline.to(orbB, { y: -height, duration: move, ease: "sine.inOut" }, 1.98);
    phrases.forEach(function (phrase, index) {
      var at = fade + index * gap;
      var out = index === phrases.length - 1 ? lastOut : 0.108;
      timeline.to(phrase, { opacity: 1, duration: fadeIn, ease: "power1.out" }, at);
      timeline.to(phrase, { opacity: 0, duration: out, ease: index === phrases.length - 1 ? "power2.inOut" : "power1.in" }, at + fadeIn + hold);
    });
    var settle = 2.952;
    timeline.to(orbA, { x: width / 2, y: height / 2, opacity: 0, duration: lastOut, ease: "power3.out" }, settle);
    timeline.to(orbB, { x: -width / 2, y: -height / 2, opacity: 0, duration: lastOut, ease: "power3.out" }, settle);
  }

  function openDemo() {
    if (open) return;
    open = true;
    window.__chartnoteDemoOpen = true;
    document.body.style.overflow = "hidden";
    root = document.createElement("div");
    root.className = "hub-demo";
    root.innerHTML = [
      '<div class="hub-demo-modal" data-modal>',
      '<button type="button" class="hub-demo-close" aria-label="Close">×</button>',
      '<div class="hub-demo-contents">',
      '<h2 class="hub-demo-title">Try <span>AI Scribe</span> in 30 seconds</h2>',
      '<h3 class="hub-demo-subtitle">Tell us about your last patient encounter!<br>We\'ll ask for microphone permission so you can record a short sample.</h3>',
      '<p class="hub-demo-phi">Built for PHI: HIPAA compliant. SOC 2 Type II.</p>',
      '<div class="hub-demo-recorder" data-recorder>',
      '<audio data-sound-start src="/audio/record-indicator.mp3"></audio>',
      '<audio data-sound-stop src="/audio/record-indicator-out.mp3"></audio>',
      '<button type="button" class="hub-demo-mic" aria-label="Record">',
      '<svg viewBox="0 0 200 200" aria-hidden="true"><circle class="track" cx="100" cy="100" r="98"></circle><circle class="fill" cx="100" cy="100" r="98"></circle></svg>',
      '<span class="hub-demo-mic-inner">🎤</span></button>',
      '<button type="button" class="hub-demo-generate" data-generate disabled>Generate note</button>',
      '<p class="hub-demo-status" data-demo-status></p>',
      '</div>',
      '<div class="hub-demo-result" data-result hidden>',
      '<article class="hub-demo-note"><header><span>AI-Generated SOAP Note</span><img src="/_nuxt/img/brand-light.3ec57a3.svg" alt="Chartnote"></header><div class="body" data-note></div></article>',
      '<div class="hub-demo-actions">',
      '<button type="button" data-needs-note data-signup disabled>Get full access to AI Scribe with a free account</button>',
      '<button type="button" data-needs-note data-new disabled>Start a new note</button>',
      '<button type="button" class="hub-demo-generate" data-needs-note data-copy disabled>Copy this note</button>',
      '<button type="button" class="hub-demo-generate" data-live hidden>Continue on chartnote.com</button>',
      '</div></div></div>',
      '<div class="hub-demo-intro" aria-hidden="true">',
      '<div class="hub-demo-orb hub-demo-orb-a"></div><div class="hub-demo-orb hub-demo-orb-b"></div>',
      '<p class="hub-demo-phrase">EXPERIENCE</p><p class="hub-demo-phrase">THE MAGIC</p>',
      '<p class="hub-demo-phrase pop">OF CHARTNOTE</p><p class="hub-demo-phrase pop">AI SCRIBE</p>',
      '</div>',
      '<div class="hub-demo-gate"><div class="hub-demo-gate-card">',
      '<button type="button" class="hub-demo-close" data-gate-close aria-label="Close">×</button>',
      '<h3>Want to keep this note?</h3>',
      '<p>Create a free account to copy, edit and save unlimited notes.</p>',
      '<ul><li>HIPAA compliant</li><li>SOC 2 Type II</li><li>Works with web-based EHRs</li></ul>',
      '<button type="button" class="hub-demo-generate" data-signup>Create a free account</button>',
      '</div></div></div>',
    ].join("");
    document.body.appendChild(root);
    setRing(0);
    var modal = root.querySelector("[data-modal]");
    if (window.gsap) {
      window.gsap.set(root, { opacity: 0 });
      window.gsap.set(modal, { opacity: 0, scale: 0.92, y: 16 });
      window.gsap.timeline()
        .to(root, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(modal, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, "-=0.1");
    }
    playIntro(modal);
    root.addEventListener("click", function (event) {
      if (event.target === root) close();
    });
    root.querySelector(".hub-demo-close").addEventListener("click", close);
    root.querySelector(".hub-demo-mic").addEventListener("click", toggleMic);
    root.querySelector("[data-generate]").addEventListener("click", generate);
    root.querySelector("[data-live]").addEventListener("click", openLive);
    root.querySelector("[data-new]").addEventListener("click", showRecorder);
    root.querySelector("[data-copy]").addEventListener("click", function () {
      root.querySelector(".hub-demo-gate").classList.add("is-open");
    });
    root.querySelector("[data-gate-close]").addEventListener("click", function () {
      root.querySelector(".hub-demo-gate").classList.remove("is-open");
    });
    root.querySelectorAll("[data-signup]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.location.href = "https://chartnote.com/welcome?mode=signup";
      });
    });
  }

  window.chartnoteOpenDemo = openDemo;
})();
