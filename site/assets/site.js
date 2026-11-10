// mortar.ch: the theme button, and t switches light and dark like in mason.
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

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === "t") toggle();
  });
})();
