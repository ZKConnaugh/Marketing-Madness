/* connaugh.me interactive CV — progress, section dial, reveals, count-up. */
(function () {
  var doc = document.documentElement;

  // Reading-progress bar
  var prog = document.getElementById("progress");
  function onScroll() {
    var h = doc.scrollHeight - doc.clientHeight;
    var p = h > 0 ? doc.scrollTop / h : 0;
    if (prog) prog.style.width = (Math.max(0, Math.min(1, p)) * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Count-up
  var counted = new WeakSet();
  function fmtVal(v, fmt) {
    if (fmt === "m") return (v / 1000000).toFixed(1).replace(/\.0$/, "") + "m+";
    return Math.round(v).toString();
  }
  function countUp(el) {
    if (counted.has(el)) return;
    counted.add(el);
    var to = parseFloat(el.getAttribute("data-to")) || 0;
    var fmt = el.getAttribute("data-fmt");
    var start = null, dur = 1100;
    function step(t) {
      if (!start) start = t;
      var k = Math.min((t - start) / dur, 1);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmtVal(to * e, fmt);
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = fmtVal(to, fmt);
    }
    requestAnimationFrame(step);
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nums = [].slice.call(document.querySelectorAll(".num"));
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));

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

  // Section dial + "you are now reading"
  var dial = {};
  [].slice.call(document.querySelectorAll(".cv-dial a[data-sec]")).forEach(function (a) { dial[a.getAttribute("data-sec")] = a; });
  var eyebrow = document.getElementById("eyebrow");
  var labels = { "01": "Profile", "02": "Personal Projects", "03": "Experience", "04": "Education" };
  if ("IntersectionObserver" in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.getAttribute("data-sec");
        Object.keys(dial).forEach(function (k) { dial[k].classList.toggle("is-active", k === n); });
        if (eyebrow && labels[n]) eyebrow.innerHTML = "You are now reading <b>— " + labels[n] + "</b>";
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    [].slice.call(document.querySelectorAll(".cv-section[data-sec]")).forEach(function (s) { secIO.observe(s); });
  }
})();
