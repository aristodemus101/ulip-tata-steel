import { useState } from "react";
import C from "../theme";
import { NAV_ITEMS } from "../data/navItems";
import { USER } from "../data/userData";
import { SKILL_NAMES } from "../data/learningData";
import { GROUPS } from "../data/workData";

/* ─── tiny reusable primitives ──────────────────────────────────────────── */
const Tag = ({ label, color = C.blue }) => (
  <span style={{ padding:"2px 9px", borderRadius:20, background:`${color}18`, color, fontSize:10, fontWeight:700, border:`1px solid ${color}30` }}>{label}</span>
);

const SectionHeader = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom:28 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
      <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{icon}</div>
      <h2 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif", margin:0 }}>{title}</h2>
    </div>
    {subtitle && <p style={{ fontSize:13, color:C.text3, margin:"0 0 0 54px", lineHeight:1.6 }}>{subtitle}</p>}
  </div>
);

const Divider = () => <div style={{ height:1, background:C.border, margin:"40px 0" }}/>;

/* ─── flow arrow ──────────────────────────────────────────────────────────── */
const DownArrow = () => (
  <div style={{ display:"flex", justifyContent:"center", margin:"4px 0" }}>
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
      <div style={{ width:2, height:16, background:C.blue4 }}/>
      <div style={{ width:0, height:0, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderTop:`8px solid ${C.blue4}` }}/>
    </div>
  </div>
);

const RightArrow = ({ color = C.blue4 }) => (
  <div style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
    <div style={{ height:2, width:20, background:color }}/>
    <div style={{ width:0, height:0, borderTop:"6px solid transparent", borderBottom:"6px solid transparent", borderLeft:`8px solid ${color}` }}/>
  </div>
);

