"use strict";

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)")
  .matches;
const interactiveSelector =
  "a.link-card, .feature-card__action, .site-footer__nav a";

document.documentElement.classList.add("js-ready");

const getInteractiveItem = (target) => target.closest(interactiveSelector);

document.addEventListener("pointerdown", (event) => {
  getInteractiveItem(event.target)?.classList.add("is-pressed");
});

document.addEventListener("pointerup", (event) => {
  getInteractiveItem(event.target)?.classList.remove("is-pressed");
});

document.addEventListener("pointercancel", () => {
  document
    .querySelectorAll(".is-pressed")
    .forEach((item) => item.classList.remove("is-pressed"));
});

document.addEventListener("pointerout", (event) => {
  const item = getInteractiveItem(event.target);

  if (item && !item.contains(event.relatedTarget)) {
    item.classList.remove("is-pressed");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== " " && event.key !== "Enter") {
    return;
  }

  getInteractiveItem(event.target)?.classList.add("is-pressed");
});

document.addEventListener("keyup", (event) => {
  getInteractiveItem(event.target)?.classList.remove("is-pressed");
});

document.addEventListener("focusout", (event) => {
  getInteractiveItem(event.target)?.classList.remove("is-pressed");
});

if (motionAllowed && "IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(
    ".profile, .link-section, .about, .site-footer",
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal-item");
    revealObserver.observe(item);
  });
}
