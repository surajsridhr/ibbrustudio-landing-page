/* ============================================================
   IBBRU — live site interactions (static build)
   Replaces the Claude Design runtime with ~150 lines of vanilla JS:
   theme toggle · mobile nav · scroll reveal · selected-work reader
   ============================================================ */
(function () {
  "use strict";

  var page = document.querySelector(".ib-page-bg");
  if (!page) return;

  /* ---------------- theme ---------------- */
  var THEME_KEY = "ibbru-theme";
  function setTheme(t) {
    page.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  setTheme(saved === "light" || saved === "dark" ? saved : "light");

  var themeBtn = document.querySelector(".ib-theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(page.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------------- mobile nav ---------------- */
  var burger = document.querySelector(".ib-burger");
  var panel = document.getElementById("ib-mobile-nav");
  function setNav(open) {
    if (!panel) return;
    panel.style.display = open ? "flex" : "none";
    document.body.classList.toggle("ib-locked", open);
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      var first = panel.querySelector("a");
      if (first) first.focus();
    }
  }
  if (burger && panel) {
    burger.setAttribute("aria-expanded", "false");
    panel.style.display = "none";
    burger.addEventListener("click", function () { setNav(panel.style.display === "none"); });
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 860) setNav(false); });
  }

  /* ---------------- reveal on scroll ---------------- */
  var revealEls = [].slice.call(document.querySelectorAll("[data-reveal]"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function showAll() { revealEls.forEach(function (e) { e.classList.add("ib-in"); }); }

  if (reduce) {
    showAll();
  } else {
    var vh = window.innerHeight || 800;
    revealEls.forEach(function (e) {
      if (e.getBoundingClientRect().top < vh * 0.92) e.classList.add("ib-in");
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("ib-in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      revealEls.forEach(function (e) { if (!e.classList.contains("ib-in")) io.observe(e); });
    } else {
      var check = function () {
        var h = window.innerHeight || 800;
        revealEls.forEach(function (e) {
          if (!e.classList.contains("ib-in") && e.getBoundingClientRect().top < h * 0.92) e.classList.add("ib-in");
        });
      };
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      check();
    }
  }

  /* ---------------- selected work: shelf + reader ---------------- */
  var dataEl = document.getElementById("ib-data");
  var shelf = document.querySelector(".ib-shelf");
  var reader = document.getElementById("ib-reader");
  if (!dataEl || !shelf || !reader) return;

  var groups;
  try { groups = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!groups || !groups.length) return;

  var bookBtns = [].slice.call(shelf.querySelectorAll(".ib-book"));
  bookBtns.forEach(function (b, i) { b.setAttribute("data-book", String(i)); });

  var current = 0;
  var pageIndex = 0;
  var lastBookBtn = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function field(label, body) {
    return '<div class="ib-field"><div class="ib-flabel"><span></span><span>' + label +
      '</span></div><p>' + esc(body) + "</p></div>";
  }

  function render() {
    var book = groups[current];
    var total = book.cases.length;
    pageIndex = Math.max(0, Math.min(pageIndex, total - 1));
    var c = book.cases[pageIndex];

    reader.innerHTML =
      '<div class="ib-open">' +
        '<div class="ib-open-bar">' +
          '<div class="ib-open-bar-title"><span></span><h3>' + esc(book.group) + "</h3></div>" +
          '<button type="button" class="ib-book-close">← Back to shelf</button>' +
        "</div>" +
        '<div class="ib-spread">' +
          '<div class="ib-page ib-page-left">' +
            '<span class="ib-p-num">' + pad(pageIndex + 1) + "</span>" +
            '<h4 class="ib-p-title">' + esc(c.title) + "</h4>" +
            '<p class="ib-p-summary">' + esc(c.summary) + "</p>" +
            (c.metric ? '<span class="ib-p-metric">' + esc(c.metric) + "</span>" : "") +
            (c.image ?
              '<figure class="ib-p-figure"><img src="' + esc(c.image) + '" alt="' + esc(c.imageCaption || "") + '" loading="lazy">' +
              (c.imageCaption ? "<figcaption>" + esc(c.imageCaption) + "</figcaption>" : "") + "</figure>" : "") +
          "</div>" +
          '<div class="ib-page ib-page-right">' +
            field("Problem", c.problem) +
            field("Insight", c.insight) +
            field("Solution", c.solution) +
            field("Impact", c.impact) +
            (c.fullCaseUrl ?
              '<a class="ib-p-fullcase" href="' + esc(c.fullCaseUrl) + '" target="_blank" rel="noopener">' +
              "Read the full case study <span class=\"ib-arrow\">→</span></a>" : "") +
          "</div>" +
          '<div class="ib-page-turn" aria-hidden="true"></div>' +
        "</div>" +
        '<div class="ib-book-nav">' +
          '<button type="button" class="ib-nav-btn" data-nav="prev"' +
            (pageIndex <= 0 ? " disabled" : "") +
            '><span class="ib-arrow" style="transform:rotate(180deg)">→</span> Prev</button>' +
          '<span class="ib-page-count">' + pad(pageIndex + 1) + " / " + pad(total) + "</span>" +
          '<button type="button" class="ib-nav-btn" data-nav="next"' +
            (pageIndex >= total - 1 ? " disabled" : "") +
            '>Next <span class="ib-arrow">→</span></button>' +
        "</div>" +
      "</div>";

    var closeBtn = reader.querySelector(".ib-book-close");
    if (closeBtn) closeBtn.focus();
  }

  function openBook(idx) {
    current = idx;
    pageIndex = 0;
    lastBookBtn = (document.activeElement && document.activeElement.classList.contains("ib-book"))
      ? document.activeElement : null;
    shelf.hidden = true;
    reader.hidden = false;
    render();
  }

  function closeBook() {
    reader.hidden = true;
    reader.innerHTML = "";
    shelf.hidden = false;
    if (lastBookBtn) lastBookBtn.focus();
  }

  shelf.addEventListener("click", function (e) {
    var btn = e.target.closest(".ib-book");
    if (btn) openBook(Number(btn.getAttribute("data-book")));
  });

  reader.addEventListener("click", function (e) {
    if (e.target.closest(".ib-book-close")) { closeBook(); return; }
    var nav = e.target.closest("[data-nav]");
    if (!nav || nav.disabled) return;
    pageIndex += nav.getAttribute("data-nav") === "next" ? 1 : -1;
    render();
  });

  /* ---------------- contact modal ---------------- */
  var modalRoot = document.getElementById("ib-modal-root");
  if (modalRoot) {
    var sentPanel = modalRoot.querySelector(".ib-modal-sent");
    var formPanel = modalRoot.querySelector(".ib-modal-form");
    var backdrop = modalRoot.querySelector(".ib-modal-backdrop");
    var nameEl = modalRoot.querySelector("#ib-c-name");
    var emailEl = modalRoot.querySelector("#ib-c-email");
    var msgEl = modalRoot.querySelector("#ib-c-msg");

    function showForm() { if (formPanel) formPanel.hidden = false; if (sentPanel) sentPanel.hidden = true; }
    function showSent() { if (formPanel) formPanel.hidden = true; if (sentPanel) sentPanel.hidden = false; }
    function openModal() {
      modalRoot.hidden = false;
      document.body.classList.add("ib-locked");
      showForm();
      if (nameEl) nameEl.focus();
    }
    function closeModal() {
      modalRoot.hidden = true;
      document.body.classList.remove("ib-locked");
    }

    [].slice.call(document.querySelectorAll("[data-open-contact]")).forEach(function (b) {
      b.addEventListener("click", openModal);
    });

    modalRoot.addEventListener("click", function (e) {
      if (e.target.closest('[data-modal="close"]')) { closeModal(); return; }
      if (e.target.closest('[data-modal="submit"]')) {
        var subject = encodeURIComponent("New enquiry from IBBRU website");
        var body = encodeURIComponent(
          "Name: " + (nameEl ? nameEl.value.trim() : "") +
          "\nEmail: " + (emailEl ? emailEl.value.trim() : "") +
          "\n\nMessage:\n" + (msgEl ? msgEl.value : ""));
        window.open("mailto:ibbru.studio@gmail.com?subject=" + subject + "&body=" + body, "_blank");
        showSent();
        return;
      }
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalRoot.hidden) closeModal();
    });
  }
})();