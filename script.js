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

  // --- Phone demo form (stub for now) ---
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
if (!controlsForm) return;

// We'll always recreate this on change
let widgetEl = null;

function createWidgetWithSettings() {
  // If a widget already exists, remove it
  if (widgetEl && widgetEl.parentNode) {
    widgetEl.parentNode.removeChild(widgetEl);
  }

  // Read current controls
  const mode = controlsForm.querySelector("#wp-mode").value;
  const theme = controlsForm.querySelector("#wp-theme").value;
  const size = controlsForm.querySelector("#wp-size").value;
  const position = controlsForm.querySelector("#wp-position").value;
  const baseColor = controlsForm.querySelector("#wp-base-color").value;
  const accentColor = controlsForm.querySelector("#wp-accent-color").value;
  const showTranscript = controlsForm.querySelector("#wp-show-transcript")
    .checked;
  const requireConsent = controlsForm.querySelector("#wp-require-consent")
    .checked;

  // Create a brand new widget element
  const w = document.createElement("vapi-widget");

  // Required props
  w.setAttribute("public-key", "94c63e18-d70d-49c4-86ee-e35f081d28ac");
  w.setAttribute("assistant-id", "d483aee6-54c9-4eaa-b489-b947401853cf");

  // Appearance options
  w.setAttribute("mode", mode);          // voice | chat
  w.setAttribute("theme", theme);        // light | dark
  w.setAttribute("size", size);          // tiny | compact | full
  w.setAttribute("position", position);  // bottom-left, etc.
  w.setAttribute("radius", "large");

  // Styling options
  w.setAttribute("base-color", baseColor);
  w.setAttribute("accent-color", accentColor);
  w.setAttribute("button-base-color", baseColor);
  w.setAttribute("button-accent-color", "#ffffff");

  // Text customization
  if (mode === "voice") {
    w.setAttribute("main-label", "Talk to LuxxAI");
    w.setAttribute("start-button-text", "Start demo");
    w.setAttribute("end-button-text", "End");
    w.setAttribute(
      "empty-voice-message",
      "Ask how LuxxAI voice agents can help your business."
    );
    w.removeAttribute("empty-chat-message");
  } else {
    w.setAttribute("main-label", "Chat with LuxxAI");
    w.setAttribute(
      "empty-chat-message",
      "Tell me about your business and I'll show you how LuxxAI voice & chat agents can help."
    );
    w.removeAttribute("empty-voice-message");
  }

  // Advanced options
  w.setAttribute("show-transcript", showTranscript ? "true" : "false");

  if (requireConsent) {
    w.setAttribute("require-consent", "true");
    w.setAttribute(
      "terms-content",
      "By continuing, you agree to let LuxxAI process your conversation to improve this demo and design agents for your business."
    );
  } else {
    w.setAttribute("require-consent", "false");
    w.removeAttribute("terms-content");
  }

  // Add it to the page (Vapi script turns this into a real widget)
  document.body.appendChild(w);
  widgetEl = w;
}

// Run once on load
createWidgetWithSettings();

// Recreate whenever a control changes
controlsForm.addEventListener("change", createWidgetWithSettings);