/* ─── architecture layer card ─────────────────────────────────────────────── */
const ArchLayer = ({ icon, label, tech, desc, color, accent }) => (
  <div style={{ background:C.white, border:`2px solid ${color}40`, borderRadius:14, padding:"14px 20px", display:"flex", alignItems:"center", gap:16 }}>
    <div style={{ width:48, height:48, borderRadius:12, background:`${color}18`, border:`2px solid ${color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
    <div style={{ flex:1 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
        <span style={{ fontSize:14, fontWeight:700, color:C.text }}>{label}</span>
        <Tag label={tech} color={color}/>
      </div>
      <div style={{ fontSize:12, color:C.text3, lineHeight:1.5 }}>{desc}</div>
    </div>
    <div style={{ width:12, height:12, borderRadius:"50%", background:accent || color, boxShadow:`0 0 8px ${accent || color}60`, flexShrink:0 }}/>
  </div>
);

/* ─── expandable component card ──────────────────────────────────────────── */
const ComponentCard = ({ icon, label, color, purpose, inputs, processing, outputs, deps, open, onToggle }) => (
  <div style={{ background:C.white, border:`1.5px solid ${open ? color : C.border}`, borderRadius:14, overflow:"hidden", transition:"border-color 0.2s" }}>
    <button onClick={onToggle} style={{ width:"100%", padding:"14px 18px", display:"flex", alignItems:"center", gap:12, background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
      <div style={{ width:38, height:38, borderRadius:10, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{icon}</div>
      <span style={{ flex:1, fontSize:13, fontWeight:700, color:C.text }}>{label}</span>
      <span style={{ fontSize:11, color:open ? color : C.text3, fontWeight:600, transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▼</span>
    </button>
    {open && (
      <div style={{ padding:"0 18px 18px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:14 }}>
          {[
            { label:"Purpose",    icon:"🎯", text:purpose },
            { label:"Inputs",     icon:"📥", text:inputs },
            { label:"Processing", icon:"⚙️",  text:processing },
            { label:"Outputs",    icon:"📤", text:outputs },
          ].map(({ label:l, icon:ic, text }) => (
            <div key={l} style={{ background:C.bg, borderRadius:10, padding:"10px 12px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>{ic} {l}</div>
              <div style={{ fontSize:12, color:C.text, lineHeight:1.55 }}>{text}</div>
            </div>
          ))}
        </div>
        {deps && (
          <div style={{ marginTop:10, display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ fontSize:10, color:C.text3, fontWeight:600 }}>DEPENDS ON:</span>
            {deps.map(d => <Tag key={d} label={d} color={color}/>)}
          </div>
        )}
      </div>
    )}
  </div>
);

/* ─── tech stack card ─────────────────────────────────────────────────────── */
const TechCard = ({ icon, label, version, desc, color }) => (
  <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px", transition:"box-shadow 0.2s" }}
    onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 4px 20px ${color}25`}
    onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
    <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
    <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{label}</div>
    {version && <div style={{ fontSize:10, color, fontWeight:700, marginBottom:6 }}>{version}</div>}
    <div style={{ fontSize:11, color:C.text3, lineHeight:1.55 }}>{desc}</div>
  </div>
);

/* ─── FAQ item ─────────────────────────────────────────────────────────────── */
const FAQItem = ({ q, a, open, onToggle }) => (
  <div style={{ background:C.white, border:`1.5px solid ${open ? C.blue : C.border}`, borderRadius:12, overflow:"hidden", marginBottom:8 }}>
    <button onClick={onToggle} style={{ width:"100%", padding:"14px 18px", display:"flex", alignItems:"center", gap:12, background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
      <span style={{ fontSize:13, fontWeight:600, color:C.text, flex:1, lineHeight:1.5 }}>{q}</span>
      <span style={{ fontSize:11, color:open ? C.blue : C.text3, fontWeight:700, flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▼</span>
    </button>
    {open && <div style={{ padding:"0 18px 16px", fontSize:13, color:C.text2, lineHeight:1.7, borderTop:`1px solid ${C.border}` }}>{a}</div>}
  </div>
);

/* ─── pipeline step ──────────────────────────────────────────────────────── */
const PipeStep = ({ icon, label, desc, color, index }) => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1, minWidth:80 }}>
    <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}cc)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, boxShadow:`0 4px 16px ${color}40`, marginBottom:8, position:"relative" }}>
      {icon}
      <div style={{ position:"absolute", top:-4, right:-4, width:18, height:18, borderRadius:"50%", background:C.white, border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color }}>{index}</div>
    </div>
    <div style={{ fontSize:11, fontWeight:700, color:C.text, textAlign:"center", marginBottom:3 }}>{label}</div>
    <div style={{ fontSize:10, color:C.text3, textAlign:"center", lineHeight:1.4 }}>{desc}</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function MethodologyPage() {
  const [openComp, setOpenComp]   = useState(null);
  const [openFAQ,  setOpenFAQ]    = useState(null);

  const COMPONENTS = [
    { icon:"🖥️",  label:"Frontend / UI Layer",       color:C.blue,
      purpose:"Renders all pages, handles user interaction, and manages application state using React 19.",
      inputs:"User clicks, form inputs, keyboard events, navigation actions.",
      processing:"React reconciles component state changes and re-renders only the changed parts of the UI efficiently.",
      outputs:"Visual HTML/CSS interface; updated state triggers; callbacks to data layer.",
      deps:["React 19","Vite","Inline Styles","Google Fonts"] },

    { icon:"🔐",  label:"Authentication Layer",      color:"#9B59B6",
      purpose:"Controls access to the platform. Only authenticated users can see the main application.",
      inputs:"Login button click from OPR/NOPR option on LoginPage.",
      processing:"Sets `loggedIn` boolean in App.jsx state. Production would validate via Azure AD SSO + MFA token.",
      outputs:"Unlocks main application shell (Sidebar + TopBar + Pages). Triggers 15s microlearning popup timer.",
      deps:["App.jsx state","Azure AD (planned)","MFA (planned)"] },

    { icon:"🧭",  label:"State-Based Router",        color:C.accent,
      purpose:"Controls which page is visible without URL changes. All navigation is in-memory via React state.",
      inputs:"Sidebar button clicks passing item.id string (e.g. 'home', 'profile', 'director').",
      processing:"App.jsx switch-case maps id strings to page components. Sidebar highlights active item.",
      outputs:"Correct page component rendered in main content area.",
      deps:["App.jsx","Sidebar.jsx","navItems.js"] },

    { icon:"🧠",  label:"TDA AI Chatbot (Gemini)",   color:"#18B982",
      purpose:"Provides real-time AI-powered learning assistance using Google Gemini 2.5 Flash Lite.",
      inputs:"User text message + full conversation history + user profile (name, role, dept, plant).",
      processing:"Builds conversation history array, appends system prompt with ULIP context and user data, calls Gemini API at 0.7 temperature. Parses SUGGESTIONS JSON tag from response tail.",
      outputs:"AI reply text (2–4 sentences) + one microlearning suggestion + one course suggestion rendered as hyperlinks.",
      deps:["Google Gemini API","VITE_GEMINI_API_KEY","userData.js"] },

    { icon:"⚡",  label:"Microlearning Engine",      color:"#F5A623",
      purpose:"Delivers bite-size knowledge checks (2–5 min) with MCQ quizzes and XP rewards.",
      inputs:"Triggered 15s after login, or by tapping the microlearning notification in TopBar.",
      processing:"3-phase flow: watch (content + key points) → question (MCQ selection) → result (correct/wrong grading, 600ms animation delay). Checks selected option against correct answer key.",
      outputs:"XP reward notification (+5 XP in TQM) added to global notification list if correct. Phase result UI shown.",
      deps:["App.jsx","TopBar notifications","MicrolearningPopup.jsx","userData.js"] },

    { icon:"📊",  label:"Skill Gap Analytics",       color:C.red,
      purpose:"Shows dept-level skill gap percentages to trainers in the Program Director module.",
      inputs:"Trainer selects department filter and optionally seniority level and reporting manager.",
      processing:"Looks up SKILL_GAP_DATA object by department key, renders progress bars for each skill gap percentage.",
      outputs:"Bar chart visualisation of achieved vs gap % per skill. Summary stats: avg gap, critical gaps count, dept employees.",
      deps:["workData.js SKILL_GAP_DATA","ProgramDirector.jsx"] },

    { icon:"🎯",  label:"Recommendation Engine",     color:C.blue,
      purpose:"Surfaces relevant learning content matched to the user's role, skill profile, and goals.",
      inputs:"User profile (role IL4, dept TQM, area H Blast Furnace), skill gap data, learning history.",
      processing:"Static matching in learningData.js (curated for demo). Production would rank by cosine similarity between skill gap vector and course tag vector.",
      outputs:"REC_LEARNINGS array (4 courses with match %) shown on HomePage. AI chatbot also generates contextual suggestions.",
      deps:["learningData.js","userData.js","TDAChatbot suggestions"] },

    { icon:"🔔",  label:"Notification System",       color:"#FF6B35",
      purpose:"Delivers real-time in-app alerts for learning events, XP gains, safety reminders, and action triggers.",
      inputs:"Static initial notifications in App.jsx + dynamic addNotification() calls from MicrolearningPopup.",
      processing:"Notifications array stored in App.jsx state. TopBar reads unread count (n.u flag), renders dropdown list. Notifications with action:'micro' trigger popup on click.",
      outputs:"Dropdown notification panel, unread badge count on bell icon, popup triggers.",
      deps:["App.jsx state","TopBar.jsx","MicrolearningPopup.jsx"] },

    { icon:"🏭",  label:"Program Director (Admin)",  color:"#003D6B",
      purpose:"Trainer-only control panel for creating content, running analytics, booking sessions and managing campaigns.",
      inputs:"Trainer interactions: filter selections, file uploads, content generation requests, booking forms.",
      processing:"16 sub-sections grouped into 3 categories: Analytics & Insights, Content Creation, Training Management. Each sub-section manages its own local state.",
      outputs:"Skill gap charts, AI-generated content placeholders, booking confirmations, campaign setups, training dashboards.",
      deps:["workData.js","MicrolearningEngine.jsx","LiveWorkUpdates.jsx"] },

    { icon:"☁️",  label:"Hosting & CI/CD",           color:"#8A94A6",
      purpose:"Serves the built application globally via Firebase CDN with automated deployments on every GitHub push.",
      inputs:"Git push to main branch triggers GitHub Actions workflow.",
      processing:"GitHub Actions: npm ci → npm run build (Vite bundles to dist/) → Firebase CLI deploys to ulip-tata-steel-788a0.",
      outputs:"Live production app at Firebase Hosting URL. PR previews on pull requests.",
      deps:["Firebase Hosting","GitHub Actions","VITE_GEMINI_API_KEY secret"] },
  ];

  const FAQS = [
    { q:"How does the AI chatbot know about Tata Steel and ULIP?",
      a:"Every message to the AI includes a detailed system prompt (sent invisibly) that briefs the model on who it is (TDA), who the user is (name, role, department, plant), what content exists in ULIP (microlearnings, courses, skill areas), and how to respond. This context is re-sent with every message so the AI always has full situational awareness, even though it has no persistent memory between sessions." },
    { q:"How are course and microlearning suggestions generated in the chatbot?",
      a:"The system prompt instructs Gemini to always append a structured tag at the end of every response: SUGGESTIONS:{\"micro\":\"...\",\"course\":\"...\"}. The frontend uses a regular expression to extract these titles, strips them from the displayed text, and renders them as clickable hyperlinks in a 'Suggested on ULIP' card below the response." },
    { q:"How does the skill gap analysis work?",
      a:"Skill gap data is stored as a department-indexed object (SKILL_GAP_DATA in workData.js). Each department has a list of skills with a gap percentage representing the difference between the average current proficiency and the required proficiency for that role. Trainers filter by department, manager, and seniority level. The visualisation renders horizontal progress bars showing achieved vs gap portions." },
    { q:"How are learning recommendations generated?",
      a:"For this version, recommendations are curated and stored as static data in learningData.js, pre-matched to the user's role profile (IL4 Maintenance Engineer, TQM dept). Match percentages (88%–94%) reflect the editorial match quality. In a production deployment, this would be replaced by a vector similarity model comparing the user's skill gap vector against course tag embeddings." },
    { q:"Why does the app not use a URL for each page?",
      a:"The app uses state-based in-memory routing rather than React Router. This was an intentional architectural choice for simplicity and speed of development. The active page is stored as a string in App.jsx's state, and a switch-case renders the correct component. Firebase Hosting is configured with a catch-all rewrite to index.html, which supports this SPA pattern." },
    { q:"How is the XP system calculated?",
      a:"Each correct quiz answer in the MicrolearningPopup awards +5 Skill XP in the relevant skill area (e.g. TQM). XP is displayed against a cumulative total (4,825 / 10,000 for TQM in the demo). A notification is fired via the addNotification() callback in App.jsx, which prepends a new entry to the global notifications array, immediately visible in the TopBar bell dropdown." },
    { q:"Is user data secure?",
      a:"In this demonstration build, the user profile is hardcoded in userData.js and no real authentication is performed. The Gemini API key is stored as a GitHub Secret and injected only at build time via the VITE_GEMINI_API_KEY environment variable — it is never committed to the repository. Production deployment would integrate Azure Active Directory SSO with MFA, and all user data would come from the enterprise identity provider." },
    { q:"How does the notification system work?",
      a:"Notifications are stored as an array in App.jsx state and passed as props to TopBar. The bell icon shows an unread badge count. Some notifications carry an action property (e.g. action:'micro') — clicking these triggers callbacks (like opening the microlearning popup) via the onNotifClick handler. New notifications are prepended to the array via the addNotification() function, so the latest always appears first." },
    { q:"What triggers the microlearning popup?",
      a:"Two triggers: (1) Automatically — a setTimeout in App.jsx fires after 15 seconds post-login, setting showMicro to true. (2) Manually — clicking the 'Daily Microlearning ready' notification in the TopBar bell dropdown calls setShowMicro(true) via the onNotifClick handler." },
    { q:"How does the Program Director's content grouping work?",
      a:"The 16 original section tabs were grouped into 3 logical categories: Analytics & Insights (4 tabs), Content Creation (6 tabs), and Training Management (6 tabs). Each category is rendered as a clickable card tile. When a tile is selected, its sub-tabs appear below. The active group colour is used as the accent for all its sub-tab buttons, providing visual continuity." },
  ];

  return (
    <div style={{ maxWidth:1100, paddingBottom:60 }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div style={{ background:`linear-gradient(135deg,#001E3C,#003D6B,#005A8E)`, borderRadius:20, padding:"36px 40px", marginBottom:32, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ position:"absolute", bottom:-80, left:-40, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <Tag label="DOCUMENTATION" color="#FFD166"/>
            <Tag label="v1.0 · 2025" color="rgba(255,255,255,0.5)"/>
          </div>
          <h1 style={{ fontSize:36, fontWeight:900, color:"#fff", fontFamily:"'Playfair Display',serif", margin:"0 0 10px", lineHeight:1.15 }}>How ULIP Works</h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.75)", maxWidth:680, lineHeight:1.7, margin:"0 0 24px" }}>
            A complete, transparent guide to the Unified Learning &amp; Intelligence Platform — covering architecture, AI pipelines, data flow, user journeys, and every system component that powers learning at Tata Steel.
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {["React 19","Google Gemini AI","Firebase Hosting","Vite 8","State-Based Routing"].map(t => (
              <span key={t} style={{ padding:"4px 12px", borderRadius:20, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", fontSize:11, color:"rgba(255,255,255,0.85)", fontWeight:600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── stat strip ───────────────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:40 }}>
        {[
          { v:String(NAV_ITEMS.length),                         l:"Nav Pages",         c:C.blue   },
          { v:String(COMPONENTS.length),                        l:"System Components", c:"#9B59B6"},
          { v:"1",                                              l:"AI Model (Gemini)", c:"#18B982"},
          { v:String(GROUPS.reduce((s,g)=>s+g.tabs.length,0)), l:"Director Sections", c:C.accent },
          { v:String(SKILL_NAMES.length),                       l:"Skill Domains",     c:C.text3  },
        ].map(({ v,l,c }) => (
          <div key={l} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px", textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:900, color:c, fontFamily:"'Playfair Display',serif" }}>{v}</div>
            <div style={{ fontSize:10, color:C.text3, marginTop:4, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── 1. Overview ──────────────────────────────────────────────────── */}
      <SectionHeader icon="🔭" title="1 · Overview" subtitle="What ULIP is, why it exists, and the problem it solves for Tata Steel employees."/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        {[
          { icon:"🏭", title:"What it is", color:C.blue,
            body:"ULIP (Unified Learning & Intelligence Platform) is a web-based learning platform built for Tata Steel employees. It consolidates microlearnings, courses, skill tracking, internal gigs, jobs, SME connections, and an AI assistant into a single experience." },
          { icon:"❓", title:"The problem it solves", color:C.red,
            body:"Learning resources at large enterprises are scattered — spread across email, PDFs, classroom calendars, and siloed portals. Employees miss relevant content; trainers cannot easily see who has skill gaps; and nudges rarely reach people at the right moment. ULIP centralises all of this." },
          { icon:"💡", title:"Core value proposition", color:"#18B982",
            body:"Any Tata Steel employee (OPR/NOPR, any plant, any department) can log in, get AI-personalised learning recommendations, complete a 2-minute microlearning, earn XP, request an SME session, and apply for an internal gig — all in one place." },
          { icon:"👥", title:"Who it is built for", color:"#9B59B6",
            body:"Permanent employees across all IL and NS levels, across departments including Operations, TQM, Safety, Technology, Engineering, and HRM. A dedicated Program Director view gives trainers and administrators a separate toolset for content creation and analytics." },
        ].map(({ icon, title, color, body }) => (
          <div key={title} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <span style={{ fontSize:20 }}>{icon}</span>
              <span style={{ fontSize:13, fontWeight:700, color }}>{title}</span>
            </div>
            <p style={{ fontSize:12, color:C.text2, lineHeight:1.7, margin:0 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* ── Platform Snapshot ────────────────────────────────────────────── */}
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"24px", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:"0.12em" }}>Live Platform Structure</div>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade8080" }}/>
          <div style={{ fontSize:9, color:"#18B982", fontWeight:600 }}>Auto-synced from source code</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.blue, marginBottom:8 }}>🧭 Navigation · {NAV_ITEMS.length} pages</div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {NAV_ITEMS.map(item => (
                <div key={item.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 10px", borderRadius:8, background:C.bg, border:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:14 }}>{item.icon}</span>
                  <span style={{ fontSize:11, color:C.text }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.accent, marginBottom:8 }}>🎓 Program Director · {GROUPS.reduce((s,g)=>s+g.tabs.length,0)} sub-sections</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {GROUPS.map(g => (
                <div key={g.id}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                    <span style={{ fontSize:13 }}>{g.icon}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:g.color }}>{g.label}</span>
                    <span style={{ fontSize:9, padding:"1px 5px", borderRadius:6, background:`${g.color}18`, color:g.color, fontWeight:700 }}>{g.tabs.length}</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:2, paddingLeft:18 }}>
                    {g.tabs.map(t => (
                      <div key={t.id} style={{ fontSize:10, color:C.text3, lineHeight:1.4 }}>· {t.label}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:"#18B982", marginBottom:8 }}>🎯 Skill Domains · {SKILL_NAMES.length} areas</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {SKILL_NAMES.map(s => (
                <span key={s} style={{ padding:"3px 8px", borderRadius:10, background:`${C.blue}10`, border:`1px solid ${C.blue}20`, fontSize:9, color:C.text2, lineHeight:1.5 }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Divider/>

      {/* ── 2. User Journey ──────────────────────────────────────────────── */}
      <SectionHeader icon="🗺️" title="2 · User Journey" subtitle="Step-by-step walkthrough of a typical ULIP session from login to XP reward."/>
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"28px 24px", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:0, overflowX:"auto", paddingBottom:8 }}>
          {[
            { icon:"🔐", label:"Login",          desc:"OPR/NOPR selects login type. Azure AD SSO validates identity.",                              color:"#9B59B6" },
            { icon:"🏠", label:"Dashboard",       desc:"Home page loads: Daily Byte, ongoing trainings, recommended content, calendar.",             color:C.blue    },
            { icon:"🔔", label:"Notification",    desc:"Bell shows microlearning ready. User taps to launch 2-min learning.",                       color:"#F5A623" },
            { icon:"📖", label:"Watch & Read",    desc:"Microlearning content panel: video placeholder, summary, 7 key points.",                    color:C.accent  },
            { icon:"❓", label:"Quiz",             desc:"MCQ knowledge check. User selects one of 4 options and submits.",                           color:C.red     },
            { icon:"🎉", label:"+5 XP",           desc:"Correct answer triggers XP reward card and bell notification.",                             color:"#18B982" },
            { icon:"🧠", label:"Ask TDA",         desc:"User opens AI widget, asks follow-up question, gets answer + ULIP content suggestions.",    color:"#003D6B" },
            { icon:"🚀", label:"Next Action",     desc:"User clicks recommended course, applies for a gig, or books an SME session.",               color:"#FF6B35" },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display:"flex", alignItems:"flex-start" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:100, minWidth:100 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${step.color},${step.color}cc)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, boxShadow:`0 4px 16px ${step.color}35`, marginBottom:8, position:"relative" }}>
                  {step.icon}
                  <div style={{ position:"absolute", top:-6, right:-6, width:20, height:20, borderRadius:"50%", background:C.white, border:`2px solid ${step.color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:step.color }}>{i+1}</div>
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:C.text, textAlign:"center", marginBottom:4 }}>{step.label}</div>
                <div style={{ fontSize:10, color:C.text3, textAlign:"center", lineHeight:1.4 }}>{step.desc}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ display:"flex", alignItems:"center", marginTop:14, flexShrink:0 }}>
                  <RightArrow color={step.color}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ── 3. Architecture Diagram ──────────────────────────────────────── */}
      <SectionHeader icon="🏗️" title="3 · High-Level Architecture" subtitle="The six layers that make up the ULIP platform stack, from browser to deployment infrastructure."/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <ArchLayer icon="🖥️" label="Frontend Layer"        tech="React 19 · Vite 8"             color={C.blue}    desc={`Single-page application with ${NAV_ITEMS.length} pages, ${COMPONENTS.length} components, emoji-based icons, and 100% inline CSS styling. No external UI library.`} accent="#4ade80"/>
          <DownArrow/>
          <ArchLayer icon="🧭" label="State Router"           tech="App.jsx switch-case"            color={C.accent}  desc="In-memory navigation. Active page stored as a string; switch-case maps to React components. No URL changes." accent="#4ade80"/>
          <DownArrow/>
          <ArchLayer icon="🧠" label="AI Layer"               tech="Google Gemini 2.5 Flash Lite"  color="#18B982"   desc="TDA chatbot sends user messages + system context to Gemini API. Parses SUGGESTIONS tag from response for content links." accent="#4ade80"/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <ArchLayer icon="📦" label="Data Layer"             tech="Static JS modules"             color="#9B59B6"   desc="All platform data (users, skills, courses, gigs, jobs, SMEs) lives in three JS files: learningData.js, workData.js, userData.js." accent="#4ade80"/>
          <DownArrow/>
          <ArchLayer icon="🔔" label="Notification Engine"    tech="React state (App.jsx)"         color="#FF6B35" desc="Global notifications array with addNotification() function. TopBar reads unread count; action-typed notifs trigger app events." accent="#4ade80"/>
          <DownArrow/>
          <ArchLayer icon="☁️" label="Hosting & CI/CD"        tech="Firebase · GitHub Actions"     color="#8A94A6"   desc="GitHub push triggers build pipeline. Vite bundles to dist/. Firebase deploys globally with SPA rewrite rule. PR previews supported." accent="#4ade80"/>
        </div>
      </div>

      <Divider/>

      {/* ── 4. System Components ─────────────────────────────────────────── */}
      <SectionHeader icon="🔩" title="4 · System Components" subtitle="Click any component to see its purpose, inputs, processing logic, outputs, and dependencies."/>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {COMPONENTS.map((c, i) => (
          <ComponentCard key={c.label} {...c} open={openComp===i} onToggle={() => setOpenComp(openComp===i ? null : i)}/>
        ))}
      </div>

      <Divider/>

      {/* ── 5. Data Flow ─────────────────────────────────────────────────── */}
      <SectionHeader icon="🌊" title="5 · Data Flow" subtitle="How information moves through the platform from the moment a user acts to the moment they see a result."/>
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"28px", marginBottom:16 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
          {[
            { nodes:["User types message","Selects quiz answer","Clicks navigation"],                             label:"User Input",    icon:"👤", color:"#9B59B6" },
            { nodes:["Text trimmed & checked","Option validated","Auth state checked"],                           label:"Validation",    icon:"✅", color:C.blue    },
            { nodes:["Message added to history","State updated in App","Notification prepended"],                  label:"State Update",  icon:"⚙️",  color:"#F5A623" },
            { nodes:["Gemini API called","DOM re-renders","XP notification fires"],                               label:"Output",        icon:"📤", color:"#18B982" },
          ].map(({ nodes, label, icon, color }, ci, arr) => (
            <div key={label} style={{ display:"flex", alignItems:"stretch" }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, padding:"0 12px" }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>{icon}</div>
                  <span style={{ fontSize:12, fontWeight:700, color }}>{label}</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6, padding:"0 12px" }}>
                  {nodes.map(n => (
                    <div key={n} style={{ padding:"8px 10px", borderRadius:8, background:C.bg, border:`1px solid ${color}25`, fontSize:11, color:C.text2, lineHeight:1.4 }}>• {n}</div>
                  ))}
                </div>
              </div>
              {ci < arr.length - 1 && (
                <div style={{ display:"flex", alignItems:"center", padding:"0 4px" }}>
                  <RightArrow color={color}/>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* second row: specific chatbot data flow */}
        <div style={{ marginTop:24, padding:"16px 20px", background:`${C.blue}08`, border:`1px solid ${C.blue}20`, borderRadius:12 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.blue, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>Chatbot Data Flow in Detail</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            {["User message","+ chat history","+ system prompt","+ user profile","→ Gemini API","→ raw response","→ regex parse","→ clean text + suggestions","→ rendered in UI"].map((s,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                {i > 0 && i !== 4 && <span style={{ color:C.text3, fontSize:10 }}></span>}
                <span style={{ padding:"4px 10px", borderRadius:20, background: s.startsWith("→") ? `${C.blue}15` : C.white, border:`1px solid ${s.startsWith("→") ? C.blue : C.border}`, fontSize:11, color:s.startsWith("→") ? C.blue : C.text2, fontWeight:s.startsWith("→") ? 600 : 400 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider/>

      {/* ── 6. AI Architecture ───────────────────────────────────────────── */}
      <SectionHeader icon="🤖" title="6 · AI Architecture" subtitle="How the TDA (Tata Digital Assistant) chatbot is designed, what it knows, and how responses are structured."/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[
            { step:1, icon:"👤", label:"User Context Injection",    color:"#9B59B6", desc:"Before every API call, the system prompt is prepended with the user's name, role (Maintenance Engineer), level (IL4), department (TQM), area (H Blast Furnace), and plant (TSN). The AI always knows who it is talking to." },
            { step:2, icon:"📚", label:"ULIP Knowledge Briefing",   color:C.blue,    desc:"The system prompt lists all 20 skill domains available on ULIP, all 9 content types (microlearnings, courses, assessments, gigs, jobs, SMEs, goals, communities, Program Director), and response style guidelines." },
            { step:3, icon:"💬", label:"Conversation History",      color:"#F5A623", desc:"All prior messages are included in every API call as a structured contents array with 'user' and 'model' roles. This gives the AI memory of the current session without any server-side session storage." },
            { step:4, icon:"🔧", label:"Config: Balanced Creativity",color:"#18B982", desc:"Temperature is set to 0.7 — enough creativity for natural conversation while remaining factually grounded. maxOutputTokens is capped at 512 to keep responses concise and fast." },
            { step:5, icon:"🏷️", label:"Structured Output Parsing", color:C.red,     desc:"Every response is required to end with SUGGESTIONS:{\"micro\":\"...\",\"course\":\"...\"}. The frontend strips this tag via regex, stores suggestions as a separate object, and renders them as labelled hyperlinks below the chat bubble." },
          ].map(({ step, icon, label, color, desc }) => (
            <div key={step} style={{ display:"flex", gap:12, alignItems:"flex-start", background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{icon}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color, marginBottom:4 }}>Step {step}: {label}</div>
                <div style={{ fontSize:12, color:C.text2, lineHeight:1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ background:`linear-gradient(135deg,#001E3C,#003D6B)`, borderRadius:14, padding:"20px", color:"#fff", fontFamily:"monospace", fontSize:11, lineHeight:1.8, marginBottom:12 }}>
            <div style={{ color:"#FFD166", fontWeight:700, marginBottom:8, fontFamily:"'DM Sans',sans-serif", fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>System Prompt Structure</div>
            <div style={{ color:"#90CAF9" }}>{"// Identity"}</div>
            <div>You are <span style={{ color:"#FFD166" }}>TDA</span>, AI assistant in ULIP</div>
            <div style={{ color:"#90CAF9", marginTop:6 }}>{"// User Context"}</div>
            <div>Name: <span style={{ color:"#A5D6A7" }}>{USER.name}</span></div>
            <div>Role: <span style={{ color:"#A5D6A7" }}>{USER.role} · {USER.level}</span></div>
            <div>Dept: <span style={{ color:"#A5D6A7" }}>{USER.dept} · {USER.area} · {USER.plant}</span></div>
            <div style={{ color:"#90CAF9", marginTop:6 }}>{"// ULIP Content Catalog"}</div>
            <div>{SKILL_NAMES.length} skill domains, 9 content types</div>
            <div style={{ color:"#90CAF9", marginTop:6 }}>{"// Response Rules"}</div>
            <div>- 2–4 sentences, Tata Steel context</div>
            <div>- Connect topics to manufacturing</div>
            <div>- Always end with:</div>
            <div style={{ color:"#FFD166" }}>{"SUGGESTIONS:{\"micro\":\"...\","}</div>
            <div style={{ color:"#FFD166", paddingLeft:16 }}>{"\"course\":\"...\"}"}</div>
          </div>
          <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.text3, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Hallucination Minimisation</div>
            {["System prompt grounds answers in Tata Steel manufacturing context","User profile constrains recommendations to relevant skill levels","maxOutputTokens cap prevents verbose, speculative responses","ULIP skill catalog anchors content suggestions to real topic areas","Temperature 0.7 balances creativity with factual accuracy"].map((t,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:"#18B982", marginTop:5, flexShrink:0 }}/>
                <span style={{ fontSize:12, color:C.text2, lineHeight:1.55 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider/>

      {/* ── 7. E2E Pipeline ──────────────────────────────────────────────── */}
      <SectionHeader icon="⚙️" title="7 · End-to-End Processing Pipeline" subtitle="The complete sequence of steps from a user action to a rendered result."/>
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"28px 20px", marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:0, flexWrap:"wrap", rowGap:24 }}>
          {[
            { icon:"✍️", label:"User Input",       desc:"Click / type / select",                    color:"#9B59B6" },
            { icon:"✅", label:"Validation",        desc:"Empty check, auth check",                 color:C.blue    },
            { icon:"🔄", label:"Transformation",   desc:"History build, context inject",           color:"#F5A623" },
            { icon:"📋", label:"Business Rules",   desc:"Match, quiz grade, XP logic",             color:C.accent  },
            { icon:"🤖", label:"AI Processing",    desc:"Gemini call (if chatbot)",                color:"#18B982" },
            { icon:"📦", label:"Result Build",     desc:"Parse, strip tags, add suggestions",      color:C.red     },
            { icon:"🔍", label:"Quality Check",    desc:"Fallback text if API fails",              color:"#003D6B" },
            { icon:"🖥️", label:"Presentation",     desc:"React re-render with new state",          color:"#8A94A6" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display:"flex", alignItems:"center" }}>
              <PipeStep {...s} index={i+1}/>
              {i < arr.length - 1 && <RightArrow color={s.color}/>}
            </div>
          ))}
        </div>
      </div>

      <Divider/>

      {/* ── 8. Tech Stack ────────────────────────────────────────────────── */}
      <SectionHeader icon="🛠️" title="8 · Technology Stack" subtitle="Every tool and service powering ULIP, from the browser to the cloud."/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[
          { icon:"⚛️",  label:"React 19",            version:"^19.2.6",          color:C.blue,    desc:"UI framework. Functional components, useState hooks, props-based state sharing across the component tree." },
          { icon:"⚡",  label:"Vite 8",               version:"^8.0.12",          color:"#F5A623", desc:"Build tool and dev server. ES modules, Hot Module Replacement, optimised production bundles via Rollup." },
          { icon:"🧠",  label:"Gemini 2.5 Flash Lite",version:"gemini-2.5-flash-lite",color:"#18B982",desc:"Google's fast LLM for the TDA chatbot. Low latency, high context window, supports structured output patterns." },
          { icon:"🔥",  label:"Firebase Hosting",     version:"ulip-tata-steel-788a0",color:"#FF6B35",desc:"Global CDN hosting for the built SPA. Automatic HTTPS, SPA rewrite rules, PR preview channels." },
          { icon:"🐙",  label:"GitHub Actions",       version:"CI/CD",            color:"#8A94A6", desc:"Automated build and deploy pipeline. Triggered on push to main. Injects VITE_GEMINI_API_KEY secret at build time." },
          { icon:"🔑",  label:"Azure AD",             version:"SSO (planned)",    color:"#9B59B6", desc:"Enterprise Single Sign-On via Microsoft Azure Active Directory. MFA required. Currently a UI placeholder." },
          { icon:"🎨",  label:"Playfair Display",     version:"Google Fonts",     color:C.accent,  desc:"Serif typeface for headings, section titles, and hero text. Adds editorial gravitas to the learning interface." },
          { icon:"📝",  label:"DM Sans",              version:"Google Fonts",     color:C.blue,    desc:"Humanist sans-serif for all body text, buttons, and labels. High legibility at small sizes on screen." },
        ].map(t => <TechCard key={t.label} {...t}/>)}
      </div>

      <Divider/>

      {/* ── 9. Security & Reliability ────────────────────────────────────── */}
      <SectionHeader icon="🔒" title="9 · Security & Reliability" subtitle="How the platform protects data, handles errors, and ensures consistent behaviour."/>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[
          { icon:"🔐", label:"Authentication",  color:"#9B59B6",
            items:["State-based auth gate in App.jsx","SSO via Azure AD (production)","MFA required for all logins","No unauthenticated access to pages"] },
          { icon:"🗝️", label:"API Key Security", color:C.red,
            items:["Gemini key stored in GitHub Secrets","Injected only at build time (VITE_)","Never committed to repository","Rotatable without code changes"] },
          { icon:"🛡️", label:"Data Protection",  color:C.blue,
            items:["No PII stored in localStorage","User profile hardcoded for demo","Production: Azure AD token-based profile","No third-party analytics trackers"] },
          { icon:"🔄", label:"Error Handling",   color:"#18B982",
            items:["Gemini API errors show user-friendly message","Avatar image fallback to initials on load fail","MicrolearningPopup onClose prevents stale state","Loading states prevent double-submission"] },
        ].map(({ icon, label, color, items }) => (
          <div key={label} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"18px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{icon}</div>
              <span style={{ fontSize:13, fontWeight:700, color }}>{label}</span>
            </div>
            {items.map((it,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:7 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:color, marginTop:5, flexShrink:0 }}/>
                <span style={{ fontSize:11, color:C.text2, lineHeight:1.5 }}>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Divider/>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      <SectionHeader icon="❓" title="10 · Frequently Asked Questions" subtitle="Plain-English answers to how the platform works, how decisions are made, and what its limitations are."/>
      <div style={{ marginBottom:16 }}>
        {FAQS.map((faq, i) => (
          <FAQItem key={i} {...faq} open={openFAQ===i} onToggle={() => setOpenFAQ(openFAQ===i ? null : i)}/>
        ))}
      </div>

      <Divider/>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div style={{ textAlign:"center", padding:"20px 0" }}>
        <div style={{ fontSize:12, color:C.text3, marginBottom:6 }}>ULIP · Unified Learning & Intelligence Platform</div>
        <div style={{ fontSize:11, color:C.text3 }}>© 2025 Tata Steel Limited · Human Resources Management · Built with React 19 + Google Gemini AI</div>
      </div>
    </div>
  );
}
