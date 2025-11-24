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

  // --- Phone demo form (leave this as-is if you already had it) ---
  const callForm = document.getElementById("call-demo-form");
  const phoneInput = document.getElementById("phone-input");
  const callStatus = document.getElementById("call-status");

  if (callForm && phoneInput && callStatus) {
    callForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const phone = phoneInput.value.trim();
      if (!phone) return;

      // In production: send `phone` to your backend, then use Vapi's server API.
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

  // --- Widget playground logic ---
  const controlsForm = document.getElementById("widget-controls");
  const widget = document.getElementById("live-widget");

  console.log("widget-controls found?", !!controlsForm);
  console.log("live-widget found?", !!widget);

  if (!controlsForm || !widget) {
    return; // nothing to wire up
  }

  function applyWidgetAttributes() {
    // Read current values from the controls
    const mode = document.getElementById("wp-mode").value; // voice | chat
    const theme = document.getElementById("wp-theme").value; // light | dark
    const size = document.getElementById("wp-size").value; // tiny | compact | full
    const position = document.getElementById("wp-position").value; // corner
    const baseColor = document.getElementById("wp-base-color").value;
    const accentColor = document.getElementById("wp-accent-color").value;
    const showTranscript = document.getElementById("wp-show-transcript")
      .checked;
    const requireConsent = document.getElementById("wp-require-consent")
      .checked;

    console.log("applyWidgetAttributes", {
      mode,
      theme,
      size,
      position,
      baseColor,
      accentColor,
      showTranscript,
      requireConsent,
    });

    // --- Appearance options (from Vapi docs) ---
    widget.setAttribute("mode", mode);
    widget.setAttribute("theme", theme);
    widget.setAttribute("size", size);
    widget.setAttribute("position", position);
    widget.setAttribute("radius", "large");

    // --- Styling options ---
    widget.setAttribute("base-color", baseColor);
    widget.setAttribute("accent-color", accentColor);
    widget.setAttribute("button-base-color", baseColor);
    widget.setAttribute("button-accent-color", "#ffffff");

    // --- Text customization ---
    if (mode === "voice") {
      widget.setAttribute("main-label", "Talk to LuxxAI");
      widget.setAttribute("start-button-text", "Start demo");
      widget.setAttribute("end-button-text", "End");
      widget.setAttribute(
        "empty-voice-message",
        "Ask how LuxxAI voice agents can help your business."
      );
      widget.removeAttribute("empty-chat-message");
    } else {
      widget.setAttribute("main-label", "Chat with LuxxAI");
      widget.setAttribute(
        "empty-chat-message",
        "Tell me about your business and I'll show you how LuxxAI voice & chat agents can help."
      );
      widget.removeAttribute("empty-voice-message");
    }

    // --- Advanced options ---
    widget.setAttribute("show-transcript", showTranscript ? "true" : "false");

    if (requireConsent) {
      widget.setAttribute("require-consent", "true");
      widget.setAttribute(
        "terms-content",
        "By continuing, you agree to let LuxxAI process your conversation to improve this demo and design agents for your business."
      );
    } else {
      widget.setAttribute("require-consent", "false");
      widget.removeAttribute("terms-content");
    }
  }

  // Optional: add an explicit "Update Preview" button at the end of the form
  const updateBtn = document.createElement("button");
  updateBtn.type = "button";
  updateBtn.textContent = "Update preview";
  updateBtn.className = "widget-update-button";
  controlsForm.appendChild(updateBtn);

  updateBtn.addEventListener("click", applyWidgetAttributes);
  // You can also auto-update on any change:

  // Make sure widget is defined by the time we apply attributes
  if (window.customElements?.whenDefined) {
    window.customElements.whenDefined("vapi-widget").then(() => {
      applyWidgetAttributes();
    });
  } else {
    applyWidgetAttributes();
  }
});
