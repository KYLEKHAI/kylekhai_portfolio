// DARK MODE SWITCH (from Bootstrap)
(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  // Dark mode switch (non bootstrap elements)
  const toggleTheme = () => {
    const modeSwitch = document.getElementById("modeSwitch");
    const modeIcon = document.getElementById("modeIcon");
    const modeText = document.getElementById("modeText");
    const slideFooter = document.querySelector(".slide-footer");
    const header = document.querySelector(".header-scrolled");

    if (modeSwitch.checked) {
      setStoredTheme("dark");
      setTheme("dark");
      modeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
      modeText.textContent = "Dark";
      slideFooter.classList.add("dark-mode");
      header.classList.add("dark-mode");
    } else {
      setStoredTheme("light");
      setTheme("light");
      modeIcon.classList.replace("bi-moon-fill", "bi-sun-fill");
      modeText.textContent = "Light";
      slideFooter.classList.remove("dark-mode");
      header.classList.remove("dark-mode");
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    const modeSwitch = document.getElementById("modeSwitch");
    const modeIcon = document.getElementById("modeIcon");
    const modeText = document.getElementById("modeText");

    modeSwitch.checked = getStoredTheme() === "dark";

    modeSwitch.addEventListener("change", toggleTheme);

    // Set sun or moon based on theme
    if (modeSwitch.checked) {
      modeIcon.classList.replace("bi-sun-fill", "bi-moon-fill");
      modeText.textContent = "Dark";
    }

    // Navbar change from transparent to solid on scroll
    const navbar = document.querySelector(".header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("header-scrolled");
      } else if (window.scrollY <= 50) {
        navbar.classList.remove("header-scrolled");
      }
    });
  });
})();
