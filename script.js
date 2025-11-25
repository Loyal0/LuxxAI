// script.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Footer year ---
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

  // --- Phone demo form (stub) ---
  const callForm = document.getElementById("call-demo-form");
  const phoneInput = document.getElementById("phone-input");
  const callStatus = document.getElementById("call-status");

  if (callForm && phoneInput && callStatus) {
    callForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = phoneInput.value.trim();
      if (!phone) return;

      callStatus.style.color = "#a5b4fc";
      callStatus.textContent =
        "Simulating call… in production this will dial your number with a LuxxAI phone agent.";

      setTimeout(() => {
        callStatus.style.color = "#4ade80";
        callStatus.textContent =
          "Call simulation complete. Hook this form up to your LuxxAI backend when you're ready.";
      }, 2500);
    });
  }

  // --- Voice / Chat widget toggle logic ---
  const voiceWidget = document.getElementById("voice-widget");
  const chatWidget = document.getElementById("chat-widget");
  const toggleButtons = document.querySelectorAll(".toggle-button");

  function setActiveWidget(widgetType) {
    if (widgetType === "voice") {
      if (voiceWidget) voiceWidget.classList.remove("hidden-element");
      if (chatWidget) chatWidget.classList.add("hidden-element");
    } else if (widgetType === "chat") {
      if (chatWidget) chatWidget.classList.remove("hidden-element");
      if (voiceWidget) voiceWidget.classList.add("hidden-element");
    }

    // Update button active states
    toggleButtons.forEach((btn) => {
      if (btn.dataset.widget === widgetType) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Wire up the toggle buttons
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.widget; // "voice" or "chat"
      setActiveWidget(target);
    });
  });

  // Initial state: voice visible, chat hidden
  setActiveWidget("voice");
});
