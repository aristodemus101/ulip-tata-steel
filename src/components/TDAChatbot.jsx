import { useState, useRef, useEffect } from "react";
import C from "../theme";
import { USER } from "../data/userData";

const API_KEY = "AIzaSyACMv2U9vIzYASqBUo1EA7QnWWCRWLDXec";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `You are TDA (Tata Digital Assistant), an AI learning assistant embedded in ULIP — the Unified Learning & Intelligence Platform for Tata Steel employees.

The user you are helping:
- Name: ${USER.name}
- Role: ${USER.role}, Level ${USER.level}
- Department: ${USER.dept}
- Area: ${USER.area}, Plant: ${USER.plant}

ULIP contains:
- Microlearnings (2–5 min bite-size videos/text on safety, engineering, TPM, lean, digital skills)
- Courses (1h–8h structured learning)
- Assessments and quizzes with XP rewards
- Skill Gap Analysis (tracks current vs required proficiency)
- Learning Goals and journey roadmaps
- Gigs (internal project opportunities)
- Mentors (senior experts available for sessions)
- Jobs (internal openings with skill match %)
- Communities (social learning feed)
- Program Director (trainer tools for content creation and analytics)

Key skill areas on ULIP: Fire Safety, LOTO Procedure, Emergency Response, Process Safety, PLC Programming, Predictive Maintenance, Blast Furnace Operations, Industrial IoT, Team Management, Project Management, Data Analytics, Python Basics, Six Sigma, Lean Manufacturing, TPM, TQM, Hydraulics & Pneumatics, Digital Twins, AI/ML Basics, Supply Chain Analytics.

Your job:
- Answer questions about safety procedures, engineering processes, and manufacturing topics relevant to Tata Steel
- Guide users to the right learning content on ULIP
- Explain concepts clearly and concisely
- Be encouraging and professional
- Keep responses concise (2–4 sentences unless a detailed explanation is needed)
- You can suggest relevant microlearnings, courses, or mentors by name when helpful`;

export default function TDAChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: `Hi ${USER.firstName}! I'm TDA, your AI learning assistant. Ask me anything about safety procedures, engineering topics, or learning on ULIP.` }
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const SUGG = [
    "How to start Line 4 safely?",
    "What is lockout-tagout procedure?",
    "Explain HAZOP methodology",
    "What skills should I learn next?",
  ];

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const buildHistory = () =>
    msgs.slice(1).map(m => ({
      role: m.from === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

  const send = async (t) => {
    const txt = (t || inp).trim();
    if (!txt || loading) return;
    setInp("");
    setMsgs(p => [...p, { from: "user", text: txt }]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...buildHistory(),
            { role: "user", parts: [{ text: txt }] },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
        }),
      });

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't get a response. Please try again.";
      setMsgs(p => [...p, { from: "bot", text: reply }]);
    } catch {
      setMsgs(p => [...p, { from: "bot", text: "Connection error. Please check your network and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(p => !p)}
        style={{ position: "fixed", bottom: 28, right: 28, width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.blue2})`, boxShadow: `0 4px 20px ${C.blue}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, cursor: "pointer", zIndex: 500 }}
      >
        {open ? "✕" : "🧠"}
      </div>

      {open && (
        <div style={{ position: "fixed", bottom: 92, right: 28, width: 360, background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, boxShadow: "0 8px 40px #0E172620", zIndex: 499, display: "flex", flexDirection: "column", overflow: "hidden", maxHeight: 520 }}>
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg,${C.blue},${C.blue2})`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ffffff20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧠</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>TDA Assistant</div>
              <div style={{ fontSize: 10, color: "#ffffff80" }}>AI Powered · Future Ready</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span style={{ fontSize: 10, color: "#ffffff80" }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 6 }}>
                {m.from === "bot" && (
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blue3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>🧠</div>
                )}
                <div style={{ maxWidth: "80%", padding: "9px 12px", borderRadius: 12, background: m.from === "user" ? C.blue : C.bg, color: m.from === "user" ? "#fff" : C.text, fontSize: 12, lineHeight: 1.6, borderBottomRightRadius: m.from === "user" ? 2 : 12, borderBottomLeftRadius: m.from === "bot" ? 2 : 12, whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blue3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🧠</div>
                <div style={{ padding: "9px 14px", borderRadius: 12, borderBottomLeftRadius: 2, background: C.bg, display: "flex", gap: 4, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, animation: `tdaBounce 1s ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {msgs.length <= 2 && !loading && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>
              {SUGG.map((s, i) => (
                <div key={i} onClick={() => send(s)} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 20, background: C.blue3, color: C.blue, cursor: "pointer", border: `1px solid ${C.blue4}`, fontWeight: 500 }}>{s}</div>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={inp}
                onChange={e => setInp(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask TDA anything…"
                disabled={loading}
                style={{ flex: 1, padding: "9px 12px", borderRadius: 9, border: `1px solid ${C.border}`, fontSize: 12, outline: "none", background: loading ? C.bg : C.white, color: C.text }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !inp.trim()}
                style={{ padding: "9px 13px", borderRadius: 9, background: loading || !inp.trim() ? C.border : C.blue, border: "none", color: loading || !inp.trim() ? C.text3 : "#fff", fontSize: 14, cursor: loading || !inp.trim() ? "not-allowed" : "pointer", transition: "all 0.15s" }}
              >→</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes tdaBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
