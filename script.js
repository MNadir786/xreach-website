/* ============================================================
   XREACH GLOBAL SCRIPT — PRODUCTION STABLE BUILD
   v3.0 — (Animations + Google Maps + Local Chatbot)
============================================================ */

/* ------------------------------
   SECTION FADE-IN ANIMATION
------------------------------ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section").forEach((sec) => observer.observe(sec));

/* ------------------------------
   GOOGLE MAPS (Correct Office Location)
------------------------------ */
function initXReachMap() {
  const mapContainer = document.getElementById("xreach-map");
  if (!mapContainer) return;

  // Correct coordinates for:
  // 1320 Central Park Blvd Suite 200, Fredericksburg VA
  const xreachLocation = { lat: 38.30393, lng: -77.51356 };

  const map = new google.maps.Map(mapContainer, {
    center: xreachLocation,
    zoom: 16,
    mapId: "XREACH_MAIN_MAP",
    disableDefaultUI: false
  });

  new google.maps.Marker({
    position: xreachLocation,
    map,
    title: "XReach LLC — Fredericksburg Office"
  });
}

window.initXReachMap = initXReachMap;

/* ------------------------------
   CHATBOT POPUP
------------------------------ */
const chatbotIcon = document.getElementById("chatbot-icon");
const chatWindow = document.getElementById("chat-window");

if (chatbotIcon && chatWindow) {
  chatbotIcon.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
  });
}

/* Auto-open on homepage only */
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
  setTimeout(() => {
    if (chatWindow) chatWindow.classList.add("open");
  }, 2500);
}

/* ------------------------------
   SIMPLE MULTILINGUAL ENGINE (Chatbot Text)
------------------------------ */
const chatbotTranslations = {
  en: "How can I help you today?",
  fa: "چطور می‌توانم کمک‌تان کنم؟",
  ps: "زه څنګه مرسته درسره وکړم؟",
  ur: "میں آج آپ کی کیسے مدد کر سکتا ہوں؟"
};

function applyChatbotLanguage(lang) {
  const iframe = document.querySelector("#chat-window iframe");
  if (!iframe) return;

  try {
    iframe.contentWindow.postMessage(
      { type: "set_language", text: chatbotTranslations[lang] },
      "*"
    );
  } catch (e) {
    console.warn("Chatbot language transfer failed:", e);
  }
}

const savedLang = localStorage.getItem("xreach-chatbot-lang") || "en";
applyChatbotLanguage(savedLang);
