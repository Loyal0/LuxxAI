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

const widget = document.getElementById("live-widget");

function updateWidget() {
  const mode = document.getElementById("wp-mode").value;
  const theme = document.getElementById("wp-theme").value;
  const size = document.getElementById("wp-size").value;
  const position = document.getElementById("wp-position").value;
  const baseColor = document.getElementById("wp-base-color").value;
  const accentColor = document.getElementById("wp-accent-color").value;
  const showTranscript = document.getElementById("wp-show-transcript").checked;
  const requireConsent = document.getElementById("wp-require-consent").checked;

  widget.setAttribute("mode", mode);
  widget.setAttribute("theme", theme);
  widget.setAttribute("size", size);
  widget.setAttribute("position", position);
  widget.setAttribute("base-bg-color", baseColor);
  widget.setAttribute("accent-color", accentColor);
  widget.setAttribute("cta-button-color", baseColor);
  widget.setAttribute("cta-button-text-color", "#ffffff");

  if (mode === "voice") {
    widget.setAttribute("title", "Talk to LuxxAI");
    widget.setAttribute("voice-empty-message", "Ask how LuxxAI can help.");
    widget.setAttribute("voice-show-transcript", showTranscript ? "true" : "false");
  } else {
    widget.setAttribute("title", "Chat with LuxxAI");
    widget.setAttribute("chat-empty-message", "Let’s explore how LuxxAI can help.");
    widget.removeAttribute("voice-empty-message");
  }

  widget.setAttribute("consent-required", requireConsent ? "true" : "false");
  if (requireConsent) {
    widget.setAttribute("consent-content", "By continuing, you agree to our demo terms.");
  } else {
    widget.removeAttribute("consent-content");
  }
}

document.getElementById("update-widget").addEventListener("click", updateWidget);


  // Wait until the custom element is defined
  if (window.customElements && window.customElements.whenDefined) {
    window.customElements.whenDefined('vapi-widget').then(() => {
      createWidgetWithSettings();
    });
  } else {
    // fallback
    createWidgetWithSettings();
  }

  updateBtn.addEventListener("click", updateWidget);
});
