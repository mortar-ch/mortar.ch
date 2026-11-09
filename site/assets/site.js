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

  // Underline the tab of the section in view.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tabs.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main > section").forEach(function (s) { io.observe(s); });
  }
})();
