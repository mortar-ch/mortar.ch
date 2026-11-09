// mortar.ch: the theme button and mason's keys (1-3 jump to a section, t switches light and dark).
(function () {
  var root = document.documentElement;
  function current() {
    return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  }
  document.getElementById("theme").addEventListener("click", toggle);

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "t") toggle();
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= tabs.length) tabs[n - 1].click();
  });

  // Underline the tab of the section in view: the last one whose top is in the upper third of the window, or the
  // last section once the page is scrolled to the bottom. A click marks its tab straight away.
  var sections = tabs.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function mark(i) { tabs.forEach(function (a, j) { a.classList.toggle("on", j === i); }); }
  function update() {
    var bar = Math.max(document.querySelector(".tabs").getBoundingClientRect().bottom + 40, innerHeight / 3), i = 0;
    sections.forEach(function (s, j) { if (s && s.getBoundingClientRect().top <= bar) i = j; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) i = sections.length - 1;
    mark(i);
  }
  tabs.forEach(function (a, j) { a.addEventListener("click", function () { mark(j); }); });
  var ticking = false;
  addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; update(); }); }
  }, { passive: true });
  addEventListener("resize", update);
  update();
})();
