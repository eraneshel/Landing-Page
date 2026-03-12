import { useState, useEffect, useRef } from "react";

const MODES = {
  FORM: "form",
  WIZARD: "wizard",
  CHAT: "chat",
};

const WIZARD_STEPS = [
  { id: "goal", title: "מטרת הדף", icon: "🎯" },
  { id: "business", title: "העסק שלך", icon: "🏢" },
  { id: "content", title: "תוכן", icon: "✍️" },
  { id: "design", title: "עיצוב", icon: "🎨" },
];

const INITIAL_FORM = {
  goal: "",
  businessName: "",
  businessType: "",
  targetAudience: "",
  valueProposition: "",
  features: ["", "", ""],
  ctaText: "",
  ctaUrl: "",
  style: "minimal",
  language: "hebrew",
  colors: "#6366f1",
  socialProof: "",
};

function generateHTML(data) {
  const isHebrew = data.language === "hebrew";
  const dir = isHebrew ? "rtl" : "ltr";
  const fontFamily = isHebrew ? "'Heebo', sans-serif" : "'Inter', sans-serif";
  const googleFont = isHebrew
    ? "https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;800&display=swap"
    : "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap";

  const styles = {
    minimal: {
      bg: "#ffffff",
      text: "#111111",
      accent: data.colors || "#6366f1",
      cardBg: "#f8f8f8",
      heroGrad: `linear-gradient(135deg, #ffffff 0%, #f0f0ff 100%)`,
    },
    bold: {
      bg: "#0a0a0a",
      text: "#ffffff",
      accent: data.colors || "#ff6b35",
      cardBg: "#1a1a1a",
      heroGrad: `linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 100%)`,
    },
    warm: {
      bg: "#fdf6ee",
      text: "#2c1810",
      accent: data.colors || "#d47a2a",
      cardBg: "#fff8f0",
      heroGrad: `linear-gradient(135deg, #fdf6ee 0%, #ffe8d0 100%)`,
    },
    professional: {
      bg: "#f4f6f9",
      text: "#1a2332",
      accent: data.colors || "#0066cc",
      cardBg: "#ffffff",
      heroGrad: `linear-gradient(135deg, #1a2332 0%, #0066cc 100%)`,
    },
  };

  const s = styles[data.style] || styles.minimal;
  const features = data.features.filter((f) => f.trim());
  const goalLabels = {
    signup: isHebrew ? "הרשמו עכשיו" : "Sign Up Now",
    buy: isHebrew ? "קנו עכשיו" : "Buy Now",
    download: isHebrew ? "הורידו בחינם" : "Download Free",
    contact: isHebrew ? "צרו קשר" : "Contact Us",
  };
  const cta = data.ctaText || goalLabels[data.goal] || (isHebrew ? "התחילו עכשיו" : "Get Started");

  return `<!DOCTYPE html>
<html lang="${isHebrew ? "he" : "en"}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.businessName || "דף נחיתה"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="${googleFont}" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: ${s.bg};
      --text: ${s.text};
      --accent: ${s.accent};
      --card: ${s.cardBg};
      --font: ${fontFamily};
    }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      direction: ${dir};
      line-height: 1.6;
    }
    nav {
      position: fixed; top: 0; width: 100%; z-index: 100;
      padding: 1rem 2rem;
      background: ${s.style === "bold" ? "rgba(10,10,10,0.9)" : "rgba(255,255,255,0.9)"};
      backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: space-between;
      border-bottom: 1px solid ${s.text}11;
    }
    nav .logo { font-weight: 800; font-size: 1.2rem; color: var(--accent); }
    nav a {
      text-decoration: none;
      background: var(--accent);
      color: #fff;
      padding: 0.5rem 1.2rem;
      border-radius: 100px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: opacity 0.2s;
    }
    nav a:hover { opacity: 0.85; }
    .hero {
      min-height: 100vh;
      background: ${s.heroGrad};
      display: flex; align-items: center; justify-content: center;
      text-align: center;
      padding: 8rem 2rem 4rem;
    }
    .hero-inner { max-width: 720px; }
    .badge {
      display: inline-block;
      background: ${s.accent}22;
      color: var(--accent);
      border: 1px solid ${s.accent}44;
      padding: 0.3rem 1rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      animation: fadeUp 0.6s ease both;
    }
    h1 {
      font-size: clamp(2.2rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1.2rem;
      animation: fadeUp 0.6s 0.1s ease both;
      color: ${data.style === "professional" ? "#ffffff" : "var(--text)"};
    }
    h1 span { color: var(--accent); }
    .hero p {
      font-size: 1.15rem;
      opacity: 0.75;
      max-width: 540px;
      margin: 0 auto 2.5rem;
      animation: fadeUp 0.6s 0.2s ease both;
      color: ${data.style === "professional" ? "#ffffff" : "var(--text)"};
    }
    .cta-group {
      display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
      animation: fadeUp 0.6s 0.3s ease both;
    }
    .btn-primary {
      background: var(--accent);
      color: #fff;
      padding: 0.9rem 2.2rem;
      border-radius: 100px;
      font-weight: 700;
      font-size: 1rem;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 24px ${s.accent}44;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px ${s.accent}66; }
    .btn-secondary {
      background: transparent;
      color: var(--text);
      padding: 0.9rem 2.2rem;
      border-radius: 100px;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      border: 2px solid ${s.text}33;
      transition: border-color 0.2s;
      color: ${data.style === "professional" ? "#ffffff" : "var(--text)"};
    }
    .btn-secondary:hover { border-color: var(--accent); }
    section { padding: 5rem 2rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-title {
      text-align: center;
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 800;
      margin-bottom: 3rem;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
    }
    .feature-card {
      background: var(--card);
      border: 1px solid ${s.text}11;
      border-radius: 16px;
      padding: 2rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px ${s.accent}22; }
    .feature-icon { font-size: 2rem; margin-bottom: 1rem; }
    .feature-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
    .feature-card p { opacity: 0.65; font-size: 0.95rem; }
    ${data.socialProof ? `
    .social { background: var(--card); }
    .proof-text {
      text-align: center;
      font-size: 1.3rem;
      font-style: italic;
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.8;
      line-height: 1.8;
    }
    .proof-text::before { content: '"'; font-size: 4rem; color: var(--accent); display: block; line-height: 1; margin-bottom: -1rem; }
    ` : ""}
    .cta-section {
      background: ${s.heroGrad};
      text-align: center;
      color: ${data.style === "professional" ? "#ffffff" : "inherit"};
    }
    .cta-section h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin-bottom: 1rem; }
    .cta-section p { opacity: 0.7; margin-bottom: 2rem; font-size: 1.05rem; }
    footer {
      text-align: center;
      padding: 2rem;
      font-size: 0.85rem;
      opacity: 0.4;
      border-top: 1px solid ${s.text}11;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (max-width: 600px) {
      nav { padding: 0.75rem 1rem; }
      section { padding: 3rem 1rem; }
    }
  </style>
</head>
<body>
  <nav>
    <span class="logo">${data.businessName || "Brand"}</span>
    <a href="${data.ctaUrl || "#cta"}">${cta}</a>
  </nav>

  <section class="hero">
    <div class="hero-inner">
      <div class="badge">${data.businessType || (isHebrew ? "חדש" : "New")}</div>
      <h1>${data.valueProposition || (isHebrew ? `<span>${data.businessName || "המוצר שלנו"}</span><br>שינה את כל מה שידעת` : `<span>${data.businessName || "Your Product"}</span><br>Changed Everything`)}</h1>
      <p>${data.targetAudience ? (isHebrew ? `מיועד ל${data.targetAudience}` : `Built for ${data.targetAudience}`) : (isHebrew ? "הפתרון שחיכית לו" : "The solution you've been waiting for")}</p>
      <div class="cta-group">
        <a href="${data.ctaUrl || "#"}" class="btn-primary">${cta}</a>
        <a href="#features" class="btn-secondary">${isHebrew ? "קראו עוד ↓" : "Learn more ↓"}</a>
      </div>
    </div>
  </section>

  ${features.length > 0 ? `
  <section id="features">
    <div class="container">
      <h2 class="section-title">${isHebrew ? "למה אנחנו?" : "Why Choose Us?"}</h2>
      <div class="features-grid">
        ${features.map((f, i) => `
        <div class="feature-card">
          <div class="feature-icon">${["✨", "🚀", "💡", "🔒", "📈"][i % 5]}</div>
          <h3>${f}</h3>
          <p>${isHebrew ? "תיאור קצר של הפיצ׳ר יכנס לכאן" : "A short description of this feature goes here"}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>` : ""}

  ${data.socialProof ? `
  <section class="social">
    <div class="container">
      <div class="proof-text">${data.socialProof}</div>
    </div>
  </section>` : ""}

  <section class="cta-section" id="cta">
    <div class="container">
      <h2>${isHebrew ? "מוכנים להתחיל?" : "Ready to Get Started?"}</h2>
      <p>${isHebrew ? "הצטרפו לאלפי לקוחות מרוצים" : "Join thousands of happy customers"}</p>
      <a href="${data.ctaUrl || "#"}" class="btn-primary">${cta}</a>
    </div>
  </section>

  <footer>
    © ${new Date().getFullYear()} ${data.businessName || "Company"} · ${isHebrew ? "כל הזכויות שמורות" : "All rights reserved"}
  </footer>
</body>
</html>`;
}

// ─── FORM MODE ───────────────────────────────────────────────────────────────
function FormMode({ onGenerate }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setFeature = (i, v) => {
    const f = [...form.features];
    f[i] = v;
    setForm((p) => ({ ...p, features: f }));
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ display: "grid", gap: "1.2rem" }}>
        <Row label="מטרת הדף">
          <select value={form.goal} onChange={(e) => set("goal", e.target.value)} style={inp()}>
            <option value="">בחר מטרה</option>
            <option value="signup">הרשמה / ליד</option>
            <option value="buy">מכירה</option>
            <option value="download">הורדה</option>
            <option value="contact">יצירת קשר</option>
          </select>
        </Row>
        <Row label="שם העסק / מוצר">
          <input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="לדוגמה: Nexus, ClimaX, FitFlow..." style={inp()} />
        </Row>
        <Row label="תחום העסק">
          <input value={form.businessType} onChange={(e) => set("businessType", e.target.value)} placeholder="SaaS, אי-קומרס, שירות מקצועי..." style={inp()} />
        </Row>
        <Row label="קהל יעד">
          <input value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} placeholder="יזמים, הורים, חברות בינוניות..." style={inp()} />
        </Row>
        <Row label="הצעת הערך (כותרת ראשית)">
          <input value={form.valueProposition} onChange={(e) => set("valueProposition", e.target.value)} placeholder="המשפט שיתפוס את תשומת הלב..." style={inp()} />
        </Row>
        <Row label="יתרונות / פיצ'רים">
          {form.features.map((f, i) => (
            <input key={i} value={f} onChange={(e) => setFeature(i, e.target.value)} placeholder={`יתרון ${i + 1}`} style={{ ...inp(), marginBottom: 8 }} />
          ))}
        </Row>
        <Row label="טקסט כפתור CTA">
          <input value={form.ctaText} onChange={(e) => set("ctaText", e.target.value)} placeholder="הירשמו עכשיו / קבלו גישה..." style={inp()} />
        </Row>
        <Row label="קישור CTA">
          <input value={form.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)} placeholder="https://..." style={inp()} />
        </Row>
        <Row label="Social Proof (עדות / מספר)">
          <input value={form.socialProof} onChange={(e) => set("socialProof", e.target.value)} placeholder='"הכלי הטוב ביותר שניסיתי" — יוסי כהן, מנכ"ל...' style={inp()} />
        </Row>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Row label="סגנון">
            <select value={form.style} onChange={(e) => set("style", e.target.value)} style={inp()}>
              <option value="minimal">מינימליסטי</option>
              <option value="bold">בולד / כהה</option>
              <option value="warm">חם / אורגני</option>
              <option value="professional">מקצועי / כחול</option>
            </select>
          </Row>
          <Row label="שפה">
            <select value={form.language} onChange={(e) => set("language", e.target.value)} style={inp()}>
              <option value="hebrew">עברית</option>
              <option value="english">English</option>
            </select>
          </Row>
        </div>
        <Row label="צבע ראשי">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="color" value={form.colors} onChange={(e) => set("colors", e.target.value)} style={{ width: 48, height: 40, border: "none", borderRadius: 8, cursor: "pointer" }} />
            <span style={{ fontSize: 14, opacity: 0.6 }}>{form.colors}</span>
          </div>
        </Row>
        <button onClick={() => onGenerate(form)} style={btnStyle()}>
          ✨ צור דף נחיתה
        </button>
      </div>
    </div>
  );
}

// ─── WIZARD MODE ──────────────────────────────────────────────────────────────
function WizardMode({ onGenerate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const steps = [
    <div key="goal" style={{ display: "grid", gap: 12 }}>
      <p style={{ opacity: 0.6, marginBottom: 8 }}>מה תרצה שהמבקר יעשה?</p>
      {[["signup", "📋", "הרשמה / ליד"], ["buy", "🛒", "רכישה"], ["download", "⬇️", "הורדה"], ["contact", "📞", "יצירת קשר"]].map(([v, icon, label]) => (
        <button key={v} onClick={() => { set("goal", v); setTimeout(() => setStep(1), 300); }}
          style={{ ...optionBtn(), background: form.goal === v ? "#6366f1" : "#f4f4f8", color: form.goal === v ? "#fff" : "#111" }}>
          {icon} {label}
        </button>
      ))}
    </div>,
    <div key="business" style={{ display: "grid", gap: 12 }}>
      <input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="שם העסק / מוצר" style={inp()} />
      <input value={form.businessType} onChange={(e) => set("businessType", e.target.value)} placeholder="תחום: SaaS, חנות, שירות..." style={inp()} />
      <input value={form.targetAudience} onChange={(e) => set("targetAudience", e.target.value)} placeholder="קהל יעד" style={inp()} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <select value={form.language} onChange={(e) => set("language", e.target.value)} style={inp()}>
          <option value="hebrew">עברית</option>
          <option value="english">English</option>
        </select>
        <select value={form.style} onChange={(e) => set("style", e.target.value)} style={inp()}>
          <option value="minimal">מינימליסטי</option>
          <option value="bold">כהה / בולד</option>
          <option value="warm">חם</option>
          <option value="professional">מקצועי</option>
        </select>
      </div>
    </div>,
    <div key="content" style={{ display: "grid", gap: 12 }}>
      <input value={form.valueProposition} onChange={(e) => set("valueProposition", e.target.value)} placeholder="כותרת ראשית — מה הערך המרכזי?" style={inp()} />
      {form.features.map((f, i) => (
        <input key={i} value={f} onChange={(e) => { const arr = [...form.features]; arr[i] = e.target.value; set("features", arr); }} placeholder={`יתרון ${i + 1}`} style={inp()} />
      ))}
      <input value={form.socialProof} onChange={(e) => set("socialProof", e.target.value)} placeholder="עדות / Social Proof (אופציונלי)" style={inp()} />
    </div>,
    <div key="design" style={{ display: "grid", gap: 12 }}>
      <input value={form.ctaText} onChange={(e) => set("ctaText", e.target.value)} placeholder="טקסט כפתור CTA" style={inp()} />
      <input value={form.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)} placeholder="קישור לאחר לחיצה (https://...)" style={inp()} />
      <Row label="צבע ראשי">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="color" value={form.colors} onChange={(e) => set("colors", e.target.value)} style={{ width: 48, height: 40, border: "none", borderRadius: 8 }} />
          <span style={{ fontSize: 13, opacity: 0.5 }}>{form.colors}</span>
        </div>
      </Row>
    </div>,
  ];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
        {WIZARD_STEPS.map((s, i) => (
          <div key={s.id} style={{ flex: 1, cursor: i <= step ? "pointer" : "default" }} onClick={() => i <= step && setStep(i)}>
            <div style={{ height: 4, borderRadius: 4, background: i <= step ? "#6366f1" : "#e5e7eb", transition: "background 0.3s" }} />
            <div style={{ fontSize: 11, opacity: i === step ? 1 : 0.4, marginTop: 6, textAlign: "center", fontWeight: 600 }}>
              {s.icon} {s.title}
            </div>
          </div>
        ))}
      </div>

      <div style={{ minHeight: 260 }}>{steps[step]}</div>

      <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "space-between" }}>
        {step > 0 && <button onClick={() => setStep((s) => s - 1)} style={{ ...btnStyle(), background: "#f4f4f8", color: "#333", flex: 1 }}>← חזור</button>}
        {step < WIZARD_STEPS.length - 1
          ? <button onClick={() => setStep((s) => s + 1)} style={{ ...btnStyle(), flex: 1 }}>המשך →</button>
          : <button onClick={() => onGenerate(form)} style={{ ...btnStyle(), flex: 1 }}>✨ צור דף נחיתה</button>}
      </div>
    </div>
  );
}

// ─── CHAT MODE ────────────────────────────────────────────────────────────────
function ChatMode({ onGenerate }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "שלום! אני כאן לעזור לך לבנות דף נחיתה מקצועי 🚀\n\nספר לי — מה אתה רוצה למכור או להציע?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      history.push({ role: "user", content: userMsg });

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `אתה עוזר ידידותי שעוזר למשתמש לבנות דף נחיתה. שאל שאלות אחת-אחת כדי לאסוף:
1. מטרת הדף (הרשמה/מכירה/הורדה/קשר)
2. שם העסק ותחום
3. קהל יעד
4. הצעת ערך (כותרת ראשית)
5. 2-3 יתרונות עיקריים
6. טקסט CTA
7. סגנון עיצוב (מינימליסטי/כהה/חם/מקצועי)
8. שפה (עברית/אנגלית)

אחרי שאספת את כל המידע, החזר JSON מדויק בפורמט:
READY:{"goal":"signup","businessName":"...","businessType":"...","targetAudience":"...","valueProposition":"...","features":["...","...","..."],"ctaText":"...","ctaUrl":"","style":"minimal","language":"hebrew","colors":"#6366f1","socialProof":""}

עד אז — שוחח בעברית, היה ידידותי וקצר. שאל שאלה אחת בכל הודעה.`,
          messages: history,
        }),
      });

      const data = await res.json();
      const text = data.content?.[0]?.text || "מצטער, נסה שוב.";

      if (text.includes("READY:")) {
        const jsonStr = text.split("READY:")[1].trim();
        try {
          const parsed = JSON.parse(jsonStr);
          setForm(parsed);
          setReady(true);
          setMessages((m) => [...m, { role: "assistant", text: "מעולה! אספתי את כל המידע הדרוש 🎉\nלחץ על הכפתור למטה כדי לייצר את הדף שלך." }]);
        } catch {
          setMessages((m) => [...m, { role: "assistant", text }]);
        }
      } else {
        setMessages((m) => [...m, { role: "assistant", text }]);
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "שגיאה בתקשורת עם ה-AI. נסה שוב." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", height: 500 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%", padding: "0.75rem 1rem", borderRadius: 16,
              background: m.role === "user" ? "#6366f1" : "#f4f4f8",
              color: m.role === "user" ? "#fff" : "#111",
              fontSize: 14, lineHeight: 1.6,
              borderBottomRightRadius: m.role === "user" ? 4 : 16,
              borderBottomLeftRadius: m.role === "user" ? 16 : 4,
              whiteSpace: "pre-wrap",
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: "0.5rem 1rem" }}>
            {[0, 1, 2].map((i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", opacity: 0.5, animation: `bounce 1s ${i * 0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {ready ? (
        <button onClick={() => onGenerate(form)} style={{ ...btnStyle(), margin: "1rem" }}>✨ צור את הדף שלי</button>
      ) : (
        <div style={{ display: "flex", gap: 8, padding: "1rem", borderTop: "1px solid #eee" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="הקלד כאן..." style={{ ...inp(), flex: 1 }} disabled={loading} />
          <button onClick={send} disabled={loading} style={{ ...btnStyle(), padding: "0.75rem 1.2rem" }}>שלח</button>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} }`}</style>
    </div>
  );
}

// ─── PREVIEW ──────────────────────────────────────────────────────────────────
function Preview({ html, onBack, onDownload }) {
  const [device, setDevice] = useState("desktop");
  const widths = { desktop: "100%", tablet: 768, mobile: 375 };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: "1px solid #eee", background: "#fafafa" }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "0.4rem 0.9rem", cursor: "pointer", fontSize: 13 }}>← חזור לעריכה</button>
        <div style={{ display: "flex", gap: 6 }}>
          {[["desktop", "🖥"], ["tablet", "📱"], ["mobile", "📲"]].map(([d, icon]) => (
            <button key={d} onClick={() => setDevice(d)} style={{ background: device === d ? "#6366f1" : "#f4f4f8", color: device === d ? "#fff" : "#333", border: "none", borderRadius: 8, padding: "0.4rem 0.7rem", cursor: "pointer", fontSize: 13 }}>{icon}</button>
          ))}
        </div>
        <button onClick={onDownload} style={{ ...btnStyle(), padding: "0.5rem 1.2rem", fontSize: 13 }}>⬇️ הורד HTML</button>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#e5e7eb", display: "flex", justifyContent: "center", padding: "1.5rem" }}>
        <div style={{ width: widths[device], maxWidth: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
          <iframe srcDoc={html} style={{ width: "100%", height: 700, border: "none" }} title="preview" />
        </div>
      </div>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Row({ label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, opacity: 0.7 }}>{label}</label>
      {children}
    </div>
  );
}
function inp() {
  return { width: "100%", padding: "0.7rem 1rem", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff", direction: "rtl" };
}
function btnStyle() {
  return { background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, padding: "0.85rem 1.5rem", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", transition: "opacity 0.2s" };
}
function optionBtn() {
  return { padding: "0.85rem 1.2rem", borderRadius: 12, border: "2px solid #e5e7eb", cursor: "pointer", fontSize: 15, fontWeight: 600, textAlign: "right", transition: "all 0.2s", direction: "rtl" };
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState(null);
  const [html, setHtml] = useState(null);

  const handleGenerate = (form) => {
    setHtml(generateHTML(form));
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-page.html";
    a.click();
  };

  if (html) {
    return <Preview html={html} onBack={() => setHtml(null)} onDownload={handleDownload} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "'Heebo', 'Inter', sans-serif", direction: "rtl" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "1.2rem 2rem", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✨</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17 }}>Landing AI</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>בניית דפי נחיתה בשניות</div>
        </div>
        {mode && <button onClick={() => setMode(null)} style={{ marginRight: "auto", background: "none", border: "1px solid #ddd", borderRadius: 8, padding: "0.4rem 0.9rem", cursor: "pointer", fontSize: 13 }}>← שנה מצב</button>}
      </div>

      {!mode ? (
        /* Mode Selection */
        <div style={{ maxWidth: 700, margin: "4rem auto", padding: "0 1rem" }}>
          <h1 style={{ textAlign: "center", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 800, marginBottom: 8 }}>בחר את דרך העבודה שלך</h1>
          <p style={{ textAlign: "center", opacity: 0.5, marginBottom: 3 }}>שלושה מסלולים, תוצאה אחת: דף נחיתה מקצועי</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginTop: 40 }}>
            {[
              { id: MODES.FORM, icon: "📋", title: "טופס מלא", desc: "מלא את כל הפרטים בבת אחת. מהיר ויעיל.", color: "#6366f1" },
              { id: MODES.WIZARD, icon: "🧙", title: "ויזרד שלבי", desc: "הדרכה צעד אחר צעד. מושלם למתחילים.", color: "#0ea5e9" },
              { id: MODES.CHAT, icon: "💬", title: "שיחה עם AI", desc: "ספר לי על העסק בשפה חופשית.", color: "#10b981" },
            ].map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{ background: "#fff", border: `2px solid #e5e7eb`, borderRadius: 16, padding: "2rem 1.5rem", cursor: "pointer", textAlign: "center", transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${m.color}22`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{m.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{m.title}</div>
                <div style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.5 }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 800, margin: "2rem auto", background: "#fff", borderRadius: 20, border: "1px solid #eee", overflow: "hidden" }}>
          <div style={{ padding: "1.2rem 1.5rem", borderBottom: "1px solid #f0f0f0", background: "#fafafa", fontWeight: 700, fontSize: 15 }}>
            {{ [MODES.FORM]: "📋 טופס מלא", [MODES.WIZARD]: "🧙 ויזרד שלבי", [MODES.CHAT]: "💬 שיחה עם AI" }[mode]}
          </div>
          {mode === MODES.FORM && <FormMode onGenerate={handleGenerate} />}
          {mode === MODES.WIZARD && <WizardMode onGenerate={handleGenerate} />}
          {mode === MODES.CHAT && <ChatMode onGenerate={handleGenerate} />}
        </div>
      )}
    </div>
  );
}
