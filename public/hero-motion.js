(function () {
  var stage = document.getElementById("intro-stage");
  var panel = document.getElementById("promotion-panel");
  var recording = document.querySelector(".show-card-recording");
  var note = document.querySelector(".show-card-transcription");
  if (!stage || !panel || !recording || !note || typeof window.gsap === "undefined") return;

  var gsap = window.gsap;
  var sidebar = document.getElementById("promotion-sidebar");
  var header = document.querySelector(".fixed-header");
  var lines = recording.querySelectorAll(".show-card-body-item-dialog");
  var sections = note.querySelectorAll(".show-card-body-item-section");
  var above = window.innerWidth >= 1280;
  var phase = 0;
  var busy = false;
  var headerHidden = false;
  var revealed = false;
  var touchY = 0;
  var safetyTimer = null;

  [panel, sidebar, recording, note].concat([].slice.call(lines), [].slice.call(sections)).forEach(function (el) {
    if (!el) return;
    el.style.translate = "";
    el.style.rotate = "";
    el.style.scale = "";
  });

  function hideHeader() {
    if (!header || headerHidden) return;
    headerHidden = true;
    gsap.to(header, { yPercent: -100, opacity: 0, duration: 0.4, ease: "power2.in", force3D: true });
  }
  function showHeader() {
    if (!header || !headerHidden) return;
    headerHidden = false;
    gsap.to(header, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out", force3D: true });
  }
  function slide(next) {
    if (!above || !panel) return;
    busy = true;
    if (next === 1) {
      clearTimeout(safetyTimer);
      hideHeader();
      gsap.to(panel, {
        xPercent: 0,
        duration: 1.25,
        ease: "power1.inOut",
        force3D: true,
        onComplete: function () {
          phase = 1;
          busy = false;
        },
      });
      if (sidebar) gsap.to(sidebar, { x: 0, duration: 1.1, ease: "power2.out", delay: 0.75, force3D: true });
    } else {
      showHeader();
      if (sidebar) gsap.to(sidebar, { x: 200, duration: 0.4, ease: "power2.in", force3D: true });
      gsap.to(panel, {
        xPercent: 100,
        duration: 1.25,
        ease: "power1.inOut",
        force3D: true,
        onComplete: function () {
          phase = 0;
          busy = false;
          clearTimeout(safetyTimer);
          safetyTimer = setTimeout(function () {
            headerHidden = false;
            if (header) gsap.to(header, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out", force3D: true });
          }, 500);
        },
      });
    }
  }

  gsap.set(panel, { x: 0, y: 0, xPercent: 0, yPercent: 0 });
  if (sidebar) gsap.set(sidebar, { x: 0, y: 0, xPercent: 0, yPercent: 0 });
  if (above) {
    gsap.set(panel, { x: 0, xPercent: 100, force3D: true });
    if (sidebar) gsap.set(sidebar, { x: 200, force3D: true });
    window.addEventListener("scroll", function () {
      if (phase === 0 && !busy && window.scrollY > 0) {
        window.scrollTo(0, 0);
        slide(1);
      } else if (phase === 1) {
        if (window.scrollY > 0) {
          revealed = true;
          showHeader();
        } else if (revealed && !busy) {
          revealed = false;
          slide(0);
        } else {
          hideHeader();
        }
      }
    }, { passive: true });
    window.addEventListener("wheel", function (event) {
      if (busy) {
        event.preventDefault();
        return;
      }
      if (phase === 0 && event.deltaY > 0) {
        event.preventDefault();
        slide(1);
      } else if (phase === 1 && event.deltaY < 0 && window.scrollY === 0) {
        event.preventDefault();
        slide(0);
      }
    }, { passive: false });
    window.addEventListener("touchstart", function (event) {
      touchY = event.touches[0].clientY;
    }, { passive: true });
    window.addEventListener("touchmove", function (event) {
      if (busy) {
        event.preventDefault();
        return;
      }
      var delta = touchY - event.touches[0].clientY;
      if (phase === 0 && delta > 20) {
        event.preventDefault();
        slide(1);
      } else if (phase === 1 && delta < -20 && window.scrollY === 0) {
        event.preventDefault();
        slide(0);
      }
    }, { passive: false });
  } else {
    gsap.set(panel, { x: 0, y: 0, xPercent: 0, yPercent: 0, clearProps: "transform" });
    if (sidebar) gsap.set(sidebar, { x: 0, y: 0, xPercent: 0, yPercent: 0, clearProps: "transform" });
  }

  if (!lines.length) return;
  gsap.set(note, { opacity: 0, y: 60, scale: 0.94 });
  gsap.set(lines, { opacity: 0, y: 10 });
  gsap.set(sections, { opacity: 0, y: 12 });
  var timeline = gsap.timeline({ delay: 2.5, repeat: -1, repeatDelay: 1.5 });
  timeline.to(lines, { opacity: 1, y: 0, duration: 0.4, stagger: 0.9, ease: "power2.out" });
  timeline.to({}, { duration: 2.5 });
  timeline.set(recording, { zIndex: 1 });
  timeline.set(note, { zIndex: 2 });
  timeline.to(recording, { opacity: 0.28, scale: 0.94, duration: 0.8, ease: "power2.inOut" });
  timeline.to(note, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power2.out" }, "-=0.5");
  timeline.to(sections, { opacity: 1, y: 0, duration: 0.45, stagger: 0.55, ease: "power2.out" }, "-=0.2");
  timeline.to({}, { duration: 4.5 });
  timeline.to([lines, sections], { opacity: 0, duration: 0.5 });
  timeline.to(note, { opacity: 0, y: 60, scale: 0.94, duration: 0.6 }, "<");
  timeline.to(recording, { opacity: 1, scale: 1, duration: 0.5 }, "<+=0.3");
  timeline.set(recording, { zIndex: 2 });
  timeline.set(note, { zIndex: 1 });
  timeline.set(lines, { y: 10 });
  timeline.set(sections, { y: 12 });
})();
