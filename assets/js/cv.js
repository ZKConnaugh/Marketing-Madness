/* connaugh.me interactive CV — progress, dial/tuner, reveals, count-up,
   kinetic name, portal-entry transition, custom cursor + magnetic portals. */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---- Landing hub <-> CV view (mirrors the :target CSS for browsers w/o :has) ----
  function syncView() {
    document.body.classList.toggle("cv-open", /^#(cv|profile|projects|experience|education)$/.test(location.hash));
  }
  syncView();
  window.addEventListener("hashchange", syncView);

  // ---- Reading progress ----
  var prog = document.getElementById("progress");
  function onScroll() {
    var h = doc.scrollHeight - doc.clientHeight;
    var p = h > 0 ? doc.scrollTop / h : 0;
    if (prog) prog.style.width = (Math.max(0, Math.min(1, p)) * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Year ----
  var yEl = document.getElementById("year");
  if (yEl) yEl.textContent = new Date().getFullYear();

  // ---- Count-up ----
  var counted = new WeakSet();
  function fmtVal(v, fmt) {
    if (fmt === "m") return (v / 1000000).toFixed(1).replace(/\.0$/, "") + "m+";
    return Math.round(v).toString();
  }
  function countUp(el) {
    if (counted.has(el)) return;
    counted.add(el);
    var to = parseFloat(el.getAttribute("data-to")) || 0, fmt = el.getAttribute("data-fmt"), start = null, dur = 1100;
    function step(t) {
      if (!start) start = t;
      var k = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmtVal(to * e, fmt);
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = fmtVal(to, fmt);
    }
    requestAnimationFrame(step);
  }

  // ---- Reveals ----
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  var nums = [].slice.call(document.querySelectorAll(".num"));
  if ("IntersectionObserver" in window && !reduce) {
    var revIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        [].slice.call(e.target.querySelectorAll(".num")).forEach(countUp);
        revIO.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    reveals.forEach(function (el) { revIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
    nums.forEach(function (el) { el.textContent = fmtVal(parseFloat(el.getAttribute("data-to")) || 0, el.getAttribute("data-fmt")); });
  }

  // ---- Section dial + "you are now reading" (with tuner flicker) ----
  var dial = {};
  [].slice.call(document.querySelectorAll(".cv-dial a[data-sec]")).forEach(function (a) { dial[a.getAttribute("data-sec")] = a; });
  var eyebrow = document.getElementById("eyebrow");
  var labels = { "01": "Profile", "02": "Personal Projects", "03": "Experience", "04": "Education" };
  var tuneTimer = null;
  function setEyebrow(n) { if (eyebrow && labels[n]) eyebrow.innerHTML = "You are now reading <b>— " + labels[n] + "</b>"; }
  if ("IntersectionObserver" in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.getAttribute("data-sec");
        Object.keys(dial).forEach(function (k) { dial[k].classList.toggle("is-active", k === n); });
        if (!tuneTimer) setEyebrow(n);
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    [].slice.call(document.querySelectorAll(".cv-section[data-sec]")).forEach(function (s) { secIO.observe(s); });
  }
  Object.keys(dial).forEach(function (k) {
    dial[k].addEventListener("click", function () {
      if (reduce || !eyebrow) return;
      eyebrow.classList.add("is-tuning");
      var frames = ["◂ tuning ▸", "◂◂ tuning ▸▸", "◂ tuning ▸"], i = 0;
      clearInterval(tuneTimer);
      eyebrow.innerHTML = "You are now reading <b>— " + frames[0] + "</b>";
      tuneTimer = setInterval(function () {
        i++;
        if (i >= frames.length) { clearInterval(tuneTimer); tuneTimer = null; eyebrow.classList.remove("is-tuning"); setEyebrow(k); return; }
        eyebrow.innerHTML = "You are now reading <b>— " + frames[i] + "</b>";
      }, 130);
    });
  });

  // ---- Kinetic name ----
  (function splitName() {
    if (reduce) return;
    var name = document.querySelector(".cv-name");
    if (!name) return;
    var idx = 0;
    function wrap(text) {
      var frag = document.createDocumentFragment();
      for (var c = 0; c < text.length; c++) {
        if (text[c] === " ") { frag.appendChild(document.createTextNode(" ")); continue; }
        var span = document.createElement("span");
        span.className = "char"; span.textContent = text[c];
        span.style.setProperty("--d", (idx * 0.035).toFixed(3) + "s"); idx++;
        frag.appendChild(span);
      }
      return frag;
    }
    (function walk(parent) {
      [].slice.call(parent.childNodes).forEach(function (node) {
        if (node.nodeType === 3) { parent.replaceChild(wrap(node.textContent), node); }
        else if (node.nodeType === 1) { walk(node); }
      });
    })(name);
    name.classList.add("split");
    requestAnimationFrame(function () { requestAnimationFrame(function () { name.classList.add("is-revealed"); }); });
  })();

  // ---- Portal entry transition ----
  [].slice.call(document.querySelectorAll(".portal")).forEach(function (p) {
    p.addEventListener("click", function (ev) {
      if (reduce || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button) return;
      var href = p.getAttribute("href");
      if (!href) return;
      ev.preventDefault();
      var zk = p.classList.contains("portal--zkfm");
      var overlay = document.createElement("div");
      overlay.className = "portal-enter " + (zk ? "portal-enter--zkfm" : "portal-enter--mm");
      overlay.innerHTML = '<span class="portal-enter__label">' + (zk ? "Tuning in…" : "Opening the magazine…") + "</span>";
      overlay.style.setProperty("--x", (ev.clientX || window.innerWidth / 2) + "px");
      overlay.style.setProperty("--y", (ev.clientY || window.innerHeight / 2) + "px");
      document.body.appendChild(overlay);
      requestAnimationFrame(function () { overlay.classList.add("is-on"); });
      setTimeout(function () { window.location.href = href; }, 620);
    });
  });

  // ---- Custom cursor + magnetic portals (desktop only) ----
  if (fine && !reduce) {
    var cur = document.createElement("div");
    cur.className = "cv-cursor"; cur.setAttribute("aria-hidden", "true");
    document.body.appendChild(cur);
    document.body.classList.add("has-cursor");
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2, tx = cx, ty = cy, ready = false;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!ready) { ready = true; cur.classList.add("is-ready"); }
    });
    (function raf() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cur.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px) translate(-50%,-50%)";
      requestAnimationFrame(raf);
    })();
    var hot = "a, button, summary, .portal";
    document.addEventListener("mouseover", function (e) { if (e.target.closest && e.target.closest(hot)) cur.classList.add("is-hot"); });
    document.addEventListener("mouseout", function (e) { if (e.target.closest && e.target.closest(hot)) cur.classList.remove("is-hot"); });

    [].slice.call(document.querySelectorAll(".portal")).forEach(function (p) {
      p.addEventListener("mousemove", function (e) {
        var r = p.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.06;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.06;
        p.style.transform = "translate(" + dx.toFixed(1) + "px," + (dy - 6).toFixed(1) + "px)";
      });
      p.addEventListener("mouseleave", function () { p.style.transform = ""; });
    });
  }
})();
