// Runs before first paint (not deferred), so a saved light/dark choice doesn't flash.
try { var t = localStorage.getItem("theme"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch (e) {}
