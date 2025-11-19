// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Set current year in footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Scroll-based fade-in animation ---
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // --- Voice button "speaking" animation ---
  const voiceButton = document.getElementById("voiceButton");
  if (voiceButton) {
    voiceButton.addEventListener("click", () => {
      // Add pulse effect
      voiceButton.classList.add("speaking");

      // Remove after ~4.5 seconds
      setTimeout(() => {
        voiceButton.classList.remove("speaking");
      }, 4500);
    });
  }
});
