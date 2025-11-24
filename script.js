document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Scroll‑based fade in (you had OK)
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach(el => observer.observe(el));

  // Form wiring
  const controlsForm = document.getElementById("widget-controls");
  if (!controlsForm) return;

  const updateBtn = document.createElement("button");
  updateBtn.type = "button";
  updateBtn.textContent = "Update Preview";
  controlsForm.appendChild(updateBtn);

  let widgetEl = null;

  function removeWidget() {
    if (widgetEl && widgetEl.parentNode) {
      widgetEl.remove();
      widgetEl = null;
    }
  }

  function createWidgetWithSettings() {
    removeWidget();

    const mode = controlsForm.querySelector("#wp-mode").value;
    const theme = controlsForm.querySelector("#wp-theme").value;
    const size = controlsForm.querySelector("#wp-size").value;
    const position = controlsForm.querySelector("#wp-position").value;
    const baseColor = controlsForm.querySelector("#wp-base-color").value;
    const accentColor = controlsForm.querySelector("#wp-accent-color").value;
    const showTranscript = controlsForm.querySelector("#wp-show-transcript").checked;
    const requireConsent = controlsForm.querySelector("#wp-require-consent").checked;

    const w = document.createElement("vapi-widget");
    w.setAttribute("public-key", "94c63e18‑d70d‑49c4‑86ee‑e35f081d28ac");
    w.setAttribute("assistant-id", "d483aee6‑54c9‑4eaa‑b489‑b947401853cf");

    w.setAttribute("mode", mode);
    w.setAttribute("theme", theme);
    w.setAttribute("size", size);
    w.setAttribute("position", position);
    w.setAttribute("radius", "large");

    // Use correct color attribute names if supported
    w.setAttribute("base-color", baseColor);
    w.setAttribute("accent-color", accentColor);
    // Optionally button colors
    w.setAttribute("button-base-color", baseColor);
    w.setAttribute("button-accent-color", "#ffffff");

    if (mode === "voice") {
      w.setAttribute("main-label", "Talk to LuxxAI");
      w.setAttribute("start-button-text", "Start demo");
      w.setAttribute("end-button-text", "End");
      w.setAttribute("empty-voice-message", "Ask how LuxxAI voice agents can help your business.");
    } else {
      w.setAttribute("title", "Chat with LuxxAI");
      w.setAttribute("empty-chat-message", "Tell me about your business and I’ll show you how LuxxAI voice & chat agents can help.");
    }

    w.setAttribute("show-transcript", showTranscript ? "true" : "false");

    if (requireConsent) {
      w.setAttribute("require-consent", "true");
      w.setAttribute("terms-content", "By continuing you agree to let LuxxAI process your conversation to improve this demo and design agents for your business.");
    } else {
      w.setAttribute("require-consent", "false");
    }

    document.body.appendChild(w);
    widgetEl = w;
  }

  // Wait until the custom element is defined
  if (window.customElements && window.customElements.whenDefined) {
    window.customElements.whenDefined('vapi-widget').then(() => {
      createWidgetWithSettings();
    });
  } else {
    // fallback
    createWidgetWithSettings();
  }

  updateBtn.addEventListener("click", createWidgetWithSettings);
});
