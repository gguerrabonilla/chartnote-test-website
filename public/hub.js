(function () {
  var SIGNUP = "https://chartnote.com/welcome?mode=signup";
  var LIVE_DEMO = "https://chartnote.com/";

  document.querySelectorAll('.cui-dropdown[role="button"]').forEach(function (el) {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
  });

  var drawer = document.querySelector(".cui-landing-drawer");
  document.querySelectorAll(".cui-icon-button.drawer-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (drawer) drawer.classList.toggle("opened");
    });
  });
  document.querySelectorAll(".footer-close-drawer-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (drawer) drawer.classList.remove("opened");
    });
  });
  if (drawer) {
    drawer.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (link) drawer.classList.remove("opened");
    });
  }

  var cookie = document.getElementById("chartnote-cookie-conscent");
  if (cookie) {
    try {
      if (localStorage.getItem("cn-cookie")) cookie.remove();
    } catch (err) {}
    cookie.querySelectorAll('[role="button"], .cui-button').forEach(function (btn) {
      btn.addEventListener("click", function () {
        try {
          localStorage.setItem("cn-cookie", "1");
        } catch (err) {}
        cookie.remove();
      });
    });
  }

  document.addEventListener("click", function (event) {
    var el = event.target.closest("button, a, [role='button']");
    if (!el || el.closest("#chartnote-cookie-conscent") || el.closest(".vfm")) return;
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    var href = el.getAttribute && el.getAttribute("href");
    if (/^(Sign up for free|Start Free|Free Trial|Create a free account|Start dictating for free)$/i.test(text)) {
      if (href && href.indexOf("chartnote.com/welcome") !== -1) return;
      event.preventDefault();
      window.location.href = SIGNUP;
      return;
    }
    var opensLiveDemo =
      el.closest(".mic-button") ||
      /^(Try demo|Try it with a real patient note)$/i.test(text);
    if (opensLiveDemo) {
      if (href === LIVE_DEMO && el.getAttribute("target") === "_blank") return;
      event.preventDefault();
      window.open(LIVE_DEMO, "_blank", "noopener,noreferrer");
    }
  });

  document.querySelectorAll("[data-video-id]").forEach(function (el) {
    el.addEventListener("click", function () {
      openVideo(el.getAttribute("data-video-id"));
    });
  });

  function modal() {
    return document.querySelector(".vfm");
  }

  function openVideo(id) {
    var root = modal();
    if (!root || !id) return;
    var iframe = root.querySelector("iframe");
    if (iframe) {
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1";
    }
    root.style.display = "block";
    var overlay = root.querySelector(".vfm__overlay");
    var container = root.querySelector(".vfm__container");
    if (overlay) overlay.style.display = "block";
    if (container) container.style.display = "flex";
  }

  function closeVideo() {
    var root = modal();
    if (!root) return;
    root.style.display = "none";
    var iframe = root.querySelector("iframe");
    if (iframe) iframe.src = "";
    var overlay = root.querySelector(".vfm__overlay");
    var container = root.querySelector(".vfm__container");
    if (overlay) overlay.style.display = "none";
    if (container) container.style.display = "none";
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest(".modal-header-close-button")) closeVideo();
    var closeBtn = event.target.closest(".vfm .cui-button");
    if (closeBtn && /close/i.test(closeBtn.textContent || "")) closeVideo();
    if (event.target.classList && event.target.classList.contains("vfm__overlay")) closeVideo();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeVideo();
  });

  document.querySelectorAll(".button-group").forEach(function (group) {
    group.addEventListener("click", function (event) {
      var btn = event.target.closest(".plan-button");
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll(".plan-button").forEach(function (item) {
        item.classList.remove("active");
      });
      btn.classList.add("active");
      var label = (btn.textContent || "").replace(/\s+/g, " ").trim();
      if (label === "Monthly" || label === "Yearly") {
        var yearly = label === "Yearly";
        document.querySelectorAll("[data-monthly][data-yearly]").forEach(function (price) {
          price.textContent = yearly ? price.getAttribute("data-yearly") : price.getAttribute("data-monthly");
        });
      }
      if (label === "Individual") document.body.classList.remove("show-team-plans");
      if (label === "Team & Enterprise") document.body.classList.add("show-team-plans");
    });
  });

  var faqInput = document.querySelector(".faq-container input");
  if (faqInput) {
    faqInput.addEventListener("input", function () {
      var query = faqInput.value.trim().toLowerCase();
      document.querySelectorAll(".faq-row").forEach(function (row) {
        var haystack = (row.textContent || "").toLowerCase();
        row.style.display = !query || haystack.indexOf(query) !== -1 ? "" : "none";
      });
    });
  }
})();
