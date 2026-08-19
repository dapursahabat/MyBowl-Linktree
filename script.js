"use strict";

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const placeholderLinks = document.querySelectorAll(
  'a[href^="GANTI_"], a[href*="GANTI-DOMAIN"]'
);

placeholderLinks.forEach((link) => {
  link.setAttribute("aria-disabled", "true");

  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});