(function () {
  var THEME_KEY = "anand-theme";

  function safeGetTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function safeSetTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // Ignore storage failures.
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function getPreferredTheme() {
    var stored = safeGetTheme();
    if (stored === "dark" || stored === "light") {
      return stored;
    }
    return getSystemTheme();
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-dark", isDark);

    var label = document.querySelector(".theme-toggle-label");
    var button = document.getElementById("theme-toggle");
    if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
    if (button) button.setAttribute("aria-pressed", isDark ? "true" : "false");
  }

  function initToggle() {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    applyTheme(getPreferredTheme());

    button.addEventListener("click", function () {
      var nextTheme = document.documentElement.classList.contains("theme-dark") ? "light" : "dark";
      safeSetTheme(nextTheme);
      applyTheme(nextTheme);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (!safeGetTheme()) {
        applyTheme(getSystemTheme());
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }
})();
