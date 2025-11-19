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

  // --- Phone demo form (stub for now) ---
  const callForm = document.getElementById("call-demo-form");
  const phoneInput = document.getElementById("phone-input");
  const callStatus = document.getElementById("call-status");

  if (callForm && phoneInput && callStatus) {
    callForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = phoneInput.value.trim();

      if (!phone) return;

      // You CANNOT safely call Vapi's secret-key API directly from the browser.
      // In production, this should send `phone` to your backend (e.g. /api/start-call)
      // which then uses Vapi's server-side API + secret key to trigger the call.

      // For now, just simulate a response so the UI feels alive.
      callStatus.style.color = "#a5b4fc";
      callStatus.textContent = "Simulating call… in production this will dial your number.";

      setTimeout(() => {
        callStatus.style.color = "#4ade80";
        callStatus.textContent = "Call simulation complete. Hook this form up to your LuxxAI backend when ready.";
      }, 2500);
    });
  }
});
