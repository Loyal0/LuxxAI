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

  // --- Helper: read widget settings from URL or use defaults ---
  function getWidgetSettingsFromURL() {
    const params = new URLSearchParams(window.location.search);

    return {
      mode: params.get("mode") || "voice",          // voice | chat
      theme: params.get("theme") || "dark",         // light | dark
      size: params.get("size") || "tiny",           // tiny | compact | full
      position: params.get("position") || "bottom-left",

      baseColor: params.get("baseColor") || "#050712",
      accentColor: params.get("accentColor") || "#06B6D4",

      showTranscript: params.get("showTranscript") !== "false", // default true
      requireConsent: params.get("requireConsent") === "true",
    };
  }

  // --- Create Vapi widget from settings ---
  function createWidgetFromSettings(settings) {
    const mount = document.getElementById("widget-mount");
    if (!mount) {
      console.warn("No #widget-mount div found");
      return;
    }

    mount.innerHTML = ""; // clear anything old

    const w = document.createElement("vapi-widget");

    // Required props
    w.setAttribute(
      "public-key",
      "94c63e18-d70d-49c4-86ee-e35f081d28ac"
    );
    w.setAttribute(
      "assistant-id",
      "d483aee6-54c9-4eaa-b489-b947401853cf"
    );

    // Appearance options (from Vapi docs)
    w.setAttribute("mode", settings.mode);
    w.setAttribute("theme", settings.theme);
    w.setAttribute("size", settings.size);
    w.setAttribute("position", settings.position);
    w.setAttribute("radius", "large");

    // Styling options
    w.setAttribute("base-color", settings.baseColor);
    w.setAttribute("accent-color", settings.accentColor);
    w.setAttribute("button-base-color", settings.baseColor);
    w.setAttribute("button-accent-color", "#ffffff");

    // Text customization
    if (settings.mode === "voice") {
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
    w.setAttribute(
      "show-transcript",
      settings.showTranscript ? "true" : "false"
    );

    if (settings.requireConsent) {
      w.setAttribute("require-consent", "true");
      w.setAttribute(
        "terms-content",
        "By continuing, you agree to let LuxxAI process your conversation to improve this demo and design agents for your business."
      );
    } else {
      w.setAttribute("require-consent", "false");
      w.removeAttribute("terms-content");
    }

    mount.appendChild(w);
  }

  // --- Make the form reflect current settings (so UI matches URL) ---
  function populateControlsFromSettings(settings) {
    const modeEl = document.getElementById("wp-mode");
    const themeEl = document.getElementById("wp-theme");
    const sizeEl = document.getElementById("wp-size");
    const posEl = document.getElementById("wp-position");
    const baseEl = document.getElementById("wp-base-color");
    const accentEl = document.getElementById("wp-accent-color");
    const showTranscriptEl = document.getElementById("wp-show-transcript");
    const requireConsentEl = document.getElementById("wp-require-consent");

    if (modeEl) modeEl.value = settings.mode;
    if (themeEl) themeEl.value = settings.theme;
    if (sizeEl) sizeEl.value = settings.size;
    if (posEl) posEl.value = settings.position;
    if (baseEl) baseEl.value = settings.baseColor;
    if (accentEl) accentEl.value = settings.accentColor;
    if (showTranscriptEl) showTranscriptEl.checked = settings.showTranscript;
    if (requireConsentEl) requireConsentEl.checked = settings.requireConsent;
  }

  // --- Wire controls so they reload the page with new settings ---
  function wireControlsReload() {
    const controlsForm = document.getElementById("widget-controls");
    if (!controlsForm) {
      console.log("No #widget-controls form found");
      return;
    }

    function readControlsAndReload() {
      const mode = document.getElementById("wp-mode").value;
      const theme = document.getElementById("wp-theme").value;
      const size = document.getElementById("wp-size").value;
      const position = document.getElementById("wp-position").value;
      const baseColor = document.getElementById("wp-base-color").value;
      const accentColor = document.getElementById("wp-accent-color").value;
      const showTranscript = document.getElementById("wp-show-transcript")
        .checked;
      const requireConsent = document.getElementById("wp-require-consent")
        .checked;

      const params = new URLSearchParams();

      params.set("mode", mode);
      params.set("theme", theme);
      params.set("size", size);
      params.set("position", position);
      params.set("baseColor", baseColor);
      params.set("accentColor", accentColor);
      params.set("showTranscript", showTranscript ? "true" : "false");
      params.set("requireConsent", requireConsent ? "true" : "false");

      // Trigger a full reload with the new query string
      window.location.search = params.toString();
    }

    // Dedicated "Update preview" button
    const updateBtn = document.createElement("button");
    updateBtn.type = "button";
    updateBtn.textContent = "Update preview (reload)";
    updateBtn.className = "widget-update-button";
    controlsForm.appendChild(updateBtn);

    updateBtn.addEventListener("click", readControlsAndReload);

    // If you ONLY want reload on button click, leave the 'change' handler disabled:
    // controlsForm.addEventListener("change", readControlsAndReload);
  }

  // --- Initialize: read settings, sync controls, create widget ---
  const settings = getWidgetSettingsFromURL();
  populateControlsFromSettings(settings);

  if (window.customElements?.whenDefined) {
    window.customElements.whenDefined("vapi-widget").then(() => {
      createWidgetFromSettings(settings);
    });
  } else {
    createWidgetFromSettings(settings);
  }

  wireControlsReload();
});
