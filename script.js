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
  // Make sure your HTML has: <div id="voiceButton" class="voice-button-container ...">
  const voiceButton = document.getElementById("voiceButton");
  if (voiceButton) {
    voiceButton.addEventListener("click", () => {
      // Add the speaking class to trigger CSS animation
      voiceButton.classList.add("speaking");

      // Remove it after ~4.5s (approx speaking duration)
      setTimeout(() => {
        voiceButton.classList.remove("speaking");
      }, 4500);
    });
  }
});
