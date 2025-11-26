/************************************************************
 * XReach Website Script (Ultimate AI Upgrade Version – v2)
 * Production-Safe • Multilingual • AWS Lambda Powered
 ************************************************************/

/* =========================================================
   Smooth Scrolling
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const targetID = anchor.getAttribute("href");
    if (targetID.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(targetID);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================================================
   Expand/Collapse Service Cards
========================================================= */
document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".service-card").forEach(c => {
      if (c !== card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

/* =========================================================
   Tech Cards with Ripple Effect
========================================================= */
document.querySelectorAll(".tech-card").forEach(card => {
  card.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    document.querySelectorAll(".tech-card").forEach(c => {
      if (c !== card) c.classList.remove("active");
    });

    card.classList.toggle("active");
  });
});

/* =========================================================
   Scroll Animation
========================================================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section").forEach(sec => observer.observe(sec));

/* =========================================================
   Console Branding
========================================================= */
console.log(
  "%c🚀 XReach Website Loaded — Multilingual AI Assistant Ready!",
  "color:#00ffc6;font-size:14px;font-weight:bold;"
);

/************************************************************
 *               XREACH MULTILINGUAL AI ASSISTANT
 ************************************************************/

/*** YOUR LAMBDA FUNCTION URL ***/
const LAMBDA_URL = "https://a44fwl2gcsckh44oci3r5ydoqy0ewtnt.lambda-url.us-east-1.on.aws/";

/* =========================================================
   Language Data
========================================================= */
const LANGUAGES = {
  en: { name: "English", dir: "ltr" },
  ps: { name: "پښتو", dir: "rtl" },
  fa: { name: "دری", dir: "rtl" },
  ar: { name: "العربية", dir: "rtl" },
  ur: { name: "اردو", dir: "rtl" },
  es: { name: "Español", dir: "ltr" },
};

const SUGGESTIONS = {
  en: ["Tax Filing Help", "Bookkeeping", "AI Automation", "Cloud & DevOps", "Cybersecurity"],
  ps: ["د مالیې مرسته", "کتاب ساتنه", "AI اتومات", "کلود/ډیواپس", "سایبر امنیت"],
  fa: ["کمک مالیاتی", "حسابداری", "خودکارسازی AI", "کلود و دواپس", "امنیت سایبری"],
  ar: ["مساعدة الضرائب", "مسك الدفاتر", "أتمتة الذكاء الاصطناعي", "السحابة والديفوبس", "الأمن السيبراني"],
  ur: ["ٹیکس مدد", "بک کیپنگ", "AI آٹومیشن", "کلاؤڈ/DevOps", "سائبر سیکیورٹی"],
  es: ["Ayuda de Impuestos", "Contabilidad", "Automatización IA", "Cloud & DevOps", "Ciberseguridad"],
};

/* Save/Load Preferred Language */
function getLang() {
  return localStorage.getItem("xreach_lang") || "en";
}
function setLang(l) {
  localStorage.setItem("xreach_lang", l);
}

/* =========================================================
   Inject Chat UI
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  /** Floating bubble **/
  const bubble = document.createElement("div");
  bubble.id = "xreach-chat-bubble";
  bubble.innerHTML = "💬";
  document.body.appendChild(bubble);

  /** Chat modal **/
  const modal = document.createElement("div");
  modal.id = "xreach-chat-modal";
  modal.innerHTML = `
    <div class="xreach-chat-panel">
      
      <div class="xreach-chat-header">
        <span>🤖 XReach AI Assistant</span>
        <button id="xreach-chat-close">×</button>
      </div>

      <div class="xreach-language-bar">
        ${Object.entries(LANGUAGES)
          .map(([code, obj]) => `<button class="lang-chip" data-lang="${code}">${obj.name}</button>`)
          .join("")}
      </div>

      <div id="xreach-suggestions" class="xreach-suggestions"></div>

      <div id="xreach-chat-messages" class="xreach-chat-messages"></div>

      <div class="xreach-typing" id="xreach-typing">...</div>

      <div class="xreach-chat-input-area">
        <input id="xreach-chat-input" placeholder="Ask me anything..." />
        <button id="xreach-chat-send" class="send-btn">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  /* Events */
  bubble.addEventListener("click", () => openChat());
  document.getElementById("xreach-chat-close").addEventListener("click", closeChat);
  document.getElementById("xreach-chat-send").addEventListener("click", sendUserMessage);
  document.getElementById("xreach-chat-input").addEventListener("keypress", e => {
    if (e.key === "Enter") sendUserMessage();
  });

  /* Language selection */
  document.querySelectorAll(".lang-chip").forEach(btn =>
    btn.addEventListener("click", () => {
      setLang(btn.dataset.lang);
      updateLanguageUI();
    })
  );

  /* Load correct language on startup */
  updateLanguageUI();
});

/* =========================================================
   Chat Open / Close
========================================================= */
function openChat() {
  const modal = document.getElementById("xreach-chat-modal");
  modal.style.display = "flex";

  const lang = getLang();
  addBotMessage(
    lang === "ps"
      ? "سلام! زه ستاسو سره څنګه مرسته کولی شم؟"
      : lang === "fa"
      ? "سلام! چگونه می‌توانم کمک کنم؟"
      : lang === "ar"
      ? "مرحباً! كيف يمكنني مساعدتك؟"
      : lang === "ur"
      ? "السلام علیکم! میں کیسے مدد کر سکتا ہوں؟"
      : lang === "es"
      ? "¡Hola! ¿Cómo puedo ayudarte hoy?"
      : "Hello! How can I help you today?"
  );
}

function closeChat() {
  document.getElementById("xreach-chat-modal").style.display = "none";
}

/* =========================================================
   Language UI + Suggestions
========================================================= */
function updateLanguageUI() {
  const lang = getLang();

  /* Highlight selected chip */
  document.querySelectorAll(".lang-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.lang === lang);
  });

  /* Update direction (RTL/LTR) */
  document.getElementById("xreach-chat-messages").dir = LANGUAGES[lang].dir;
  document.getElementById("xreach-chat-input").dir = LANGUAGES[lang].dir;

  /* Update suggestions */
  const sugBox = document.getElementById("xreach-suggestions");
  sugBox.innerHTML = SUGGESTIONS[lang]
    .map(s => `<button class="chip">${s}</button>`)
    .join("");

  document.querySelectorAll(".chip").forEach(chip =>
    chip.addEventListener("click", () => {
      document.getElementById("xreach-chat-input").value = chip.textContent;
      sendUserMessage();
    })
  );
}

/* =========================================================
   Timestamps
========================================================= */
function timestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* =========================================================
   Message Rendering
========================================================= */
function addUserMessage(text) {
  const box = document.getElementById("xreach-chat-messages");
  const msg = document.createElement("div");
  msg.className = "xreach-chat-message user";
  msg.innerHTML = `<div class="bubble">${text}</div><span class="time">${timestamp()}</span>`;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

function addBotMessage(text) {
  const box = document.getElementById("xreach-chat-messages");
  const msg = document.createElement("div");
  msg.className = "xreach-chat-message bot";
  msg.innerHTML = `<div class="bubble">${text}</div><span class="time">${timestamp()}</span>`;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

/* =========================================================
   Send User Message
========================================================= */
async function sendUserMessage() {
  const input = document.getElementById("xreach-chat-input");
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  document.getElementById("xreach-typing").style.display = "block";

  const reply = await callLambda(text);

  document.getElementById("xreach-typing").style.display = "none";

  addBotMessage(reply);
}

/* =========================================================
   AWS Lambda Request
========================================================= */
async function callLambda(message) {
  const lang = getLang();

  try {
    const res = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, lang }),
    });

    const data = await res.json();

    return data.reply || "No response received.";
  } catch (err) {
    console.error("Lambda error:", err);
    return "Error connecting to server.";
  }
}
