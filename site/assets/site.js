// mortar.ch: the theme button, and t switches light and dark like in mason.
(function () {
  var root = document.documentElement;
  function current() {
    return root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  // The phone's address bar follows the theme-color metas, which only know the system scheme.
  function bar() {
    var page = getComputedStyle(root).getPropertyValue("--page").trim();
    if (!page) return;
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.setAttribute("content", page); });
  }
  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    bar();
  }
  if (root.dataset.theme) bar();
  document.getElementById("theme").addEventListener("click", toggle);

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "t") toggle();
  });
})();
