import { useState, useEffect, useRef } from "react";

const C = {
  blue:"#0080C7",   // Tata Steel Blue
  blue2:"#0066A3",  // darker
  blue3:"#E5F4FB",  // lightest tint
  blue4:"#B3D9F0",  // soft tint
  accent:"#F5A623",green:"#18B982",red:"#E5484D",
  white:"#FFFFFF",bg:"#F4F8FC",card:"#FFFFFF",
  border:"#DDE6EF",text:"#0A1629",text2:"#3D5166",text3:"#7A90A4",
  sidebar:"#0080C7",gold:"#F5A623",silver:"#8A94A6",platinum:"#9B59B6",
};

// ─── LOGOS ────────────────────────────────────────────────────────────────────
// ULIP Logo - SVG globe + circuit inline (no external image needed)
function ULIPLogoImg({ size=48 }) {
  const s = size;
  return (
    <div style={{ width:s, height:s, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4FC3F7"/>
            <stop offset="60%" stopColor="#0080C7"/>
            <stop offset="100%" stopColor="#003D6B"/>
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0080C7" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0080C7" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Glow */}
        <circle cx="50" cy="48" r="44" fill="url(#glowGrad)"/>
        {/* Globe */}
        <circle cx="50" cy="48" r="32" fill="url(#globeGrad)" opacity="0.95"/>
        {/* Globe lines */}
        <ellipse cx="50" cy="48" rx="18" ry="32" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="18" y1="48" x2="82" y2="48" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="22" y1="34" x2="78" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <line x1="22" y1="62" x2="78" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        {/* Orbit ring */}
        <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#90CAF9" strokeWidth="2.5" opacity="0.7" transform="rotate(-20 50 48)"/>
        {/* Circuit tail */}
        <path d="M72 58 L84 58 L84 65 L90 65" stroke="#90CAF9" strokeWidth="1.5" fill="none"/>
        <circle cx="90" cy="65" r="2.5" fill="#4FC3F7"/>
        <path d="M84 58 L84 52 L90 52" stroke="#90CAF9" strokeWidth="1" fill="none"/>
        <circle cx="90" cy="52" r="2" fill="#0080C7"/>
        {/* Dot nodes on globe */}
        {[[50,28],[68,42],[62,60],[38,60],[32,42],[50,48]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#E3F2FD" opacity="0.9"/>
        ))}
        {/* Connect dots */}
        <path d="M50 28 L68 42 L62 60 L38 60 L32 42 L50 28" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none"/>
      </svg>
    </div>
  );
}

// Tata Steel Logo - white background, proper SVG
function TataLogoSVG() {
  return (
    <div style={{ background:"#ffffff", borderRadius:8, padding:"5px 14px", display:"flex", alignItems:"center", height:40, border:`1px solid #DDE6EF`, boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>
      <svg height={22} viewBox="0 0 180 36" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
        <text x="0" y="27" fontFamily="'Arial Black',Gadget,sans-serif" fontWeight="900" fontSize="28" fill="#0078C8" letterSpacing="-1">TATA</text>
        <text x="96" y="27" fontFamily="Arial,Helvetica,sans-serif" fontWeight="600" fontSize="26" fill="#0078C8" letterSpacing="-0.5">STEEL</text>
      </svg>
    </div>
  );
}
function TataLogoImg() { return <TataLogoSVG/>; }

// Profile Avatar - real photo with fallback
function ProfileAvatar({ size=90, edit=false }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg,#0080C7,#0066A3)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.3, fontWeight:800, color:"#fff", border:`3px solid #B3D9F0`, position:"relative", flexShrink:0 }}>
      VM
      {edit && <div style={{ position:"absolute", bottom:2, right:2, width:Math.max(22,size*0.26), height:Math.max(22,size*0.26), borderRadius:"50%", background:"#0080C7", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.max(10,size*0.13), color:"#fff", cursor:"pointer" }}>✏</div>}
    </div>
  );
  if (imgFailed) return initials;
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <img
        src="/mnt/user-data/uploads/1779365931803_image.png"
        alt="Vikram Mehta"
        onError={()=>setImgFailed(true)}
        style={{ width:size, height:size, borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:`3px solid #B3D9F0`, display:"block", boxShadow:"0 0 0 3px rgba(0,128,199,0.2)" }}
      />
      {edit && <div style={{ position:"absolute", bottom:2, right:2, width:Math.max(22,size*0.26), height:Math.max(22,size*0.26), borderRadius:"50%", background:"#0080C7", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.max(10,size*0.13), color:"#fff", cursor:"pointer" }}>✏</div>}
    </div>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
const Card = ({ children, style={}, pad=20 }) => (
  <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:pad,boxShadow:"0 1px 6px #0E172608",...style }}>{children}</div>
);
const SLabel = ({ children, style={} }) => (
  <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.12em",color:C.text3,marginBottom:10,...style }}>{children}</div>
);
const Bdg = ({ label, color=C.blue }) => (
  <span style={{ display:"inline-block",padding:"2px 9px",borderRadius:20,background:`${color}18`,color,fontSize:11,fontWeight:600,border:`1px solid ${color}30` }}>{label}</span>
);
const Btn = ({ children, onClick, variant="outline", color=C.blue, style={}, disabled=false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding:"8px 16px",borderRadius:9,cursor:disabled?"not-allowed":"pointer",
    border:variant==="fill"?"none":`1.5px solid ${color}40`,
    background:disabled?"#eee":variant==="fill"?color:`${color}0D`,
    color:disabled?"#aaa":variant==="fill"?"#fff":color,
    fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif",...style
  }}>{children}</button>
);
const Select = ({ value, onChange, options, placeholder, style={} }) => (
  <select value={value} onChange={e=>onChange(e.target.value)} style={{ padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.text,background:C.white,outline:"none",fontFamily:"'DM Sans',sans-serif",...style }}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o=><option key={o}>{o}</option>)}
  </select>
);

// ─── SOE BADGE ICONS ─────────────────────────────────────────────────────────
function SOEBadge({ level, size=40 }) {
  const configs = {
    Gold:     { bg:"linear-gradient(135deg,#F5A623,#F0C040)", border:"#F5A623", star:"⭐", text:"GOLD",     glow:"rgba(245,166,35,0.4)" },
    Silver:   { bg:"linear-gradient(135deg,#8A94A6,#BCC2CC)", border:"#8A94A6", star:"🥈", text:"SILVER",   glow:"rgba(138,148,166,0.4)" },
    Platinum: { bg:"linear-gradient(135deg,#9B59B6,#C39BD3)", border:"#9B59B6", star:"💎", text:"PLATINUM", glow:"rgba(155,89,182,0.4)" },
  };
  const cfg = configs[level] || configs.Gold;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.42, boxShadow:`0 0 12px ${cfg.glow}`, flexShrink:0 }}>
      {cfg.star}
    </div>
  );
}

// ─── PROFILE AVATAR LEGACY STUB ──────────────────────────────────────────────
function _ProfileAvatarSVGUnused({ size=90, edit=false }) {
  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <svg width={size} height={size} viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circ"><circle cx="45" cy="45" r="43"/></clipPath>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C68642"/>
            <stop offset="100%" stopColor="#A0522D"/>
          </linearGradient>
          <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A6E"/>
            <stop offset="100%" stopColor="#005A8E"/>
          </linearGradient>
        </defs>
        {/* bg */}
        <circle cx="45" cy="45" r="45" fill="#E8EDF5"/>
        {/* shirt / body */}
        <ellipse cx="45" cy="82" rx="30" ry="18" fill="url(#shirtGrad)" clipPath="url(#circ)"/>
        {/* collar */}
        <path d="M35 72 L45 65 L55 72 L52 82 L38 82Z" fill="#fff" clipPath="url(#circ)"/>
        {/* neck */}
        <rect x="39" y="58" width="12" height="14" rx="4" fill="url(#skinGrad)" clipPath="url(#circ)"/>
        {/* head */}
        <ellipse cx="45" cy="42" rx="20" ry="22" fill="url(#skinGrad)"/>
        {/* hair */}
        <path d="M25 36 Q27 18 45 17 Q63 18 65 36 Q62 20 45 20 Q28 20 25 36Z" fill="#1A0A00"/>
        {/* eyebrows */}
        <path d="M32 34 Q37 31 40 33" stroke="#1A0A00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M50 33 Q53 31 58 34" stroke="#1A0A00" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* eyes */}
        <ellipse cx="37" cy="38" rx="4" ry="3" fill="#fff"/>
        <ellipse cx="53" cy="38" rx="4" ry="3" fill="#fff"/>
        <circle cx="37" cy="38" r="2" fill="#3D1A00"/>
        <circle cx="53" cy="38" r="2" fill="#3D1A00"/>
        <circle cx="38" cy="37" r="0.7" fill="#fff"/>
        <circle cx="54" cy="37" r="0.7" fill="#fff"/>
        {/* nose */}
        <path d="M44 40 Q43 46 41 47 Q45 49 49 47 Q47 46 46 40" fill="#A0522D" opacity="0.5"/>
        {/* mouth */}
        <path d="M38 52 Q45 57 52 52" stroke="#7A3A1A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* mustache */}
        <path d="M38 50 Q45 53 52 50" stroke="#1A0A00" strokeWidth="1" fill="none"/>
        {/* ears */}
        <ellipse cx="25" cy="41" rx="3.5" ry="5" fill="url(#skinGrad)"/>
        <ellipse cx="65" cy="41" rx="3.5" ry="5" fill="url(#skinGrad)"/>
      </svg>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"home",       icon:"⊞", label:"Home" },
  { id:"profile",    icon:"◉", label:"Profile" },
  { id:"goals",      icon:"◎", label:"My Learning Goals" },
  { id:"gigs",       icon:"🚀", label:"Gigs" },
  { id:"mentors",    icon:"◈", label:"Mentors" },
  { id:"jobs",       icon:"◆", label:"Jobs" },
  { id:"communities",icon:"🌐", label:"Communities" },
  { id:"director",   icon:"✦", label:"Program Director" },
];

const SKILL_MODULES = {
  "Fire Safety": [
    { type:"micro",  icon:"⚡", title:"Fire Triangle & Classes of Fire",  duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Fire Prevention Fundamentals",     duration:"1h 30m", xp:25 },
    { type:"micro",  icon:"⚡", title:"Extinguisher Selection Guide",     duration:"3 min",  xp:5  },
    { type:"assess", icon:"📝", title:"Fire Safety Checkpoint Quiz",      duration:"10 min", xp:50, q:"What type of extinguisher should be used for an electrical fire?", opts:["Water (Class A)","CO₂ / Dry Powder","Foam (Class B)","Sand bucket"], correct:1 },
  ],
  "Emergency Response": [
    { type:"micro",  icon:"⚡", title:"Emergency Alarm Codes at TSN",    duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Emergency Evacuation Procedures",  duration:"45 min", xp:20 },
    { type:"assess", icon:"📝", title:"Emergency Response Quick Check",  duration:"8 min",  xp:30, q:"What is the first action when a fire alarm sounds on the shopfloor?", opts:["Call the supervisor","Continue work and wait for instructions","Evacuate immediately via the nearest exit","Locate the fire extinguisher"], correct:2 },
  ],
  "Process Safety": [
    { type:"micro",  icon:"⚡", title:"Hazard Identification Basics",     duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"HAZOP Study Methodology",          duration:"2h",     xp:40 },
    { type:"course", icon:"📘", title:"Process Safety Management (PSM)", duration:"3h",     xp:60 },
    { type:"assess", icon:"📝", title:"Process Safety Assessment",        duration:"15 min", xp:50, q:"What does HAZOP stand for?", opts:["Hazard & Operability Study","High Accuracy Operations Process","Hazard Assessment & Operations Plan","Health & Operational Protocol"], correct:0 },
  ],
  "LOTO Procedure": [
    { type:"micro",  icon:"⚡", title:"LOTO in 60 Seconds",              duration:"1 min",  xp:5  },
    { type:"course", icon:"📘", title:"Lockout-Tagout Full Procedure",    duration:"1h",     xp:20 },
    { type:"assess", icon:"📝", title:"LOTO Compliance Check",           duration:"10 min", xp:50, q:"How many steps does the standard 6-step LOTO procedure have?", opts:["4","5","6","8"], correct:2 },
  ],
  "PLC Programming": [
    { type:"micro",  icon:"⚡", title:"What is a PLC? 90-sec explainer", duration:"1.5 min",xp:5  },
    { type:"course", icon:"📘", title:"PLC Architecture & I/O Modules",  duration:"2h",     xp:40 },
    { type:"micro",  icon:"⚡", title:"Ladder Logic Basics",             duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Siemens S7-1500 Programming",     duration:"4h",     xp:80 },
    { type:"assess", icon:"📝", title:"PLC Knowledge Check",             duration:"10 min", xp:50, q:"Which PLC programming language uses graphical 'rungs' to represent logic?", opts:["Structured Text","Function Block Diagram","Ladder Diagram","Instruction List"], correct:2 },
  ],
  "Predictive Maintenance": [
    { type:"micro",  icon:"⚡", title:"Vibration Analysis Basics",       duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Predictive vs Preventive Maintenance",duration:"1h 30m",xp:30},
    { type:"project",icon:"🛠",  title:"Analyse Bearing Vibration Data", duration:"3 days", xp:80 },
    { type:"assess", icon:"📝", title:"Predictive Maintenance Quiz",     duration:"10 min", xp:50, q:"Which parameter is most commonly used in vibration-based condition monitoring?", opts:["Temperature","Velocity (mm/s)","Voltage","Pressure"], correct:1 },
  ],
  "Blast Furnace Operations": [
    { type:"micro",  icon:"⚡", title:"BF Iron-making Overview",         duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Blast Furnace Process Control",   duration:"3h",     xp:60 },
    { type:"assess", icon:"📝", title:"BF Operations Assessment",        duration:"10 min", xp:50, q:"What is the primary reducing agent used in a blast furnace?", opts:["Oxygen","Coke","Limestone","Coal dust"], correct:1 },
  ],
  "Industrial IoT": [
    { type:"micro",  icon:"⚡", title:"IIoT vs Traditional SCADA",       duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Industrial IoT Essentials",        duration:"3h 20m", xp:60 },
    { type:"project",icon:"🛠",  title:"Connect a Sensor to Azure IoT",  duration:"1 week", xp:100},
    { type:"assess", icon:"📝", title:"IoT Knowledge Check",             duration:"10 min", xp:50, q:"Which protocol is most commonly used for lightweight IoT device communication?", opts:["HTTP","FTP","MQTT","SOAP"], correct:2 },
  ],
  "Team Management": [
    { type:"micro",  icon:"⚡", title:"Situational Leadership in 3 min",duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Building High-Performance Teams", duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:"Leadership Style Assessment",     duration:"8 min",  xp:30, q:"In Situational Leadership, which style suits a highly skilled but unmotivated employee?", opts:["Directing (S1)","Coaching (S2)","Supporting (S3)","Delegating (S4)"], correct:2 },
  ],
  "Project Management": [
    { type:"micro",  icon:"⚡", title:"5 Phases of Project Management",  duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Project Planning & WBS",          duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:"PM Fundamentals Quiz",            duration:"10 min", xp:50, q:"Which document formally authorises a project to begin?", opts:["Project Charter","Scope Statement","WBS","Risk Register"], correct:0 },
  ],
  "Data Analytics": [
    { type:"micro",  icon:"⚡", title:"What is Data Analytics?",         duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Excel for KPI Dashboards",        duration:"2h",     xp:30 },
    { type:"micro",  icon:"⚡", title:"Reading a Control Chart",         duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Power BI Fundamentals",           duration:"3h",     xp:50 },
    { type:"project",icon:"🛠",  title:"Build a Shift Report Dashboard", duration:"1 week", xp:100},
    { type:"assess", icon:"📝", title:"Analytics Skills Check",         duration:"10 min", xp:50, q:"Which chart type best shows a trend over time?", opts:["Pie Chart","Bar Chart","Line Chart","Histogram"], correct:2 },
  ],
  "Python Basics": [
    { type:"micro",  icon:"⚡", title:"Why Python for Engineers?",        duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Python Fundamentals for Non-Coders",duration:"3h",   xp:60 },
    { type:"micro",  icon:"⚡", title:"Pandas DataFrames in 3 Minutes",  duration:"3 min",  xp:5  },
    { type:"project",icon:"🛠",  title:"Automate a Monthly Report",       duration:"3 days", xp:80 },
    { type:"assess", icon:"📝", title:"Python Basics Quiz",               duration:"10 min", xp:50, q:"Which Python library is primarily used for data manipulation with DataFrames?", opts:["NumPy","Matplotlib","Pandas","Seaborn"], correct:2 },
  ],
};

const SKILL_NAMES = [
  "Data Analytics","PLC Programming","Process Safety","Quality Systems","Six Sigma",
  "Lean Manufacturing","Industrial IoT","Blast Furnace Operations","TPM Fundamentals",
  "Python for Engineers","Statistical Process Control","Predictive Maintenance",
  "Leadership & Communication","Project Management","Blockchain Basics",
  "Root Cause Analysis","Hydraulics & Pneumatics","Digital Twins","AI/ML Basics","Supply Chain Analytics"
];

const SOE_CERTS = [
  { name:"School of Analytics",   level:"Gold",     emoji:"📊", color:C.gold,     date:"Jan 2024" },
  { name:"School of Blockchain",  level:"Silver",   emoji:"⛓",  color:C.silver,   date:"Oct 2023" },
  { name:"School of TQM",         level:"Platinum", emoji:"🏆", color:C.platinum, date:"Mar 2024" },
  { name:"School of Maintenance", level:"Gold",     emoji:"🔧", color:C.gold,     date:"Dec 2023" },
];

const SKILL_GAPS = [
  { skill:"Fire Safety",              current:72, required:90, category:"Safety"      },
  { skill:"Emergency Response",       current:55, required:80, category:"Safety"      },
  { skill:"Process Safety",           current:71, required:90, category:"Safety"      },
  { skill:"LOTO Procedure",           current:65, required:85, category:"Safety"      },
  { skill:"PLC Programming",          current:28, required:70, category:"Engineering" },
  { skill:"Predictive Maintenance",   current:55, required:75, category:"Engineering" },
  { skill:"Blast Furnace Operations", current:82, required:90, category:"Engineering" },
  { skill:"Industrial IoT",           current:35, required:65, category:"Engineering" },
  { skill:"Team Management",          current:60, required:75, category:"Leadership"  },
  { skill:"Project Management",       current:55, required:70, category:"Leadership"  },
  { skill:"Data Analytics",           current:42, required:80, category:"Digital"     },
  { skill:"Python Basics",            current:22, required:60, category:"Digital"     },
];

const TQM_GOALS = [
  { id:1, title:"Business Assessment using TBEM", icon:"🏢", progress:65, items:["Understand TBEM framework","Conduct business assessments","Gap analysis & scoring","Action planning"] },
  { id:2, title:"Daily Management", icon:"📋", progress:80, items:["Visual management tools","Daily review meetings","KPI monitoring","Deviation handling"] },
  { id:3, title:"Data Analytics", icon:"📊", progress:38, items:["Statistical analysis basics","Power BI dashboards","Data storytelling","Predictive models"] },
  { id:4, title:"Education Excellence Management", icon:"🎓", progress:55, items:["Competency frameworks","Training needs analysis","Learning ROI measurement","Knowledge transfer"] },
  { id:5, title:"Employee Involvement Initiatives", icon:"🤝", progress:70, items:["Kaizen circles","Suggestion systems","Cross-functional teams","Recognition programs"] },
  { id:6, title:"Knowledge Management", icon:"🧠", progress:45, items:["Knowledge capture tools","Best practice sharing","Expert directories","Learning communities"] },
  { id:7, title:"Policy Management", icon:"📜", progress:60, items:["Policy deployment","Hoshin Kanri","Target setting","Review cadence"] },
  { id:8, title:"Quality Assurance", icon:"✅", progress:72, items:["SPC & control charts","Inspection protocols","Non-conformance mgmt","Root cause analysis"] },
  { id:9, title:"Supply Chain Management", icon:"🔗", progress:50, items:["Supplier evaluation","Inventory optimization","Demand forecasting","Lead time reduction"] },
  { id:10, title:"Theory of Constraints (CCPM)", icon:"⛓", progress:30, items:["Identify constraints","CCPM scheduling","Buffer management","Throughput accounting"] },
  { id:11, title:"TPM", icon:"⚙", progress:85, items:["5S fundamentals","Autonomous maintenance","Planned maintenance","OEE measurement"] },
  { id:12, title:"TQM", icon:"🎯", progress:68, items:["TQM principles","Process excellence","Customer focus","Continuous improvement"] },
];

const MENTOR_LIST = [
  { name:"Dr. Anupam Sinha",    area:"Blast Furnace Operations", dept:"TSN Operations",  exp:"22 yrs", skills:["BF Ops","Iron Making","Process Opt."], avatar:"AS", color:"#E5484D" },
  { name:"Priya Krishnamurthy", area:"Data Analytics & AI",      dept:"Technology & R&D",exp:"15 yrs", skills:["Analytics","Python","ML"],            avatar:"PK", color:C.blue  },
  { name:"Rajesh Mohanty",      area:"Safety & Environment",     dept:"Safety, H & S",   exp:"18 yrs", skills:["HSE","LOTO","Risk Mgmt"],             avatar:"RM", color:C.green },
  { name:"Sunita Agarwal",      area:"TQM & Quality Systems",    dept:"TQM, GSP & SC",   exp:"14 yrs", skills:["Six Sigma","TQM","SPC"],              avatar:"SA", color:"#9B59B6"},
  { name:"Vikrant Desai",       area:"Digital & Automation",     dept:"Engineering",     exp:"12 yrs", skills:["PLC","IoT","Automation"],             avatar:"VD", color:C.accent},
  { name:"Dr. Meera Nair",      area:"Leadership & OD",          dept:"HRM",             exp:"20 yrs", skills:["Leadership","Coaching","Change Mgmt"],avatar:"MN", color:"#FF6B35"},
];

const JOB_OPENINGS = [
  { title:"Sr. Process Engineer – Blast Furnace", dept:"Operations TSJ", location:"Jamshedpur", level:"IL4", skills:["BF Ops","Process Opt.","Data Analytics"], posted:"2d ago", match:96 },
  { title:"Data Analyst – Digital Transformation", dept:"Technology & R&D", location:"Jamshedpur", level:"IL3", skills:["Python","Power BI","SQL"], posted:"4d ago", match:91 },
  { title:"Safety Engineer – HSE Compliance",    dept:"Safety, H & S",   location:"TSK",         level:"IL3", skills:["Process Safety","HAZOP","Compliance"], posted:"1d ago", match:88 },
  { title:"Quality Systems Lead – TQM",          dept:"TQM, GSP & SC",   location:"Jamshedpur", level:"IL5", skills:["Six Sigma","TQM","SPC"], posted:"6d ago", match:84 },
  { title:"Automation Engineer – PLC & SCADA",   dept:"Engineering & Projects", location:"Meramandali", level:"IL3", skills:["PLC","SCADA","Automation"], posted:"3d ago", match:82 },
  { title:"Project Manager – CapEx Projects",    dept:"Engineering & Projects", location:"Jamshedpur", level:"IL5", skills:["PM","Leadership","Cost Control"], posted:"5d ago", match:79 },
];

const COMMUNITY_POSTS = [
  { author:"Rajesh M.", dept:"Safety, H & S", avatar:"RM", color:C.red,    time:"2h ago", text:"Just completed the new LOTO simulation module! The gamified format made it so much more engaging than the old classroom format. Highly recommend everyone in ops to try it 💪", likes:24, comments:7, type:"tip" },
  { author:"Priya K.",  dept:"Technology & R&D", avatar:"PK", color:C.blue, time:"5h ago", text:"Sharing our team's learnings from the Digital Twin pilot at Blast Furnace #4. Key insight: real-time sensor integration reduced unplanned downtime by 23% in Q1. Full case study is now on ULIP 🎯", likes:48, comments:13, type:"insight" },
  { author:"Sunita A.", dept:"TQM, GSP & SC", avatar:"SA", color:"#9B59B6", time:"1d ago", text:"Congratulations to the TQM Circle team on achieving Platinum level in the School of TQM! 🏆 A big milestone for our department.", likes:62, comments:21, type:"achievement" },
];

const REC_LEARNINGS = [
  { title:"Industrial IoT Essentials",     source:"EdNext",   duration:"3h 20m", match:"94%", tags:["IoT","Technology","Engineering"], summary:"Covers IIoT architecture, sensor integration and real-time data analytics for shopfloor applications. Ideal for engineers in automation-heavy roles." },
  { title:"Root Cause Analysis Methods",   source:"SumTotal", duration:"2h",     match:"91%", tags:["Quality","TQM","Problem Solving"], summary:"Teaches 5-Why, Fishbone and Fault Tree methods using actual Tata Steel incident case studies for practical problem solving." },
  { title:"Six Sigma Yellow Belt Prep",    source:"EdNext",   duration:"4h",     match:"89%", tags:["Six Sigma","Quality","TQM"], summary:"Covers DMAIC methodology, process variation concepts and basic SPC tools to help you qualify for Yellow Belt certification." },
  { title:"MS Excel for Data Reporting",   source:"EdNext",   duration:"1h 45m", match:"88%", tags:["Data","Analytics","Productivity"], summary:"Practical Excel skills for KPI dashboards, pivot tables and automated reports — directly applicable to daily management workflows." },
];

const CALENDAR_EVENTS = [
  { date:"May 09", topic:"Six Sigma Yellow Belt",  mode:"Blended",   location:"Training Centre", desc:"Covers DMAIC methodology, measurement systems analysis and process capability. Leads to Yellow Belt certification." },
  { date:"May 14", topic:"Digital Tools Workshop", mode:"Online",    location:"Virtual",          desc:"Hands-on Power BI, Excel automation and basic Python scripting for daily management reporting across departments." },
  { date:"May 21", topic:"Leadership Bootcamp",    mode:"Classroom", location:"Learning Hub",     desc:"3-day intensive on situational leadership, conflict resolution and building high-performance teams in manufacturing." },
  { date:"May 28", topic:"Hazmat Handling",        mode:"Classroom", location:"Site B",           desc:"Mandatory refresher on hazardous material storage, spill response and PPE requirements per OHSAS 18001." },
  { date:"Jun 03", topic:"Data Analytics Cohort",  mode:"Blended",   location:"Innovation Hub",   desc:"6-week cohort covering statistical analysis, dashboarding and predictive modelling using real Tata Steel datasets." },
];

const POPULAR_MICRO = [
  { title:"What is TPM?",            duration:"2 min", views:"1.2k", tag:"TPM",     color:C.accent, type:"video", summary:"Animated explainer covering TPM's 8 pillars and how autonomous maintenance reduces unplanned downtime on the shopfloor." },
  { title:"LOTO in 60 Seconds",      duration:"1 min", views:"980",  tag:"Safety",  color:C.red,    type:"video", summary:"Step-by-step visual guide to Lockout-Tagout energy isolation procedure — mandatory for all plant operators before maintenance." },
  { title:"Root Cause Analysis",     duration:"3 min", views:"870",  tag:"Quality", color:C.green,  type:"text",  summary:"Infographic guide explaining 5-Why methodology using a real blast furnace downtime incident as a worked example." },
  { title:"Bearing Replacement Tip", duration:"2 min", views:"760",  tag:"Maint.",  color:"#9B59B6",type:"video", summary:"Quick video on correct bearing removal and fitting technique to prevent premature equipment failure in rotating machinery." },
  { title:"Kaizen in 2 Minutes",     duration:"2 min", views:"650",  tag:"Lean",    color:C.blue,   type:"text",  summary:"Illustrated guide to running a Kaizen event: identifying waste, rapid improvement cycles, and sustaining the gains long-term." },
];

const GIGS_DATA = [
  { id:1, title:"Digital Twin Pilot – Blast Furnace #5",       owner:"Priya Krishnamurthy",  dept:"Technology & R&D", match:94, deadline:"Jun 15", duration:"6 weeks", skills:[{name:"Industrial IoT",level:"Intermediate"},{name:"Data Analytics",level:"Advanced"},{name:"Python Basics",level:"Beginner"}], desc:"Build a real-time digital twin model for Blast Furnace #5 using sensor feeds. The project involves data pipeline setup, anomaly detection modelling and dashboard creation for operators. Output will directly feed into the predictive maintenance programme.", image:"🏭" },
  { id:2, title:"TQM Circle – Sinter Quality Improvement",     owner:"Sunita Agarwal",       dept:"TQM, GSP & SC",    match:91, deadline:"Jun 08", duration:"4 weeks", skills:[{name:"Six Sigma",level:"Intermediate"},{name:"Statistical Process Control",level:"Intermediate"},{name:"TQM",level:"Beginner"}], desc:"Cross-functional quality circle focused on reducing sinter cold strength variation. Work involves SPC chart analysis, root cause workshops and implementing control measures. Feeds into the ongoing ISO 9001 process excellence initiative.", image:"📊" },
  { id:3, title:"Safety Culture Assessment – TSN Site",        owner:"Rajesh Mohanty",       dept:"Safety, H & S",    match:88, deadline:"Jun 20", duration:"3 weeks", skills:[{name:"Process Safety",level:"Advanced"},{name:"Risk Assessment",level:"Intermediate"},{name:"Leadership & Communication",level:"Intermediate"}], desc:"Conduct a structured BBS (Behaviour-Based Safety) observation programme across 3 zones at TSN. Analyse near-miss data, present findings to site leadership and recommend interventions for the H2 2026 safety plan.", image:"🦺" },
  { id:4, title:"Kaizen Project – Pellet Plant Water Recovery", owner:"Dr. Anupam Sinha",    dept:"Operations TSN",   match:85, deadline:"Jul 01", duration:"5 weeks", skills:[{name:"Lean Manufacturing",level:"Intermediate"},{name:"Hydraulics & Pneumatics",level:"Beginner"},{name:"Data Analytics",level:"Beginner"}], desc:"Identify and eliminate water waste in pellet plant cooling circuits using value stream mapping and lean tools. Target: 15% reduction in water consumption. Eligible for Tata InnoVista internal recognition.", image:"💧" },
  { id:5, title:"AI-Powered Shift Handover Report Automation", owner:"Priya Krishnamurthy",  dept:"Technology & R&D", match:82, deadline:"Jun 25", duration:"4 weeks", skills:[{name:"AI/ML Basics",level:"Beginner"},{name:"Python Basics",level:"Intermediate"},{name:"Digital Twins",level:"Beginner"}], desc:"Prototype an LLM-powered shift handover report that auto-summarises sensor logs, maintenance tickets and KPI deviations. Built in Python, deployed on internal Azure environment. Great introduction to AI in industrial operations.", image:"🤖" },
  { id:6, title:"TPM Pillar Rollout – Slab Caster Zone",       owner:"Vikrant Desai",        dept:"Engineering & Projects", match:79, deadline:"Jul 10", duration:"8 weeks", skills:[{name:"TPM Fundamentals",level:"Intermediate"},{name:"PLC Programming",level:"Beginner"},{name:"Predictive Maintenance",level:"Beginner"}], desc:"Support implementation of TPM Pillars 1–3 (Autonomous, Planned, Quality Maintenance) across the slab caster section. Involves operator training, OEE baseline setting and establishing AM checksheets.", image:"⚙" },
];

const WORK_ORDERS = [
  { id:"WO-2026-1142", type:"Maintenance",    equipment:"Blast Furnace Tuyere – BF4",     priority:"Critical", status:"Open",     raised:"1h ago",  dept:"Operations TSN",  permit:"Work Permit #WP-448", skills:["Blast Furnace Operations","Hydraulics & Pneumatics","Process Safety"], engagementPct:0  },
  { id:"WO-2026-1138", type:"Safety Shutdown", equipment:"Conveyor Belt – Zone 3",        priority:"High",     status:"Active",   raised:"3h ago",  dept:"Engineering",     permit:"Hot Work Permit #HWP-112", skills:["Process Safety","LOTO Procedure","Emergency Response"], engagementPct:62 },
  { id:"WO-2026-1131", type:"Maintenance",    equipment:"Hydraulic Press – Pellet Plant", priority:"Medium",   status:"Active",   raised:"6h ago",  dept:"Operations TSN",  permit:"Cold Work Permit #CWP-89",  skills:["Hydraulics & Pneumatics","Predictive Maintenance"],   engagementPct:78 },
  { id:"WO-2026-1125", type:"Inspection",     equipment:"Furnace Cooling Water Lines",    priority:"High",     status:"Resolved", raised:"1d ago",  dept:"Maintenance",     permit:"Confined Space #CS-034",    skills:["Process Safety","Blast Furnace Operations"],          engagementPct:88 },
  { id:"WO-2026-1118", type:"Electrical",     equipment:"PLC Panel – Line 2 SCADA",       priority:"Medium",   status:"Active",   raised:"1d ago",  dept:"Automation",      permit:"Electrical Permit #EP-203", skills:["PLC Programming","Process Safety"],                    engagementPct:55 },
  { id:"WO-2026-1112", type:"Fire Permit",    equipment:"Welding – Sinter Plant Gate",    priority:"Low",      status:"Active",   raised:"2d ago",  dept:"Engineering",     permit:"Fire Permit #FP-067",       skills:["Fire Safety","LOTO Procedure","Hazmat Handling"],      engagementPct:91 },
];
const DEPT_FILTERS = ["TQM, GSP & SC","Operations TSJ","Safety, H & S","Technology & R&D","Engineering & Projects","HRM","Finance","Corporate Services"];
const LEVEL_FILTERS = ["IL1","IL2","IL3","IL4","IL5","IL6","IL7","IL8","IL9","IL10","IL11","IL12"];

const SKILL_GAP_DATA = {
  "TQM, GSP & SC":      [{skill:"TQM Fundamentals",gap:22},{skill:"Data Analytics",gap:38},{skill:"Supply Chain",gap:44},{skill:"Six Sigma",gap:18},{skill:"Policy Mgmt",gap:30}],
  "Operations TSJ":     [{skill:"BF Operations",gap:15},{skill:"PLC Programming",gap:42},{skill:"Predictive Maint.",gap:55},{skill:"Safety Protocols",gap:20},{skill:"Digital Tools",gap:60}],
  "Safety, H & S":      [{skill:"Process Safety",gap:12},{skill:"Emergency Response",gap:8},{skill:"HAZOP Analysis",gap:35},{skill:"Environmental Mgmt",gap:28},{skill:"Risk Assessment",gap:18}],
  "Technology & R&D":   [{skill:"AI/ML Basics",gap:48},{skill:"Data Analytics",gap:30},{skill:"Digital Twins",gap:62},{skill:"Python",gap:40},{skill:"IoT Platforms",gap:35}],
  "Engineering & Projects":[{skill:"PLC/SCADA",gap:38},{skill:"Project Mgmt",gap:25},{skill:"CAD/CAM",gap:45},{skill:"Hydraulics",gap:30},{skill:"Automation",gap:52}],
  "HRM":                [{skill:"HR Analytics",gap:55},{skill:"Change Mgmt",gap:32},{skill:"Learning Design",gap:40},{skill:"Digital Tools",gap:45},{skill:"Coaching Skills",gap:22}],
};

const BIZ_UNITS = ["One IT","One Shared Services","TQM, GSP and Supply Chain","Technology and R&D","Engineering & Projects","Tata Steel Meramandali","Long Products Division","Raw Materials","Human Resources Management","Operations TSJ","Safety, Health & Sustainability","Corporate Services"];
const OPR_LEVELS = ["IL2","IL3","IL4","IL5","IL6"];
const NOPR_LEVELS = ["NS1","NS2","NS3","NS4","NS5","NS6","NS7","NS8","NS9","NS10","NS11","NS12"];

const CREATED_TRAININGS = [
  { title:"Furnace Safety SOP",         type:"Course",     date:"Apr 20", participants:124, completion:78 },
  { title:"Blast Furnace Incident '23", type:"Case Study", date:"Apr 12", participants:89,  completion:91 },
  { title:"Quality Boss Fight Quiz",    type:"Gamified",   date:"Mar 28", participants:200, completion:64 },
  { title:"PLC Basics Simulation",      type:"Simulation", date:"Mar 10", participants:56,  completion:55 },
];

const ACTIVE_PROGRAMS = [
  { name:"AURA Circles",      status:"Live",     participants:340, type:"Leadership",  since:"Mar 2024", color:C.green  },
  { name:"Safety First Cohort",status:"Active",  participants:180, type:"HSE",         since:"Apr 2024", color:C.blue   },
  { name:"Digital Upskilling", status:"Active",  participants:220, type:"Technology",  since:"Feb 2024", color:C.accent },
  { name:"Lean Champions",     status:"Upcoming",participants:90,  type:"Operations",  since:"Jun 2024", color:"#9B59B6"},
];

const REQUESTED_TRAININGS = [
  { dept:"Operations TSJ",   topic:"Advanced PLC Programming",   by:"Mgr. K. Nair",  date:"May 01", priority:"High"   },
  { dept:"Safety, H & S",    topic:"Emergency Evacuation Drill", by:"Mgr. A. Patel", date:"Apr 28", priority:"Medium" },
  { dept:"Technology & R&D", topic:"AI Tools for Engineers",     by:"Mgr. S. Gupta", date:"Apr 25", priority:"High"   },
];

const LEARNING_MAP = {
  Beginner:    { color:C.green,  items:["2-min micro: What is {skill}?","Infographic: Key concepts","Video: Introduction to {skill}","Quiz: Basics check (5 Qs)"] },
  Intermediate:{ color:C.blue,   items:["Course: {skill} Fundamentals (3h)","Case Study + microlearning series","Assessment: 20-question test","Peer discussion forum"] },
  Advanced:    { color:C.accent, items:["Full Course: {skill} Deep Dive (8h)","Guided project with manager review","Expert webinar series","Capstone assessment + cert"] },
  Expert:      { color:"#9B59B6",items:["Master Course + certification","Live project with business impact KPIs","SME feedback session (1:1)","Publish learnings to community"] },
};

// ─── SKILL DRILLDOWN MODAL ────────────────────────────────────────────────────
function SkillDrilldown({ skill, current, required, onClose }) {
  const modules = SKILL_MODULES[skill] || [
    { type:"micro",  icon:"⚡", title:`${skill} Introduction`,        duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:`${skill} Foundations Course`,  duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:`${skill} Knowledge Check`,     duration:"10 min", xp:50, q:`Which is a key principle of ${skill}?`, opts:["Option A","Option B","Option C","Option D"], correct:0 },
  ];
  const [activeAssess, setActiveAssess] = useState(null);
  const [selOpt, setSelOpt] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const gap = required - current;
  const typeColors = { micro:C.accent, course:C.blue, project:"#9B59B6", assess:C.green };
  const typeLabels = { micro:"Microlearning", course:"Course", project:"Project", assess:"Assessment" };

  const handleSubmit = () => {
    if (selOpt === null) return;
    const isCorrect = selOpt === activeAssess.correct;
    setResult(isCorrect ? "correct" : "wrong");
    setSubmitted(true);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)" }}>
      <div style={{ background:C.white, borderRadius:20, width:620, maxHeight:"88vh", overflowY:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.4)", animation:"slideUp 0.3s ease" }}>
        {/* Header */}
        <div style={{ background:`linear-gradient(135deg,#003D6B,${C.blue})`, padding:"22px 26px", borderRadius:"20px 20px 0 0" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:4 }}>Skill Learning Path</div>
              <div style={{ fontSize:20, fontWeight:800, color:"#fff", fontFamily:"'Playfair Display',serif" }}>{skill}</div>
            </div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", fontSize:18, cursor:"pointer" }}>×</button>
          </div>
          <div style={{ display:"flex", gap:12, marginTop:10 }}>
            <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>{current}%</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Current</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#FFD166" }}>{required}%</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Required</div>
            </div>
            <div style={{ background:"rgba(229,72,77,0.3)", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#FFB3B5" }}>{gap}%</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Gap</div>
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", paddingLeft:8 }}>
              <div style={{ width:"100%", height:8, background:"rgba(255,255,255,0.2)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${current}%`, background:"linear-gradient(90deg,#4FC3F7,#fff)", borderRadius:4 }}/>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment modal */}
        {activeAssess && (
          <div style={{ padding:"24px 26px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.green, textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:12 }}>📝 Assessment · {skill}</div>
            {!submitted ? (
              <>
                <div style={{ background:C.blue3, borderRadius:12, padding:"16px", marginBottom:18, border:`1px solid ${C.blue4}` }}>
                  <div style={{ fontSize:14, fontWeight:600, color:C.text, lineHeight:1.6 }}>{activeAssess.q}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                  {activeAssess.opts.map((opt,i)=>(
                    <div key={i} onClick={()=>setSelOpt(i)} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 16px", borderRadius:12, border:`2px solid ${selOpt===i?C.blue:C.border}`, background:selOpt===i?C.blue3:C.white, cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:selOpt===i?C.blue:C.bg, border:`2px solid ${selOpt===i?C.blue:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:selOpt===i?"#fff":C.text3, flexShrink:0 }}>{["A","B","C","D"][i]}</div>
                      <span style={{ fontSize:13, color:selOpt===i?C.blue:C.text, fontWeight:selOpt===i?600:400 }}>{opt}</span>
                    </div>
                  ))}
                </div>
                <button onClick={handleSubmit} disabled={selOpt===null} style={{ width:"100%", padding:"12px", borderRadius:10, background:selOpt!==null?`linear-gradient(135deg,${C.blue},${C.blue2})`:"#e0e7ef", border:"none", color:selOpt!==null?"#fff":"#aab", fontSize:14, fontWeight:700, cursor:selOpt!==null?"pointer":"not-allowed" }}>
                  Submit Answer
                </button>
              </>
            ) : result==="correct" ? (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:56, marginBottom:12 }}>🎉</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.green, fontFamily:"'Playfair Display',serif", marginBottom:8 }}>Great job, Vikram!</div>
                <div style={{ fontSize:13, color:C.text2, marginBottom:20 }}>That's correct! You demonstrated understanding of {skill}.</div>
                <div style={{ background:`linear-gradient(135deg,#003D6B,${C.blue})`, borderRadius:14, padding:"18px", marginBottom:20 }}>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.8)", marginBottom:4 }}>You have earned</div>
                  <div style={{ fontSize:34, fontWeight:900, color:"#FFD166", fontFamily:"'Playfair Display',serif" }}>+{activeAssess.xp} Skill XP</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.9)", fontWeight:600, marginTop:4 }}>in {skill}</div>
                </div>
                <button onClick={()=>{ setActiveAssess(null); setSelOpt(null); setSubmitted(false); setResult(null); }} style={{ width:"100%", padding:"11px", borderRadius:10, background:C.blue, border:"none", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>Continue Learning →</button>
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:"20px 0" }}>
                <div style={{ fontSize:56, marginBottom:12 }}>😅</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.accent, fontFamily:"'Playfair Display',serif", marginBottom:8 }}>Not quite!</div>
                <div style={{ fontSize:13, color:C.text2, marginBottom:16 }}>The correct answer was: <strong style={{ color:C.green }}>{activeAssess.opts[activeAssess.correct]}</strong></div>
                <div style={{ background:`${C.green}10`, border:`1px solid ${C.green}30`, borderRadius:12, padding:14, marginBottom:20, textAlign:"left" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.green, marginBottom:4 }}>💡 Keep learning!</div>
                  <div style={{ fontSize:12, color:C.text2 }}>Review the course material for {skill} and try again. Every attempt builds your understanding.</div>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={()=>{ setSelOpt(null); setSubmitted(false); setResult(null); }} style={{ flex:1, padding:"11px", borderRadius:10, background:C.blue, border:"none", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer" }}>Try Again</button>
                  <button onClick={()=>{ setActiveAssess(null); setSelOpt(null); setSubmitted(false); setResult(null); }} style={{ flex:1, padding:"11px", borderRadius:10, background:C.bg, border:`1px solid ${C.border}`, color:C.text2, fontSize:13, cursor:"pointer" }}>Back to Modules</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Module list */}
        {!activeAssess && (
          <div style={{ padding:"20px 26px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:14 }}>Complete these modules to close the skill gap:</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {modules.map((mod,i)=>(
                <div key={i}
                  onClick={()=>{ if(mod.type==="assess"){ setActiveAssess(mod); setSelOpt(null); setSubmitted(false); setResult(null); } }}
                  style={{ padding:"14px 16px", borderRadius:12, border:`2px solid ${typeColors[mod.type]||C.border}30`, background:`${typeColors[mod.type]||C.bg}08`, cursor:mod.type==="assess"?"pointer":"default", transition:"all 0.15s", position:"relative" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${typeColors[mod.type]||C.blue}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{mod.icon}</div>
                    <div>
                      <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:typeColors[mod.type]||C.blue, marginBottom:2 }}>{typeLabels[mod.type]||mod.type}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.3 }}>{mod.title}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:10, color:C.text3 }}>⏱ {mod.duration}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:typeColors[mod.type]||C.blue, background:`${typeColors[mod.type]||C.blue}12`, padding:"2px 8px", borderRadius:10 }}>+{mod.xp} XP</span>
                  </div>
                  {mod.type==="assess" && (
                    <div style={{ marginTop:8, fontSize:10, fontWeight:600, color:C.green, textAlign:"center", background:`${C.green}10`, borderRadius:8, padding:"4px" }}>
                      Click to attempt →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}

// ─── GIGS PAGE ────────────────────────────────────────────────────────────────
function GigsPage() {
  const [selected, setSelected] = useState(null);
  const LEVEL_COLORS = { Beginner:C.green, Intermediate:C.blue, Advanced:C.accent, Expert:"#9B59B6" };

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:C.text, fontFamily:"'Playfair Display',serif", margin:0 }}>Gigs & Projects</h2>
          <div style={{ fontSize:13, color:C.text3, marginTop:4 }}>AI-matched internal opportunities based on your skills & goals</div>
        </div>
        <Bdg label={`${GIGS_DATA.length} open gigs · AI-matched`} color={C.green}/>
      </div>

      {/* Know More modal */}
      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)" }}>
          <div style={{ background:C.white, borderRadius:20, width:580, maxHeight:"88vh", overflowY:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
            {/* Image header */}
            <div style={{ background:`linear-gradient(135deg,#003D6B,${C.blue})`, borderRadius:"20px 20px 0 0", padding:"36px 28px", textAlign:"center", position:"relative" }}>
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", fontSize:16, cursor:"pointer" }}>×</button>
              <div style={{ fontSize:64, marginBottom:12 }}>{selected.image}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:8, flexWrap:"wrap" }}>
                <Bdg label={`${selected.match}% match`} color={C.green}/>
                <Bdg label={selected.dept} color={C.blue}/>
                <Bdg label={`⏱ ${selected.duration}`} color={C.accent}/>
              </div>
            </div>
            <div style={{ padding:"24px 28px" }}>
              <div style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif", marginBottom:6 }}>{selected.title}</div>
              <div style={{ fontSize:12, color:C.text3, marginBottom:16 }}>Project Owner: <strong style={{ color:C.text2 }}>{selected.owner}</strong> · Deadline to apply: <strong style={{ color:C.red }}>{selected.deadline}</strong></div>
              <div style={{ fontSize:13, color:C.text2, lineHeight:1.75, marginBottom:20 }}>{selected.desc}</div>
              <SLabel>Skills & Proficiency Level Required</SLabel>
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                {selected.skills.map((sk,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderRadius:10, background:C.bg, border:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:13, fontWeight:600, color:C.text }}>{sk.name}</span>
                    <span style={{ padding:"3px 12px", borderRadius:20, fontSize:11, fontWeight:700, background:`${LEVEL_COLORS[sk.level]||C.blue}18`, color:LEVEL_COLORS[sk.level]||C.blue, border:`1px solid ${LEVEL_COLORS[sk.level]||C.blue}30` }}>{sk.level}</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button style={{ flex:1, padding:"12px", borderRadius:10, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer" }}>Apply Now →</button>
                <button onClick={()=>setSelected(null)} style={{ padding:"12px 20px", borderRadius:10, background:C.bg, border:`1px solid ${C.border}`, color:C.text2, fontSize:13, cursor:"pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {GIGS_DATA.map((gig,i)=>(
          <Card key={i} style={{ borderTop:`4px solid ${gig.match>=90?C.green:gig.match>=85?C.blue:C.accent}` }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:12 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:`${gig.match>=90?C.green:gig.match>=85?C.blue:C.accent}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{gig.image}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, lineHeight:1.3, marginBottom:4 }}>{gig.title}</div>
                <div style={{ fontSize:11, color:C.text3 }}>by {gig.owner} · {gig.dept}</div>
              </div>
              <div style={{ textAlign:"center", background:gig.match>=90?`${C.green}15`:gig.match>=85?C.blue3:`${C.accent}15`, borderRadius:10, padding:"6px 12px", flexShrink:0 }}>
                <div style={{ fontSize:16, fontWeight:800, color:gig.match>=90?C.green:gig.match>=85?C.blue:C.accent }}>{gig.match}%</div>
                <div style={{ fontSize:9, color:C.text3, textTransform:"uppercase" }}>Match</div>
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
              {gig.skills.map(s=><Bdg key={s.name} label={`${s.name} (${s.level})`} color={LEVEL_COLORS[s.level]||C.blue}/>)}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:11, color:C.text3 }}>
                ⏱ {gig.duration} &nbsp;·&nbsp; <span style={{ color:C.red, fontWeight:600 }}>Apply by {gig.deadline}</span>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setSelected(gig)} style={{ padding:"7px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.bg, color:C.text2, fontSize:11, cursor:"pointer", fontWeight:600 }}>Know More</button>
                <button style={{ padding:"7px 16px", borderRadius:9, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, border:"none", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer" }}>Apply →</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── GLOBAL TOP BAR ───────────────────────────────────────────────────────────
function TopBar() {
  const [notifOpen,setNotifOpen]=useState(false);
  const [profOpen,setProfOpen]=useState(false);
  const [q,setQ]=useState("");
  const NOTIFS=[
    {icon:"📚",text:"New course assigned: PLC Level 2",time:"10m ago",u:true},
    {icon:"🏅",text:"You earned Gold badge in Analytics",time:"1h ago",u:true},
    {icon:"📣",text:"AURA Circles Phase 1 kick-off now",time:"3h ago",u:true},
    {icon:"🔔",text:"Safety cert expiring in 18 days",time:"1d ago",u:false},
  ];
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:22,paddingBottom:14,borderBottom:`1px solid ${C.border}`}}>
      {/* Shortened search */}
      <div style={{flex:"0 1 320px",position:"relative",minWidth:180}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses, skills…"
          style={{width:"100%",padding:"9px 14px 9px 34px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:12,color:C.text,background:C.white,outline:"none"}}/>
        <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.text3}}>🔍</span>
      </div>
      <div style={{flex:1}}/>
      {/* Streak */}
      <div style={{padding:"5px 10px",borderRadius:8,background:C.blue3,fontSize:11,color:C.blue,fontWeight:600,whiteSpace:"nowrap"}}>🔥 42-day streak</div>
      {/* Tata Steel logo - actual image on black bg */}
      <TataLogoSVG/>
      {/* Notif */}
      <div style={{position:"relative"}}>
        <button onClick={()=>{setNotifOpen(p=>!p);setProfOpen(false);}} style={{width:36,height:36,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16,position:"relative"}}>
          🔔
          <span style={{position:"absolute",top:2,right:2,width:8,height:8,borderRadius:"50%",background:C.red,border:"2px solid #fff"}}/>
        </button>
        {notifOpen&&(
          <div style={{position:"absolute",right:0,top:44,width:300,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 24px #0E172618",zIndex:200}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:700,color:C.text}}>Notifications</div>
            {NOTIFS.map((n,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"10px 16px",borderBottom:i<NOTIFS.length-1?`1px solid ${C.border}`:"none",background:n.u?C.blue3:C.white}}>
                <span style={{fontSize:18}}>{n.icon}</span>
                <div style={{flex:1}}><div style={{fontSize:12,color:C.text}}>{n.text}</div><div style={{fontSize:10,color:C.text3,marginTop:2}}>{n.time}</div></div>
                {n.u&&<div style={{width:7,height:7,borderRadius:"50%",background:C.blue,flexShrink:0,marginTop:4}}/>}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Profile */}
      <div style={{position:"relative"}}>
        <div onClick={()=>{setProfOpen(p=>!p);setNotifOpen(false);}} style={{cursor:"pointer"}}>
          <ProfileAvatar size={36}/>
        </div>
        {profOpen&&(
          <div style={{position:"absolute",right:0,top:44,width:200,background:C.white,border:`1px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 24px #0E172618",zIndex:200,overflow:"hidden"}}>
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>Vikram Mehta</div>
              <div style={{fontSize:11,color:C.text3}}>TQM · H Blast Furnace · TSN</div>
            </div>
            {[{icon:"⚙",label:"Settings"},{icon:"❓",label:"Help Centre"},{icon:"📋",label:"FAQs"},{icon:"🚪",label:"Logout",color:C.red}].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",cursor:"pointer",fontSize:13,color:item.color||C.text,borderBottom:i<3?`1px solid ${C.border}`:"none"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TDA CHATBOT ──────────────────────────────────────────────────────────────
function TDAChatbot() {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{from:"bot",text:"Hi Vikram! I'm TDA, your AI assistant. How can I help you today?"}]);
  const [inp,setInp]=useState("");
  const SUGG=["How to start Line 4 safely?","What is lockout-tagout procedure?","Show troubleshooting for conveyor jams","Explain bearing replacement process"];
  const send=(t)=>{
    const txt=t||inp; if(!txt.trim()) return;
    setMsgs(p=>[...p,{from:"user",text:txt},{from:"bot",text:`Here's what I found on "${txt}": Check the SOP module in ULIP. Want me to open the 2-min micro video?`}]);
    setInp("");
  };
  return (
    <>
      <div onClick={()=>setOpen(p=>!p)} style={{position:"fixed",bottom:28,right:28,width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.blue2})`,boxShadow:`0 4px 20px ${C.blue}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer",zIndex:500}}>
        {open?"✕":"🧠"}
      </div>
      {open&&(
        <div style={{position:"fixed",bottom:92,right:28,width:340,background:C.white,border:`1px solid ${C.border}`,borderRadius:16,boxShadow:"0 8px 40px #0E172620",zIndex:499,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{background:`linear-gradient(135deg,${C.blue},${C.blue2})`,padding:"14px 16px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#ffffff20",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🧠</div>
            <div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>TDA Assistant</div><div style={{fontSize:10,color:"#ffffff80"}}>AI Powered · Future Ready</div></div>
          </div>
          <div style={{flex:1,maxHeight:240,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:8}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.from==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"80%",padding:"8px 12px",borderRadius:10,background:m.from==="user"?C.blue:C.bg,color:m.from==="user"?"#fff":C.text,fontSize:12,lineHeight:1.5,borderBottomRightRadius:m.from==="user"?2:10,borderBottomLeftRadius:m.from==="bot"?2:10}}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
              {SUGG.map((s,i)=><div key={i} onClick={()=>send(s)} style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:C.blue3,color:C.blue,cursor:"pointer",border:`1px solid ${C.blue4}`}}>{s}</div>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask TDA anything…" style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none"}}/>
              <button onClick={()=>send()} style={{padding:"8px 12px",borderRadius:8,background:C.blue,border:"none",color:"#fff",fontSize:12,cursor:"pointer"}}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({onLogin}) {
  const FEATURES=[{icon:"🎯",label:"AI Learning Journeys"},{icon:"⚡",label:"Microlearning in Minutes"},{icon:"📊",label:"Real-time Skill Dashboard"},{icon:"🏅",label:"SOE Certifications"},{icon:"🧠",label:"TDA Knowledge Assistant"}];
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.blue2} 0%,${C.blue} 50%,#00A8E8 100%)`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
      <div style={{position:"absolute",bottom:-150,left:-80,width:500,height:500,borderRadius:"50%",background:"rgba(255,255,255,0.03)"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1,width:"100%",maxWidth:980,padding:"0 24px",display:"flex",gap:60,alignItems:"center"}}>
        {/* Left */}
        <div style={{flex:1}}>
          {/* ULIP logo image */}
          <div style={{marginBottom:24,display:"flex",justifyContent:"flex-start"}}>
            <ULIPLogoImg size={120}/>
          </div>
          <div style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginBottom:4}}>Unified Learning Intelligence Platform</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",marginBottom:32}}>Tata Steel · Human Resources Management</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {FEATURES.map((f,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderRadius:10,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",animation:`fadeSlide 0.4s ease ${i*0.1}s both`}}>
                <span style={{fontSize:20}}>{f.icon}</span>
                <span style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.9)"}}>{f.label}</span>
                <div style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:C.green}}/>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={{width:380,background:"rgba(255,255,255,0.97)",borderRadius:20,padding:36,boxShadow:"0 24px 80px rgba(0,0,0,0.3)"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:22,fontWeight:800,color:C.text,fontFamily:"'Playfair Display',serif"}}>Welcome Back</div>
            <div style={{fontSize:13,color:C.text3,marginTop:6}}>Select your login type to continue</div>
          </div>
          <div onClick={onLogin} style={{padding:"20px 22px",borderRadius:14,border:`2px solid ${C.blue}`,background:C.blue3,cursor:"pointer",marginBottom:14,transition:"all 0.18s"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:48,height:48,borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🧑‍💼</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>Login for OPR / NOPR</div>
                <div style={{fontSize:12,color:C.text3,marginTop:2}}>For permanent employees (IL & NS levels)</div>
              </div>
              <span style={{fontSize:18,color:C.blue}}>→</span>
            </div>
          </div>
          <div style={{padding:"20px 22px",borderRadius:14,border:`2px solid ${C.border}`,background:"#fafafa",cursor:"not-allowed",opacity:0.6,marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,#9B59B6,#6C3483)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>👷</div>
              <div style={{flex:1}}>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>Login for Contractor</div>
                <div style={{fontSize:12,color:C.text3,marginTop:2}}>GWC / Contract workforce access</div>
              </div>
              <Bdg label="Coming Soon" color="#9B59B6"/>
            </div>
          </div>
          <div style={{textAlign:"center",fontSize:11,color:C.text3}}>Single Sign-On via Azure AD · Secured by MFA</div>
        </div>
      </div>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Welcome back, Vikram 👋</h2>
        <p style={{color:C.text2,fontSize:13,marginTop:4}}>You have <strong style={{color:C.red}}>1 overdue</strong> and <strong style={{color:C.blue}}>4 AI-recommended</strong> opportunities waiting.</p>
      </div>

      {/* Daily Knowledge Byte - full width */}
      <div style={{background:"linear-gradient(135deg,#003D6B 0%,#005A8E 60%,#0080C7 100%)",border:"none",borderRadius:16,padding:"24px 28px",marginBottom:20,display:"flex",alignItems:"center",gap:24,position:"relative",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,128,199,0.3)"}}>
        <div style={{position:"absolute",right:-20,top:-20,width:180,height:180,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",right:60,bottom:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{width:64,height:64,borderRadius:14,background:"rgba(245,166,35,0.2)",border:"2px solid rgba(245,166,35,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>📖</div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,fontWeight:700,color:"#FFD166",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:6}}>Daily Knowledge Byte · TPM Nugget</div>
          <div style={{fontSize:18,fontWeight:700,color:"#FFFFFF",lineHeight:1.35,marginBottom:8,fontFamily:"'Playfair Display',serif"}}>Autonomous Maintenance – Step 3: Tentative Standards</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.88)",lineHeight:1.65}}>Learn how to create cleaning, lubrication, and inspection standards for your workstation. Used in OEE improvement across TSN shopfloor.</div>
          <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
            <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(245,166,35,0.2)",color:"#FFD166",fontSize:11,fontWeight:600,border:"1px solid rgba(245,166,35,0.5)"}}>⏱ 2 min 40 sec</span>
            <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:11,fontWeight:600,border:"1px solid rgba(255,255,255,0.25)"}}>TPM</span>
            <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:11,fontWeight:600,border:"1px solid rgba(255,255,255,0.25)"}}>Maintenance</span>
          </div>
        </div>
        <button style={{padding:"12px 24px",borderRadius:10,background:"#F5A623",border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0,boxShadow:"0 4px 16px rgba(245,166,35,0.5)",whiteSpace:"nowrap"}}>▶ Start Now</button>
      </div>

      {/* 3 scrollable tiles row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>

        {/* Recommended Learnings */}
        <Card pad={0} style={{overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:C.blue3}}>
            <div style={{fontSize:12,fontWeight:700,color:C.blue}}>🎯 Recommended for You</div>
            <div style={{fontSize:10,color:C.text3,marginTop:2}}>AI-matched to your skills & goals</div>
          </div>
          <div style={{overflowY:"auto",maxHeight:340}}>
            {REC_LEARNINGS.map((l,i)=>(
              <div key={i} style={{padding:"12px 14px",borderBottom:i<REC_LEARNINGS.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>{l.title}</div>
                <div style={{fontSize:10,color:C.text3,marginBottom:5}}>{l.source} · {l.duration} · <span style={{color:C.green,fontWeight:600}}>{l.match} match</span></div>
                <div style={{fontSize:11,color:C.text2,lineHeight:1.5,marginBottom:6}}>{l.summary}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {l.tags.map(t=><span key={t} style={{padding:"1px 7px",borderRadius:10,background:C.blue3,color:C.blue,fontSize:9,fontWeight:600}}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
            <button style={{width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${C.blue}`,background:"transparent",color:C.blue,fontSize:12,fontWeight:600,cursor:"pointer"}}>Search All Learnings →</button>
          </div>
        </Card>

        {/* Popular Microlearnings */}
        <Card pad={0} style={{overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:"#FFF9EE"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.accent}}>⚡ Popular Microlearnings</div>
            <div style={{fontSize:10,color:C.text3,marginTop:2}}>Trending this week</div>
          </div>
          <div style={{overflowY:"auto",maxHeight:340}}>
            {POPULAR_MICRO.map((m,i)=>(
              <div key={i} style={{padding:"12px 14px",borderBottom:i<POPULAR_MICRO.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
                  <div style={{width:34,height:34,borderRadius:8,background:`${m.color}18`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>
                    {m.type==="video"?"▶":"📄"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:C.text}}>{m.title}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                      <span style={{fontSize:9,padding:"1px 6px",borderRadius:8,background:m.type==="video"?`${C.blue}15`:`${C.green}15`,color:m.type==="video"?C.blue:C.green,fontWeight:700,textTransform:"uppercase"}}>{m.type}</span>
                      <span style={{fontSize:9,color:C.text3}}>{m.duration} · 👁 {m.views}</span>
                      <span style={{padding:"1px 7px",borderRadius:10,background:`${m.color}15`,color:m.color,fontSize:9,fontWeight:700}}>{m.tag}</span>
                    </div>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.text2,lineHeight:1.5}}>{m.summary}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
            <button style={{width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${C.accent}`,background:"transparent",color:C.accent,fontSize:12,fontWeight:600,cursor:"pointer"}}>Browse All Microlearnings →</button>
          </div>
        </Card>

        {/* Calendar */}
        <Card pad={0} style={{overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:"#F0FBF6"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.green}}>📅 Upcoming Programs</div>
            <div style={{fontSize:10,color:C.text3,marginTop:2}}>Your eligible trainings</div>
          </div>
          <div style={{overflowY:"auto",maxHeight:340}}>
            {CALENDAR_EVENTS.map((e,i)=>(
              <div key={i} style={{padding:"10px 14px",borderBottom:i<CALENDAR_EVENTS.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:4}}>
                  <div style={{background:C.blue3,color:C.blue,borderRadius:8,padding:"4px 8px",fontSize:10,fontWeight:700,minWidth:50,textAlign:"center",lineHeight:1.3,flexShrink:0}}>{e.date}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:C.text}}>{e.topic}</div>
                    <div style={{fontSize:10,color:C.text3,marginTop:1}}>{e.mode} · {e.location}</div>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.text2,lineHeight:1.5,paddingLeft:60}}>{e.desc}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
            <button style={{width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${C.green}`,background:"transparent",color:C.green,fontSize:12,fontWeight:600,cursor:"pointer"}}>View Full Calendar →</button>
          </div>
        </Card>
      </div>

      {/* Bottom 3 action tiles */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginTop:16}}>

        {/* Real-time Feedback */}
        <div style={{background:`linear-gradient(145deg,${C.green}12,${C.white})`,border:`1.5px solid ${C.green}35`,borderRadius:16,padding:24,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-16,right:-16,width:80,height:80,borderRadius:"50%",background:`${C.green}10`}}/>
          <div style={{fontSize:28,marginBottom:12}}>💬</div>
          <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8,fontFamily:"'Playfair Display',serif"}}>Real-time Feedback</div>
          <p style={{fontSize:12,color:C.text2,lineHeight:1.65,marginBottom:16}}>Have you recently given a presentation, managed a project, or stretched yourself in another way? Ask for feedback on how you did and what you could improve.</p>
          <a href="#" style={{fontSize:13,color:C.green,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
            Request feedback <span style={{fontSize:16}}>→</span>
          </a>
        </div>

        {/* Goals */}
        <div style={{background:`linear-gradient(145deg,${C.blue}12,${C.white})`,border:`1.5px solid ${C.blue}35`,borderRadius:16,padding:24,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-16,right:-16,width:80,height:80,borderRadius:"50%",background:`${C.blue}10`}}/>
          <div style={{fontSize:28,marginBottom:12}}>🎯</div>
          <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8,fontFamily:"'Playfair Display',serif"}}>Goals</div>
          <p style={{fontSize:12,color:C.text2,lineHeight:1.65,marginBottom:16}}>Set learning goals to help you grow. Establish milestones, track your progress, invite supporters, and more. ULIP has all the resources you'll need to accomplish your goals.</p>
          <a href="#" style={{fontSize:13,color:C.blue,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
            Create a goal <span style={{fontSize:16}}>→</span>
          </a>
        </div>

        {/* Explore ULIP */}
        <div style={{background:`linear-gradient(145deg,${C.accent}12,${C.white})`,border:`1.5px solid ${C.accent}35`,borderRadius:16,padding:24,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-16,right:-16,width:80,height:80,borderRadius:"50%",background:`${C.accent}10`}}/>
          <div style={{fontSize:28,marginBottom:12}}>✦</div>
          <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:12,fontFamily:"'Playfair Display',serif"}}>Explore ULIP</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {["My activity","Mentors","Profile","Feedback","Contact us"].map(l=>(
              <a key={l} href="#" style={{fontSize:13,color:C.accent,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
                {l} <span style={{fontSize:14}}>→</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── SKILL PASSPORT MODAL ─────────────────────────────────────────────────────
function SkillPassport({onClose}) {
  return (
    <div style={{position:"fixed",inset:0,background:"#0E172670",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div style={{background:C.white,borderRadius:20,width:700,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 80px #0E172640"}}>
        <div style={{background:`linear-gradient(135deg,${C.sidebar},${C.blue})`,padding:"24px 28px",borderRadius:"20px 20px 0 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
            <ProfileAvatar size={72}/>
            <div style={{flex:1}}>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:"'Playfair Display',serif"}}>Vikram Mehta</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Maintenance Engineer · IL4 · TQM Department</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>Area: H Blast Furnace · Plant: TSN · Jamshedpur</div>
            </div>
            <div style={{textAlign:"center",background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"12px 18px"}}>
              <div style={{fontSize:28,fontWeight:800,color:"#FFD700",fontFamily:"'Playfair Display',serif"}}>4,820</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Skill XP</div>
            </div>
            <button onClick={onClose} style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",fontSize:16,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <div style={{padding:"24px 28px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
            <div>
              <SLabel>Top Skills</SLabel>
              {[["Blast Furnace Operations",88],["TPM & Lean",82],["Process Safety",71],["Quality Systems",65],["Data Analytics",42]].map(([s,v],i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:C.text}}>{s}</span><span style={{color:C.blue,fontWeight:600}}>{v}%</span></div>
                  <div style={{height:6,background:C.border,borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:`${v}%`,background:`linear-gradient(90deg,${C.blue},#7B97F8)`}}/></div>
                </div>
              ))}
            </div>
            <div>
              <SLabel>SOE Certifications</SLabel>
              {SOE_CERTS.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,background:C.bg,marginBottom:8}}>
                  <SOEBadge level={c.level} size={32}/>
                  <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.text}}>{c.name}</div><div style={{fontSize:10,color:C.text3}}>{c.date}</div></div>
                  <span style={{fontSize:11,fontWeight:700,color:c.color}}>{c.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <SLabel>Projects Worked On</SLabel>
            {[{name:"Digital Twin – BF#4",role:"Project Lead",status:"Completed",year:"2024"},{name:"TPM Pillar Implementation",role:"Core Member",status:"Ongoing",year:"2024"},{name:"SPC for Sinter Quality",role:"Subject Expert",status:"Completed",year:"2023"}].map((p,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 12px",borderRadius:9,background:C.bg,marginBottom:8,border:`1px solid ${C.border}`}}>
                <div style={{width:34,height:34,borderRadius:8,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📁</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.text}}>{p.name}</div><div style={{fontSize:10,color:C.text3}}>{p.role} · {p.year}</div></div>
                <Bdg label={p.status} color={p.status==="Completed"?C.green:C.accent}/>
              </div>
            ))}
          </div>
          <button onClick={()=>alert("Generating PDF…")} style={{width:"100%",padding:"12px",borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>⬇ Download Skill Passport as PDF</button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const [skillFilter,setSkillFilter]=useState("Safety");
  const [showPassport,setShowPassport]=useState(false);
  const [goalSearch,setGoalSearch]=useState("");
  const [goalSugg,setGoalSugg]=useState([]);
  const [selSkill,setSelSkill]=useState(null);
  const [selLevel,setSelLevel]=useState(null);
  const [drillSkill,setDrillSkill]=useState(null);
  const [gapFilter,setGapFilter]=useState("All");

  const JMAP={
    Safety:["Fire Safety","Emergency Response","Hazmat Handling","Process Safety","LOTO Procedure"],
    Engineering:["PLC Programming","Hydraulics","Predictive Maintenance","Blast Furnace Operations","Industrial IoT"],
    Leadership:["Team Management","Communication","Project Management","Change Management","Coaching Skills"],
    Digital:["Data Analytics","Python Basics","AI/ML Basics","Digital Twins","Power BI"],
  };
  const ALL_SKILLS_SHUFFLED=["Fire Safety","PLC Programming","Team Management","Data Analytics","Emergency Response","Predictive Maintenance","Communication","Python Basics","Process Safety","Blast Furnace Operations","Project Management","AI/ML Basics","LOTO Procedure","Industrial IoT","Change Management","Power BI","Hazmat Handling","Hydraulics","Coaching Skills","Digital Twins"];
  const SKILLS_JOURNEY=skillFilter==="All"?ALL_SKILLS_SHUFFLED:(JMAP[skillFilter]||[]);

  const displayedGaps = gapFilter==="All" ? SKILL_GAPS : SKILL_GAPS.filter(s=>s.category===gapFilter);

  // Find matching gap for a skill name (fuzzy)
  const findGap = name => SKILL_GAPS.find(g => g.skill.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(g.skill.toLowerCase()));

  return (
    <div style={{maxWidth:1100}}>
      {showPassport&&<SkillPassport onClose={()=>setShowPassport(false)}/>}
      {drillSkill&&<SkillDrilldown skill={drillSkill.skill} current={drillSkill.current} required={drillSkill.required} onClose={()=>setDrillSkill(null)}/>}
      {/* Profile Header */}
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",gap:24,alignItems:"flex-start"}}>
          <ProfileAvatar size={90} edit/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:4}}>
              <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Vikram Mehta</h2>
              <Bdg label="Gold Learner" color={C.gold}/>
              <Bdg label="Safety Champion" color={C.green}/>
              <Bdg label="🔥 42-day streak" color={C.red}/>
            </div>
            <div style={{fontSize:13,color:C.text2,marginBottom:2}}>Maintenance Engineer · IL4</div>
            <div style={{fontSize:12,color:C.text3,marginBottom:10}}>🏭 Department: TQM &nbsp;|&nbsp; 📍 Area: H Blast Furnace &nbsp;|&nbsp; 🏗 Plant: TSN, Jamshedpur</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["Six Sigma","Lean","Fire Safety","ISO 9001","TPM","Predictive Maint."].map(b=><Bdg key={b} label={b} color={C.blue}/>)}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,flexShrink:0,alignItems:"flex-end"}}>
            <div style={{textAlign:"center",background:C.blue3,borderRadius:14,padding:"14px 22px"}}>
              <div style={{fontSize:32,fontWeight:800,color:C.blue,fontFamily:"'Playfair Display',serif"}}>4,820</div>
              <div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>Skill XP</div>
              <div style={{fontSize:11,color:C.green,marginTop:4}}>Top 12% in team</div>
            </div>
            <button onClick={()=>setShowPassport(true)} style={{padding:"9px 18px",borderRadius:9,background:C.blue,border:"none",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>📋 View Skill Passport</button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {[{l:"Trainings Completed",v:"34",c:C.blue},{l:"Due Trainings",v:"2",c:C.red},{l:"Goal Completion",v:"68%",c:C.green},{l:"Ongoing Projects",v:"1",c:C.accent},{l:"Completed Projects",v:"3",c:C.blue2}].map((s,i)=>(
          <Card key={i} pad={16} style={{textAlign:"center"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
            <div style={{fontSize:10,color:C.text3,marginTop:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
          </Card>
        ))}
      </div>

      {/* Learning Journey */}
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <SLabel style={{marginBottom:0}}>Learning Journey Roadmap</SLabel>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["All",...Object.keys(JMAP)].map(k=>(
              <button key={k} onClick={()=>setSkillFilter(k)} style={{padding:"5px 14px",borderRadius:20,border:`1.5px solid ${skillFilter===k?C.blue:C.border}`,background:skillFilter===k?C.blue:C.white,color:skillFilter===k?"#fff":C.text2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{k}</button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",overflowX:"auto",paddingBottom:8}}>
          {SKILLS_JOURNEY.map((step,i)=>{
            const gap = findGap(step);
            return (
            <div key={i} style={{display:"flex",alignItems:"center"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:130}}>
                <div
                  onClick={()=>{ if(gap) setDrillSkill(gap); }}
                  style={{width:40,height:40,borderRadius:"50%",background:i<=2?C.blue:C.border,border:`3px solid ${i<=2?C.blue:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700,boxShadow:i===2?`0 0 0 4px ${C.blue}25`:"none",cursor:gap?"pointer":"default",transition:"transform 0.15s"}}
                  onMouseEnter={e=>{if(gap)e.currentTarget.style.transform="scale(1.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}
                >
                  {i<=1?"✓":i===2?"●":i+1}
                </div>
                <div
                  onClick={()=>{ if(gap) setDrillSkill(gap); }}
                  style={{marginTop:8,fontSize:11,textAlign:"center",lineHeight:1.3,color:i<=2?C.blue:C.text3,fontWeight:i===2?700:400,maxWidth:110,cursor:gap?"pointer":"default",textDecoration:gap?"underline dotted":"none",textDecorationColor:C.blue4}}
                >{step}</div>
                {i===2&&<div style={{fontSize:9,color:C.blue,fontWeight:700,marginTop:2,textTransform:"uppercase"}}>Current</div>}
                {gap&&<div style={{fontSize:9,color:C.text3,marginTop:2}}>Click to explore</div>}
              </div>
              {i<SKILLS_JOURNEY.length-1&&<div style={{height:3,width:24,background:i<2?C.green:C.border,flexShrink:0,marginTop:-22}}/>}
            </div>
            );
          })}
        </div>
        {skillFilter==="All" && (
          <div style={{marginTop:10,padding:"8px 12px",background:C.blue3,borderRadius:8,fontSize:11,color:C.blue}}>
            💡 Showing a shuffled cross-functional journey across Safety, Engineering, Leadership & Digital skills
          </div>
        )}
      </Card>

      {/* Learning Goal Selector */}
      <Card style={{marginBottom:20}}>
        <SLabel>Learning Goal Selector</SLabel>
        <div style={{position:"relative",marginBottom:16}}>
          <input value={goalSearch} onChange={e=>{setGoalSearch(e.target.value);if(e.target.value.length>1)setGoalSugg(SKILL_NAMES.filter(s=>s.toLowerCase().includes(e.target.value.toLowerCase())).slice(0,6));else setGoalSugg([]);}}
            placeholder="🔍 Type a skill to set as your learning goal…"
            style={{width:"100%",padding:"11px 16px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,color:C.text,outline:"none"}}/>
          {goalSugg.length>0&&(
            <div style={{position:"absolute",top:"100%",left:0,right:0,background:C.white,border:`1px solid ${C.border}`,borderRadius:10,boxShadow:"0 4px 16px #0E172614",zIndex:100,overflow:"hidden"}}>
              {goalSugg.map((s,i)=>(
                <div key={i} onClick={()=>{setSelSkill(s);setGoalSearch(s);setGoalSugg([]);setSelLevel(null);}}
                  style={{padding:"10px 16px",cursor:"pointer",fontSize:13,color:C.text,borderBottom:i<goalSugg.length-1?`1px solid ${C.border}`:"none"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.bg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  🎯 {s}
                </div>
              ))}
            </div>
          )}
        </div>
        {selSkill&&(
          <div>
            <SLabel>Select Proficiency Target</SLabel>
            <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
              {Object.keys(LEARNING_MAP).map(lvl=>{const lm=LEARNING_MAP[lvl];return(
                <div key={lvl} onClick={()=>setSelLevel(lvl)} style={{flex:1,minWidth:120,padding:"12px 16px",borderRadius:12,border:`2px solid ${selLevel===lvl?lm.color:C.border}`,background:selLevel===lvl?`${lm.color}12`:C.bg,cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:700,color:selLevel===lvl?lm.color:C.text}}>{lvl}</div>
                </div>
              );})}
            </div>
            {selLevel&&(
              <div style={{background:`${LEARNING_MAP[selLevel].color}08`,border:`1px solid ${LEARNING_MAP[selLevel].color}30`,borderRadius:12,padding:16}}>
                <div style={{fontSize:13,fontWeight:700,color:LEARNING_MAP[selLevel].color,marginBottom:12}}>Journey: {selSkill} — {selLevel}</div>
                {LEARNING_MAP[selLevel].items.map((item,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,background:C.white,border:`1px solid ${C.border}`,marginBottom:8}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:LEARNING_MAP[selLevel].color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
                    <span style={{fontSize:12,color:C.text}}>{item.replace("{skill}",selSkill)}</span>
                  </div>
                ))}
                <button style={{marginTop:10,width:"100%",padding:"10px",borderRadius:9,background:LEARNING_MAP[selLevel].color,border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer"}}>🎯 Set This as My Learning Goal</button>
              </div>
            )}
          </div>
        )}
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Skill Gap - now clickable */}
        <Card>
          <SLabel>Skill Gap Analysis — click any skill to explore</SLabel>
          {SKILL_GAPS.map((s,i)=>(
            <div key={i} onClick={()=>setDrillSkill(s)} style={{marginBottom:14,cursor:"pointer",padding:"8px 10px",borderRadius:10,border:`1px solid transparent`,transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.blue3;e.currentTarget.style.borderColor=C.blue4;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12,color:C.text}}>
                <span style={{fontWeight:600}}>{s.skill} <span style={{color:C.blue,fontSize:10}}>↗ View modules</span></span>
                <span style={{color:s.current>=s.required?C.green:C.red,fontWeight:600}}>{s.current}% / {s.required}%</span>
              </div>
              <div style={{height:7,background:C.border,borderRadius:4,position:"relative"}}>
                <div style={{height:"100%",borderRadius:4,width:`${s.current}%`,background:s.current>=s.required?`linear-gradient(90deg,${C.green},#5EE8B5)`:`linear-gradient(90deg,${C.blue},#7B97F8)`}}/>
                <div style={{position:"absolute",top:-3,height:13,width:2,background:C.text3,left:`${s.required}%`,borderRadius:2}}/>
              </div>
            </div>
          ))}
        </Card>

        {/* SOE Certification Wall */}
        <Card>
          <SLabel>SOE Certification Wall</SLabel>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {SOE_CERTS.map((cert,i)=>(
              <div key={i} style={{background:C.bg,borderRadius:12,padding:"16px 14px",border:`1.5px solid ${cert.color}40`,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:8}}>
                <SOEBadge level={cert.level} size={48}/>
                <div style={{fontSize:12,fontWeight:700,color:C.text,lineHeight:1.3}}>{cert.name}</div>
                <div style={{fontSize:10,color:C.text3}}>{cert.date}</div>
                <span style={{padding:"3px 12px",borderRadius:20,fontSize:10,fontWeight:700,background:`${cert.color}20`,color:cert.color,border:`1px solid ${cert.color}40`}}>{cert.level}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        {["⬆ Upload a Resource","💬 Give Feedback","🆘 Seek Support","👥 Team's Learning"].map((btn,i)=>(
          <Btn key={i} color={[C.blue,C.green,C.accent,C.blue2][i]}>{btn}</Btn>
        ))}
      </div>
    </div>
  );
}

// ─── MY LEARNING GOALS ────────────────────────────────────────────────────────
function GoalsPage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>My Learning Goals</h2>
        <Bdg label="TQM Competency Framework" color={C.blue}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {TQM_GOALS.map((g,i)=>(
          <Card key={g.id} style={{borderTop:`4px solid ${g.progress>=75?C.green:g.progress>=50?C.blue:C.accent}`,display:"flex",flexDirection:"column",minHeight:220}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
              <div style={{width:40,height:40,borderRadius:10,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{g.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.3}}>{g.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                  <div style={{flex:1,height:5,background:C.border,borderRadius:3}}>
                    <div style={{height:"100%",borderRadius:3,width:`${g.progress}%`,background:g.progress>=75?C.green:g.progress>=50?C.blue:C.accent}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:g.progress>=75?C.green:g.progress>=50?C.blue:C.accent,flexShrink:0}}>{g.progress}%</span>
                </div>
              </div>
            </div>
            <div style={{fontSize:11,color:C.text3,marginBottom:10,fontStyle:"italic"}}>Key areas to master:</div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
              {g.items.map((item,j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:C.text2}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:j<2?C.green:C.border,flexShrink:0}}/>
                  {item}
                </div>
              ))}
            </div>
            <button style={{marginTop:14,width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${C.blue}`,background:"transparent",color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer"}}>
              {g.progress===100?"✓ Completed":"Continue →"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── MENTORS ──────────────────────────────────────────────────────────────────
function MentorsPage() {
  const [sel,setSel]=useState(null);const[area,setArea]=useState("");const[msg,setMsg]=useState("");const[sent,setSent]=useState(false);
  return (
    <div style={{maxWidth:1100}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:"0 0 20px"}}>Find a Mentor</h2>
      {sel&&(
        <div style={{position:"fixed",inset:0,background:"#0E172660",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:C.white,borderRadius:18,width:460,padding:28,boxShadow:"0 16px 60px #0E172630"}}>
            {sent?(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <div style={{fontSize:18,fontWeight:700,color:C.green}}>Request Sent!</div>
                <div style={{fontSize:13,color:C.text3,marginTop:6,marginBottom:20}}>Your mentorship request was sent to {sel.name}</div>
                <Btn onClick={()=>{setSent(false);setSel(null);setArea("");setMsg("");}}>Close</Btn>
              </div>
            ):(
              <>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:`linear-gradient(135deg,${sel.color},${sel.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#fff"}}>{sel.avatar}</div>
                  <div><div style={{fontSize:15,fontWeight:700,color:C.text}}>{sel.name}</div><div style={{fontSize:12,color:C.text3}}>{sel.dept}</div></div>
                  <button onClick={()=>setSel(null)} style={{marginLeft:"auto",width:30,height:30,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:14}}>✕</button>
                </div>
                <SLabel>Area of Mentorship *</SLabel>
                <input value={area} onChange={e=>setArea(e.target.value)} placeholder={`e.g. ${sel.skills[0]}, career guidance…`} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,outline:"none",marginBottom:14}}/>
                <SLabel>What kind of support are you looking for? *</SLabel>
                <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Describe your learning goals and what you'd like help with…" style={{width:"100%",minHeight:100,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,resize:"vertical",outline:"none",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}/>
                <div style={{display:"flex",gap:10}}>
                  <Btn style={{flex:1}} onClick={()=>setSel(null)}>Cancel</Btn>
                  <Btn variant="fill" color={C.blue} style={{flex:1}} disabled={!area||!msg} onClick={()=>setSent(true)}>Send Request</Btn>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {MENTOR_LIST.map((m,i)=>(
          <Card key={i}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${m.color},${m.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#fff",flexShrink:0}}>{m.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>{m.name}</div>
                <div style={{fontSize:11,color:C.text3}}>{m.dept}</div>
                <div style={{fontSize:11,color:C.text2,marginTop:2}}>⭐ {m.exp} experience</div>
              </div>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:8}}>📌 {m.area}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
              {m.skills.map(s=><Bdg key={s} label={s} color={m.color}/>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn style={{flex:1,fontSize:11}} color={C.text3}>💬 Message</Btn>
              <Btn variant="fill" color={C.blue} style={{flex:1,fontSize:11}} onClick={()=>setSel(m)}>Request Mentorship</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── JOBS ─────────────────────────────────────────────────────────────────────
function JobsPage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Internal Job Openings</h2>
        <Bdg label="AI-matched to your profile" color={C.green}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {JOB_OPENINGS.map((job,i)=>(
          <Card key={i} style={{borderLeft:`4px solid ${job.match>=90?C.green:job.match>=85?C.blue:C.accent}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1,marginRight:12}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text,lineHeight:1.3,marginBottom:4}}>{job.title}</div>
                <div style={{fontSize:12,color:C.text3}}>{job.dept} · {job.location} · {job.level}</div>
              </div>
              <div style={{textAlign:"center",background:job.match>=90?`${C.green}15`:job.match>=85?C.blue3:`${C.accent}15`,borderRadius:10,padding:"6px 12px",flexShrink:0}}>
                <div style={{fontSize:16,fontWeight:800,color:job.match>=90?C.green:job.match>=85?C.blue:C.accent}}>{job.match}%</div>
                <div style={{fontSize:9,color:C.text3,textTransform:"uppercase"}}>Match</div>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{job.skills.map(s=><Bdg key={s} label={s} color={C.blue}/>)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:11,color:C.text3}}>Posted {job.posted}</div>
              <Btn variant="fill" color={C.blue} style={{fontSize:11}}>Apply Now →</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── COMMUNITIES ──────────────────────────────────────────────────────────────
function CommunitiesPage() {
  const [newPost,setNewPost]=useState("");
  const [posts,setPosts]=useState(COMMUNITY_POSTS);
  const TYPE_COLORS={text:C.blue,insight:C.green,question:C.accent,achievement:"#9B59B6",tip:C.red};
  const addPost=()=>{if(!newPost.trim())return;setPosts(p=>[{author:"Vikram Mehta",dept:"TQM · TSN",avatar:"VM",color:C.blue,time:"Just now",text:newPost,likes:0,comments:0,type:"text"},...p]);setNewPost("");};
  return (
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:"0 0 20px"}}>Communities</h2>
      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <ProfileAvatar size={38}/>
          <div style={{flex:1}}>
            <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Share a learning, tip, question or achievement…" style={{width:"100%",minHeight:80,padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,color:C.text,resize:"none",outline:"none",fontFamily:"'DM Sans',sans-serif"}}/>
            <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:8}}>{["📷 Photo","📹 Video","📄 Document"].map(t=><button key={t} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bg,color:C.text2,fontSize:12,cursor:"pointer"}}>{t}</button>)}</div>
              <Btn variant="fill" color={C.blue} onClick={addPost} disabled={!newPost.trim()}>Post</Btn>
            </div>
          </div>
        </div>
      </Card>
      {posts.map((post,i)=>(
        <Card key={i} style={{marginBottom:16}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${post.color},${post.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0}}>{post.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{post.author}</div>
              <div style={{fontSize:11,color:C.text3}}>{post.dept} · {post.time}</div>
            </div>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:600,background:`${TYPE_COLORS[post.type]}15`,color:TYPE_COLORS[post.type],border:`1px solid ${TYPE_COLORS[post.type]}30`}}>
              {{text:"💬 Post",insight:"💡 Insight",question:"❓ Question",achievement:"🏆 Achievement",tip:"⚡ Tip"}[post.type]}
            </span>
          </div>
          <div style={{fontSize:13,color:C.text2,lineHeight:1.7,marginBottom:14}}>{post.text}</div>
          <div style={{display:"flex",gap:6,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
            {[["👍",post.likes,"Like"],["💬",post.comments,"Comment"],["↗","","Share"]].map(([icon,count,label],j)=>(
              <button key={j} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.text2,fontSize:12,cursor:"pointer"}}>{icon} {count} <span style={{color:C.text3}}>{label}</span></button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── MICROLEARNING ENGINE COMPONENT ──────────────────────────────────────────
const EXISTING_MICROS = [
  { id:1, title:"The 7 Steps of Autonomous Maintenance", topic:"TPM", duration:"2 min", sent:340, openRate:78, successRate:82, groups:["Operations TSJ","TQM Dept"], channels:["WhatsApp","Teams"], status:"Active",  created:"Apr 15", lastSent:"May 18" },
  { id:2, title:"What is Kaizen? A 90-second explainer",  topic:"Lean",duration:"1.5 min",sent:215,openRate:71,successRate:74, groups:["Engineering","Operations"],channels:["Email","ULIP App"],  status:"Active",  created:"Mar 20", lastSent:"May 10" },
  { id:3, title:"LOTO Procedure – Step by Step",          topic:"Safety",duration:"3 min",sent:480, openRate:88, successRate:91, groups:["All Depts"],            channels:["WhatsApp","Email"],  status:"Active",  created:"Feb 08", lastSent:"May 20" },
  { id:4, title:"Reading a Control Chart (SPC Basics)",   topic:"Quality",duration:"2 min",sent:140,openRate:62, successRate:67, groups:["TQM, GSP & SC"],         channels:["Teams"],             status:"Paused",  created:"Jan 30", lastSent:"Apr 12" },
  { id:5, title:"5S in 5 Minutes",                        topic:"TPM",  duration:"5 min",sent:290, openRate:75, successRate:79, groups:["Operations TSJ","Safety"],channels:["WhatsApp","Teams","Email"],status:"Active",created:"Jan 12",lastSent:"May 15"},
];

function MicrolearningEngine({ toggleCh, channels }) {
  const [microTab, setMicroTab] = useState("send");   // send | list | quiz
  const [selectedMicro, setSelectedMicro] = useState(null);
  const [quizType, setQuizType] = useState(null);
  const [mcqOptions, setMcqOptions] = useState(["","","",""]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerated, setAiGenerated] = useState(false);
  const [nudgeType, setNudgeType] = useState(null);

  const MICRO_TABS = [
    { id:"send",  label:"📤 Send Microlearning" },
    { id:"list",  label:"📋 My Microlearnings"  },
    { id:"quiz",  label:"➕ Add Quiz / Assessment" },
  ];

  const QUIZ_TYPES = [
    { id:"mcq",   icon:"🔘", label:"Single Select (MCQ)",   desc:"One correct answer from multiple options" },
    { id:"multi", icon:"☑",  label:"Multi-Select",           desc:"Multiple correct answers" },
    { id:"word",  icon:"✏",  label:"Word / Short Answer",    desc:"Free text or keyword match" },
    { id:"image", icon:"🖼",  label:"Image-Based Question",   desc:"Attach an image with the question" },
  ];

  const STATUS_COLOR = { Active:C.green, Paused:C.accent };

  return (
    <div>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,#003D6B,${C.blue})`,borderRadius:14,padding:"18px 22px",marginBottom:20,display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:46,height:46,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>⚡</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif"}}>Microlearning Engine</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:2}}>Create, send and track bite-size learning across WhatsApp · Teams · Email · ULIP App</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          {[{v:"1,465",l:"Total Sent",c:"#FFD166"},{v:"76%",l:"Avg Open Rate",c:"#A8EDBB"},{v:"79%",l:"Avg Success",c:"#A8EDBB"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center",background:"rgba(255,255,255,0.14)",borderRadius:10,padding:"8px 14px"}}>
              <div style={{fontSize:18,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {MICRO_TABS.map(t=>(
          <button key={t.id} onClick={()=>{ setMicroTab(t.id); setSelectedMicro(null); setQuizType(null); setAiGenerated(false); }} style={{
            padding:"10px 20px",borderRadius:10,border:`1.5px solid ${microTab===t.id?C.blue:C.border}`,
            background:microTab===t.id?C.blue:C.white,color:microTab===t.id?"#fff":C.text2,
            fontSize:13,fontWeight:600,cursor:"pointer",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── SEND MICROLEARNING ── */}
      {microTab==="send" && !selectedMicro && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card>
            <SLabel>Nudge Type</SLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {["⏰ Pending Training","🆕 New Content","📋 Newly Assigned","💬 Feedback Request","🏅 Milestone Alert","🔥 Streak Reminder","📊 Assessment Due","🎯 Goal Check-in"].map(t=>(
                <div key={t} onClick={()=>setNudgeType(t)} style={{padding:"8px 14px",borderRadius:9,border:`1.5px solid ${nudgeType===t?C.blue:C.border}`,fontSize:12,color:nudgeType===t?C.blue:C.text2,cursor:"pointer",background:nudgeType===t?C.blue3:C.bg,fontWeight:nudgeType===t?600:400}}>{t}</div>
              ))}
            </div>
            <SLabel>Attach Microlearning (optional)</SLabel>
            <div style={{border:`2px dashed ${C.blue4}`,borderRadius:10,padding:"14px 16px",background:C.blue3,marginBottom:14,cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:13,color:C.blue,fontWeight:600}}>📎 Attach a microlearning or select from library</div>
              <div style={{fontSize:11,color:C.text3,marginTop:4}}>Video · PDF · Quiz · Flashcard</div>
            </div>
            <SLabel>Send Via</SLabel>
            <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              {["📱 ULIP App","📱 WhatsApp","💬 Teams","📧 Email"].map(ch=>(
                <div key={ch} onClick={()=>toggleCh(ch)} style={{padding:"9px 16px",borderRadius:9,border:`1.5px solid ${channels.includes(ch)?C.blue:C.border}`,background:channels.includes(ch)?C.blue3:C.bg,color:channels.includes(ch)?C.blue:C.text2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{ch}{channels.includes(ch)&&" ✓"}</div>
              ))}
            </div>
            <SLabel>Target Audience</SLabel>
            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <select style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.text,outline:"none"}}>
                <option value="">Select Group / Dept…</option>
                {DEPT_FILTERS.map(d=><option key={d}>{d}</option>)}
              </select>
              <select style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.text,outline:"none"}}>
                <option value="">Select Level…</option>
                {LEVEL_FILTERS.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <textarea placeholder="Write your microlearning message or add context…" style={{width:"100%",padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,resize:"vertical",minHeight:80,outline:"none",marginBottom:14}}/>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="fill" color={C.blue} style={{flex:1,padding:"11px"}}>⚡ Send Now</Btn>
              <Btn color={C.blue} style={{flex:1,padding:"11px"}}>⏰ Schedule</Btn>
            </div>
          </Card>
          <Card>
            <SLabel>AI Auto-Nudge Engine</SLabel>
            <div style={{padding:"14px 16px",background:`linear-gradient(135deg,${C.blue}15,${C.blue3})`,borderRadius:12,marginBottom:16,border:`1px solid ${C.blue4}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:`0 0 6px ${C.green}`}}/>
                <span style={{fontSize:13,fontWeight:700,color:C.blue}}>AI Auto-Nudge is ACTIVE</span>
              </div>
              <div style={{fontSize:11,color:C.text2}}>Sending ~340 microlearning nudges/week across all channels automatically</div>
            </div>
            <SLabel>Auto-triggers configured</SLabel>
            {["Pending / overdue trainings","Newly assigned content","Fresh content matching skill area","Upcoming cert. expiry (30 days)","Post-training feedback requests","Leaderboard milestone alerts","Goal deadline approaching","Streak at risk (2 days inactive)"].map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<7?`1px solid ${C.border}`:"none"}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:C.green,flexShrink:0}}/>
                <span style={{fontSize:12,color:C.text}}>{item}</span>
                <span style={{marginLeft:"auto",fontSize:10,color:C.text3,background:C.bg,padding:"2px 8px",borderRadius:10,border:`1px solid ${C.border}`}}>Active</span>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── MY MICROLEARNINGS LIST ── */}
      {microTab==="list" && !selectedMicro && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>Your Created Microlearnings ({EXISTING_MICROS.length})</div>
            <Btn variant="fill" color={C.blue} style={{fontSize:12}}>+ Create New Microlearning</Btn>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {EXISTING_MICROS.map((m,i)=>(
              <div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 20px",boxShadow:"0 1px 4px #0080C710"}}>
                <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
                  <div style={{width:48,height:48,borderRadius:12,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>⚡</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.text,cursor:"pointer"}} onClick={()=>setSelectedMicro(m)}>{m.title}</div>
                      <span style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,background:`${STATUS_COLOR[m.status]}18`,color:STATUS_COLOR[m.status],border:`1px solid ${STATUS_COLOR[m.status]}40`}}>{m.status}</span>
                      <Bdg label={m.topic} color={C.blue}/>
                      <Bdg label={`⏱ ${m.duration}`} color={C.text3}/>
                    </div>
                    <div style={{display:"flex",gap:14,fontSize:11,color:C.text3,marginBottom:8,flexWrap:"wrap"}}>
                      <span>📅 Created {m.created}</span>
                      <span>📤 Last sent {m.lastSent}</span>
                      <span>👥 {m.sent} recipients</span>
                      <span>🌐 {m.groups.join(", ")}</span>
                      <span>📡 {m.channels.join(" · ")}</span>
                    </div>
                    <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.blue}10`}}>
                        <div style={{fontSize:10,color:C.text3}}>Open Rate</div>
                        <div style={{fontSize:12,fontWeight:700,color:C.blue}}>{m.openRate}%</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:8,background:`${C.green}10`}}>
                        <div style={{fontSize:10,color:C.text3}}>Success</div>
                        <div style={{fontSize:12,fontWeight:700,color:C.green}}>{m.successRate}%</div>
                      </div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    <button onClick={()=>setSelectedMicro(m)} style={{padding:"7px 14px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,color:C.text2,fontSize:11,cursor:"pointer",fontWeight:600}}>👁 View</button>
                    <button style={{padding:"7px 14px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,color:C.blue,fontSize:11,cursor:"pointer",fontWeight:600}}>✏ Edit</button>
                    <button style={{padding:"7px 14px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,color:C.accent,fontSize:11,cursor:"pointer",fontWeight:600}}>📋 Copy</button>
                    <button style={{padding:"7px 14px",borderRadius:9,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:"#fff",fontSize:11,cursor:"pointer",fontWeight:600}}>🔁 Republish</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MICROLEARNING DETAIL DRILLDOWN ── */}
      {microTab==="list" && selectedMicro && (
        <div>
          <button onClick={()=>setSelectedMicro(null)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,color:C.text2,fontSize:12,cursor:"pointer",marginBottom:16}}>← Back to List</button>
          <Card style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:16}}>
              <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${C.blue}20,${C.blue3})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0}}>⚡</div>
              <div style={{flex:1}}>
                <div style={{fontSize:18,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",marginBottom:6}}>{selectedMicro.title}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <Bdg label={selectedMicro.topic} color={C.blue}/>
                  <Bdg label={`⏱ ${selectedMicro.duration}`} color={C.text3}/>
                  <span style={{padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:`${STATUS_COLOR[selectedMicro.status]}18`,color:STATUS_COLOR[selectedMicro.status],border:`1px solid ${STATUS_COLOR[selectedMicro.status]}40`}}>{selectedMicro.status}</span>
                  <Bdg label={`Created ${selectedMicro.created}`} color={C.text3}/>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <Btn color={C.blue} style={{fontSize:12}}>✏ Edit</Btn>
                <Btn color={C.accent} style={{fontSize:12}}>📋 Copy</Btn>
                <Btn variant="fill" color={C.blue} style={{fontSize:12}}>🔁 Republish</Btn>
              </div>
            </div>
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
            {[{l:"Total Recipients",v:selectedMicro.sent,c:C.blue},{l:"Open Rate",v:`${selectedMicro.openRate}%`,c:C.blue},{l:"Success Rate",v:`${selectedMicro.successRate}%`,c:C.green},{l:"Last Sent",v:selectedMicro.lastSent,c:C.text2}].map((s,i)=>(
              <Card key={i} pad={16} style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
                <div style={{fontSize:10,color:C.text3,marginTop:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
              </Card>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <Card>
              <SLabel>Sent to Groups</SLabel>
              {selectedMicro.groups.map((g,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,background:C.bg,marginBottom:6}}>
                  <span style={{fontSize:16}}>👥</span>
                  <span style={{fontSize:13,color:C.text,fontWeight:600}}>{g}</span>
                </div>
              ))}
              <SLabel style={{marginTop:12}}>Delivery Channels</SLabel>
              {selectedMicro.channels.map((ch,i)=>{
                const icons={"WhatsApp":"📱","Teams":"💬","Email":"📧","ULIP App":"🔔"};
                return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,background:C.bg,marginBottom:6}}>
                    <span style={{fontSize:16}}>{icons[ch]||"📡"}</span>
                    <span style={{fontSize:13,color:C.text,fontWeight:600}}>{ch}</span>
                    <span style={{marginLeft:"auto",fontSize:10,color:C.green,fontWeight:600}}>Active</span>
                  </div>
                );
              })}
            </Card>
            <Card>
              <SLabel>Engagement Breakdown</SLabel>
              {[{l:"Sent",v:selectedMicro.sent,pct:100,c:C.blue},{l:"Opened",v:Math.round(selectedMicro.sent*selectedMicro.openRate/100),pct:selectedMicro.openRate,c:C.blue},{l:"Completed",v:Math.round(selectedMicro.sent*selectedMicro.successRate/100),pct:selectedMicro.successRate,c:C.green},{l:"Quiz Passed",v:Math.round(selectedMicro.sent*0.65),pct:65,c:C.accent}].map((s,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                    <span style={{color:C.text}}>{s.l}</span>
                    <span style={{color:s.c,fontWeight:700}}>{s.v} ({s.pct}%)</span>
                  </div>
                  <div style={{height:7,background:C.border,borderRadius:4}}><div style={{height:"100%",borderRadius:4,width:`${s.pct}%`,background:`linear-gradient(90deg,${s.c},${s.c}99)`}}/></div>
                </div>
              ))}
              <SLabel style={{marginTop:14}}>Interaction History</SLabel>
              {[{date:"May 18",event:"Republished to Operations TSJ",icon:"🔁"},{date:"May 05",event:"Sent to TQM Dept (142 members)",icon:"📤"},{date:"Apr 20",event:"Quiz added & redeployed",icon:"➕"},{date:"Apr 15",event:"Originally created & published",icon:"✅"}].map((ev,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
                  <span style={{fontSize:14}}>{ev.icon}</span>
                  <div style={{flex:1}}><div style={{fontSize:12,color:C.text}}>{ev.event}</div><div style={{fontSize:10,color:C.text3}}>{ev.date}</div></div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {/* ── QUIZ BUILDER ── */}
      {microTab==="quiz" && (
        <div>
          {/* AI Prompt */}
          <Card style={{marginBottom:16}}>
            <SLabel>🤖 AI Question Generator</SLabel>
            <div style={{display:"flex",gap:10}}>
              <input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
                placeholder="Describe the kind of micro assessment you want… e.g. '3 MCQs on TPM Autonomous Maintenance steps, difficulty: medium'"
                style={{flex:1,padding:"11px 16px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,color:C.text,outline:"none"}}/>
              <button onClick={()=>{setAiGenerated(true);}} style={{padding:"11px 22px",borderRadius:10,background:C.blue,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>✦ Generate</button>
            </div>
            {aiGenerated && (
              <div style={{marginTop:12,padding:"12px 14px",background:`${C.green}10`,border:`1px solid ${C.green}30`,borderRadius:10,fontSize:12,color:C.green,fontWeight:600}}>
                ✓ AI generated 3 MCQ questions on Autonomous Maintenance. Scroll down to review & edit them.
              </div>
            )}
          </Card>

          {/* Question Type Selector */}
          <Card style={{marginBottom:16}}>
            <SLabel>Choose Question Type</SLabel>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {QUIZ_TYPES.map(qt=>(
                <div key={qt.id} onClick={()=>setQuizType(qt.id)} style={{padding:"16px 14px",borderRadius:12,border:`2px solid ${quizType===qt.id?C.blue:C.border}`,background:quizType===qt.id?C.blue3:C.bg,cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}>
                  <div style={{fontSize:26,marginBottom:8}}>{qt.icon}</div>
                  <div style={{fontSize:12,fontWeight:700,color:quizType===qt.id?C.blue:C.text,marginBottom:4}}>{qt.label}</div>
                  <div style={{fontSize:10,color:C.text3,lineHeight:1.4}}>{qt.desc}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* MCQ Builder */}
          {(quizType==="mcq"||quizType==="multi"||aiGenerated) && (
            <Card style={{marginBottom:16}}>
              <SLabel>{quizType==="multi"?"Multi-Select Question Builder":"MCQ Question Builder"}</SLabel>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:6}}>Question Text</div>
                <textarea defaultValue={aiGenerated?"Which step of Autonomous Maintenance involves operators creating cleaning, lubrication & inspection standards?":""} placeholder="Type your question here…" style={{width:"100%",minHeight:70,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,color:C.text,resize:"vertical",outline:"none"}}/>
              </div>
              <SLabel>Answer Options</SLabel>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
                {(aiGenerated?["Step 1 – Initial Cleaning","Step 3 – Set Cleaning & Lubrication Standards","Step 5 – Autonomous Inspection","Step 7 – Full Autonomous Management"]:mcqOptions).map((opt,i)=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",background:C.blue3,border:`1px solid ${C.blue4}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.blue,flexShrink:0}}>{["A","B","C","D"][i]}</div>
                    <input defaultValue={opt} placeholder={`Option ${["A","B","C","D"][i]}…`} style={{flex:1,padding:"9px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,outline:"none"}}/>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <input type={quizType==="multi"?"checkbox":"radio"} name="correct" style={{accentColor:C.green,width:16,height:16,cursor:"pointer"}}/>
                      <span style={{fontSize:11,color:C.text3}}>Correct</span>
                    </div>
                  </div>
                ))}
                <button style={{padding:"8px 14px",borderRadius:9,border:`1.5px dashed ${C.blue}`,background:C.blue3,color:C.blue,fontSize:12,fontWeight:600,cursor:"pointer",marginTop:4}}>+ Add Option</button>
              </div>
              {/* AI recommended options */}
              <div style={{padding:"12px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}30`,borderRadius:10,marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:700,color:C.accent,marginBottom:8}}>🤖 AI Recommended Options</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {["Add a 'None of the above' option","Add an image illustration","Randomise option order","Set time limit: 30 sec"].map(s=>(
                    <div key={s} style={{padding:"5px 12px",borderRadius:20,background:`${C.accent}12`,color:C.accent,fontSize:11,cursor:"pointer",border:`1px solid ${C.accent}30`,fontWeight:600}}>{s}</div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Word Answer Builder */}
          {quizType==="word" && (
            <Card style={{marginBottom:16}}>
              <SLabel>Short Answer Question Builder</SLabel>
              <textarea placeholder="Type your question here… e.g. 'Name the 3 pillars of TPM in your own words.'" style={{width:"100%",minHeight:70,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,color:C.text,resize:"vertical",outline:"none",marginBottom:12}}/>
              <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:6}}>Accepted Keywords (for auto-grading)</div>
              <input placeholder="e.g. autonomous, planned, quality (comma separated)" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,outline:"none",marginBottom:12}}/>
              <div style={{padding:"10px 14px",background:C.blue3,borderRadius:9,fontSize:11,color:C.blue}}>💡 TDA will auto-match answers containing these keywords and mark as correct</div>
            </Card>
          )}

          {/* Image Question Builder */}
          {quizType==="image" && (
            <Card style={{marginBottom:16}}>
              <SLabel>Image-Based Question Builder</SLabel>
              <div style={{border:`2px dashed ${C.blue4}`,borderRadius:10,padding:"20px",textAlign:"center",background:C.blue3,marginBottom:12,cursor:"pointer"}}>
                <div style={{fontSize:28,marginBottom:6}}>🖼</div>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>Upload Question Image</div>
                <div style={{fontSize:11,color:C.text3,marginTop:4}}>JPG · PNG · GIF · SVG</div>
              </div>
              {/* AI image suggestions */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>🤖 AI Recommended Images</div>
                <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4}}>
                  {["Control Chart diagram","5S workplace illustration","TPM pillar graphic","Conveyor system photo"].map((img,i)=>(
                    <div key={i} style={{flexShrink:0,width:100,height:70,borderRadius:10,background:`linear-gradient(135deg,${[C.blue,C.green,C.accent,"#9B59B6"][i]}20,${C.bg})`,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,color:C.text2,textAlign:"center",cursor:"pointer",padding:6,lineHeight:1.3}}>
                      {img}
                    </div>
                  ))}
                </div>
              </div>
              <textarea placeholder="Type your question about the image above…" style={{width:"100%",minHeight:70,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,color:C.text,resize:"vertical",outline:"none",marginBottom:12}}/>
            </Card>
          )}

          {/* AI question suggestions */}
          {(quizType||aiGenerated) && (
            <Card style={{marginBottom:16}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <SLabel style={{marginBottom:0}}>🤖 AI Recommended Questions</SLabel>
                <Bdg label="Based on TPM content" color={C.blue}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {["What does OEE stand for and what are its three components?","In Autonomous Maintenance, what is the purpose of 'initial cleaning'?","Which of the following is NOT a pillar of TPM?","How many steps are in the standard AM journey?"].map((q,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer"}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:C.blue3,color:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</div>
                    <span style={{flex:1,fontSize:12,color:C.text,lineHeight:1.4}}>{q}</span>
                    <button style={{padding:"4px 12px",borderRadius:8,border:`1px solid ${C.blue}`,background:"transparent",color:C.blue,fontSize:11,cursor:"pointer",fontWeight:600,flexShrink:0}}>+ Use</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {(quizType||aiGenerated) && (
            <div style={{display:"flex",gap:10}}>
              <Btn variant="fill" color={C.blue} style={{flex:1,padding:"12px",fontSize:13}}>💾 Save Question</Btn>
              <Btn color={C.green} style={{flex:1,padding:"12px",fontSize:13}}>+ Add Another Question</Btn>
              <Btn color={C.accent} style={{flex:1,padding:"12px",fontSize:13}}>📤 Attach to Microlearning & Send</Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── LIVE WORK UPDATES COMPONENT ─────────────────────────────────────────────
const PRIORITY_COLORS = { Critical:C.red, High:"#FF6B35", Medium:C.accent, Low:C.green };
const STATUS_COLORS   = { Open:C.red, Active:C.accent, Resolved:C.green };
const TYPE_ICONS      = { Maintenance:"🔧", "Safety Shutdown":"🛑", Inspection:"🔍", Electrical:"⚡", "Fire Permit":"🔥", "Confined Space":"⛔" };

function LiveWorkUpdates() {
  const [selected, setSelected] = useState(null);
  const [assignModal, setAssignModal] = useState(null);
  const [assigned, setAssigned] = useState({});

  return (
    <div>
      {/* Assign Learning Modal */}
      {assignModal && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:C.white,borderRadius:18,width:480,padding:28,boxShadow:"0 24px 80px rgba(0,0,0,0.35)"}}>
            <div style={{fontSize:16,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",marginBottom:6}}>Assign Learning</div>
            <div style={{fontSize:12,color:C.text3,marginBottom:18}}>WO: {assignModal.id} · {assignModal.equipment}</div>
            <SLabel>AI-Tagged Skills for this Work Order</SLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
              {assignModal.skills.map(s=><Bdg key={s} label={s} color={C.blue}/>)}
            </div>
            <SLabel>Assign Microlearning To</SLabel>
            <div style={{display:"flex",gap:10,marginBottom:18}}>
              {[{l:"All permit holders",v:"all"},{l:"Assignees with skill gap",v:"gap"},{l:"Specific team",v:"team"}].map(opt=>(
                <div key={opt.v} style={{flex:1,padding:"10px 12px",borderRadius:10,border:`2px solid ${C.border}`,background:C.bg,cursor:"pointer",textAlign:"center",fontSize:12,fontWeight:600,color:C.text2}}>{opt.l}</div>
              ))}
            </div>
            <SLabel>Delivery Channel</SLabel>
            <div style={{display:"flex",gap:8,marginBottom:18}}>
              {["📱 WhatsApp","💬 Teams","📧 Email"].map(ch=>(
                <div key={ch} style={{padding:"8px 14px",borderRadius:9,border:`1.5px solid ${C.blue}`,background:C.blue3,color:C.blue,fontSize:12,fontWeight:600,cursor:"pointer"}}>{ch}</div>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <Btn variant="fill" color={C.blue} style={{flex:1}} onClick={()=>{setAssigned(p=>({...p,[assignModal.id]:true}));setAssignModal(null);}}>✅ Assign & Send</Btn>
              <Btn onClick={()=>setAssignModal(null)} style={{flex:1}}>Cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Work Order Detail Modal */}
      {selected && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"flex-end",backdropFilter:"blur(4px)"}}>
          <div style={{background:C.white,width:"52%",height:"100vh",overflowY:"auto",boxShadow:"-8px 0 40px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column"}}>
            <div style={{background:`linear-gradient(135deg,#003D6B,${C.blue})`,padding:"22px 26px",flexShrink:0}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                <div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:4}}>{selected.type} · {selected.permit}</div>
                  <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"'Playfair Display',serif"}}>{selected.equipment}</div>
                </div>
                <button onClick={()=>setSelected(null)} style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:18,cursor:"pointer"}}>×</button>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <span style={{padding:"3px 10px",borderRadius:20,background:`${PRIORITY_COLORS[selected.priority]}30`,color:"#fff",fontSize:11,fontWeight:700,border:`1px solid rgba(255,255,255,0.3)`}}>{selected.priority} Priority</span>
                <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:11}}>{selected.dept}</span>
                <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:11}}>Raised {selected.raised}</span>
              </div>
            </div>
            <div style={{flex:1,padding:"22px 26px",overflowY:"auto"}}>
              {/* AI Skill Tagging */}
              <Card style={{marginBottom:16,border:`1.5px solid ${C.blue4}`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:18}}>🤖</span>
                  <div style={{fontSize:13,fontWeight:700,color:C.blue}}>AI-Generated Skill Tags</div>
                  <Bdg label="Auto-tagged by TDA" color={C.blue}/>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
                  {selected.skills.map(s=>(
                    <div key={s} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:10,background:C.blue3,border:`1px solid ${C.blue4}`}}>
                      <span style={{fontSize:16}}>🏷</span>
                      <span style={{fontSize:12,fontWeight:700,color:C.blue}}>{s}</span>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:11,color:C.text3}}>TDA analysed the work order description and permit requirements to auto-tag relevant skills for targeted microlearning delivery.</div>
              </Card>

              {/* AI Microlearning */}
              <Card style={{marginBottom:16,border:`1.5px solid ${C.accent}40`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <span style={{fontSize:18}}>⚡</span>
                  <div style={{fontSize:13,fontWeight:700,color:C.text}}>AI-Generated Microlearning</div>
                  <Bdg label="Auto-created" color={C.accent}/>
                </div>
                <div style={{background:`linear-gradient(135deg,#003D6B,${C.blue})`,borderRadius:12,padding:"16px 18px",marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>⚡ Auto-generated microlearning</div>
                  <div style={{fontSize:15,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif",marginBottom:6}}>
                    {selected.skills[0]} — Safety Brief for {selected.type}
                  </div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",lineHeight:1.6,marginBottom:10}}>
                    TDA auto-generated a 2-minute safety and procedure brief covering the critical steps, hazards and skill requirements for this work order type.
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(245,166,35,0.25)",color:"#FFD166",fontSize:10,fontWeight:600}}>⏱ 2 min</span>
                    <span style={{padding:"3px 10px",borderRadius:20,background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:10}}>Auto-sent on WO creation</span>
                  </div>
                </div>
                {/* Engagement */}
                {selected.engagementPct>0 ? (
                  <div>
                    <SLabel>WhatsApp Delivery Engagement</SLabel>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:10}}>
                      {[{l:"Sent",v:"All permit holders",c:C.blue},{l:"Opened",v:`${selected.engagementPct}%`,c:C.blue},{l:"Completed",v:`${Math.round(selected.engagementPct*0.82)}%`,c:C.green}].map((s,i)=>(
                        <div key={i} style={{background:C.bg,borderRadius:9,padding:"10px 12px",textAlign:"center"}}>
                          <div style={{fontSize:16,fontWeight:800,color:s.c}}>{s.v}</div>
                          <div style={{fontSize:9,color:C.text3,textTransform:"uppercase",marginTop:3}}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{height:8,background:C.border,borderRadius:4,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${selected.engagementPct}%`,background:`linear-gradient(90deg,${C.green},#5EE8B5)`,transition:"width 0.5s"}}/>
                    </div>
                  </div>
                ) : (
                  <div style={{padding:"10px 14px",background:`${C.accent}10`,borderRadius:9,fontSize:12,color:C.accent,fontWeight:600}}>
                    ⏳ Microlearning sent on WO creation — engagement tracking will appear here shortly
                  </div>
                )}
              </Card>

              {/* Skill Gaps */}
              <Card style={{marginBottom:16}}>
                <SLabel>Identified Skill Gaps — Permit Holders</SLabel>
                {selected.skills.map((sk,i)=>{
                  const gap = SKILL_GAPS.find(g=>g.skill.toLowerCase().includes(sk.toLowerCase().split(" ")[0]));
                  return gap ? (
                    <div key={i} style={{marginBottom:12,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                        <span style={{fontWeight:600,color:C.text}}>{gap.skill}</span>
                        <span style={{color:gap.current>=gap.required?C.green:C.red,fontWeight:700}}>{gap.current}% / {gap.required}%</span>
                      </div>
                      <div style={{height:6,background:C.border,borderRadius:3}}>
                        <div style={{height:"100%",borderRadius:3,width:`${gap.current}%`,background:`linear-gradient(90deg,${C.blue},#7B97F8)`}}/>
                      </div>
                      <div style={{fontSize:10,color:C.text3,marginTop:4}}>Gap: {gap.required-gap.current}% · 3 employees affected</div>
                    </div>
                  ) : null;
                })}
              </Card>

              <Btn variant="fill" color={C.blue} style={{width:"100%",padding:"12px",fontSize:13}} onClick={()=>{setSelected(null);setAssignModal(selected);}}>
                📚 Assign Learning to Affected Employees
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Header stats */}
      <div style={{background:`linear-gradient(135deg,#003D6B,${C.blue})`,borderRadius:14,padding:"18px 22px",marginBottom:20,display:"flex",alignItems:"center",gap:20}}>
        <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🏭</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:"#fff",fontFamily:"'Playfair Display',serif"}}>Live Work Updates — Shopfloor</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.8)",marginTop:2}}>AI auto-tags skills from work orders and generates microlearning for permit holders via WhatsApp</div>
        </div>
        {[{v:"6",l:"Active Work Orders"},{v:"3",l:"Micros Auto-Sent"},{v:"74%",l:"Avg Engagement"}].map((s,i)=>(
          <div key={i} style={{textAlign:"center",background:"rgba(255,255,255,0.14)",borderRadius:10,padding:"8px 16px"}}>
            <div style={{fontSize:18,fontWeight:800,color:"#FFD166"}}>{s.v}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.7)",textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Work Orders List */}
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {WORK_ORDERS.map((wo,i)=>(
          <div key={i} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,128,199,0.08)"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:14}}>
              <div style={{width:46,height:46,borderRadius:12,background:`${PRIORITY_COLORS[wo.priority]||C.accent}15`,border:`1.5px solid ${PRIORITY_COLORS[wo.priority]||C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                {TYPE_ICONS[wo.type]||"📋"}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                  <span style={{fontSize:11,color:C.text3,fontFamily:"monospace"}}>{wo.id}</span>
                  <span style={{padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700,background:`${PRIORITY_COLORS[wo.priority]}18`,color:PRIORITY_COLORS[wo.priority],border:`1px solid ${PRIORITY_COLORS[wo.priority]}30`}}>{wo.priority}</span>
                  <span style={{padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:700,background:`${STATUS_COLORS[wo.status]}18`,color:STATUS_COLORS[wo.status],border:`1px solid ${STATUS_COLORS[wo.status]}30`}}>{wo.status}</span>
                  <span style={{fontSize:10,color:C.text3}}>{wo.type} · Raised {wo.raised}</span>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>{wo.equipment}</div>
                <div style={{fontSize:11,color:C.text3,marginBottom:8}}>{wo.dept} · {wo.permit}</div>
                {/* AI skill tags */}
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                  <span style={{fontSize:9,color:C.blue,fontWeight:700,textTransform:"uppercase",marginRight:4}}>🤖 AI tags:</span>
                  {wo.skills.map(s=><Bdg key={s} label={s} color={C.blue}/>)}
                </div>
                {/* Engagement bar */}
                {wo.engagementPct>0 && (
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:10,color:C.text3,whiteSpace:"nowrap"}}>📱 Micro engagement:</span>
                    <div style={{flex:1,height:5,background:C.border,borderRadius:3,maxWidth:160}}>
                      <div style={{height:"100%",borderRadius:3,width:`${wo.engagementPct}%`,background:`linear-gradient(90deg,${wo.engagementPct>=75?C.green:wo.engagementPct>=50?C.accent:C.red},${C.blue})`}}/>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:wo.engagementPct>=75?C.green:wo.engagementPct>=50?C.accent:C.red}}>{wo.engagementPct}%</span>
                  </div>
                )}
                {wo.engagementPct===0 && <span style={{fontSize:10,color:C.text3}}>⏳ Microlearning just sent — tracking pending</span>}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
                <button onClick={()=>setSelected(wo)} style={{padding:"8px 16px",borderRadius:9,border:`1px solid ${C.border}`,background:C.bg,color:C.blue,fontSize:11,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>🔍 View Details</button>
                <button onClick={()=>setAssignModal(wo)} style={{padding:"8px 16px",borderRadius:9,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:"#fff",fontSize:11,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"}}>{assigned[wo.id]?"✅ Assigned":"📚 Assign Learning"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROGRAM DIRECTOR ─────────────────────────────────────────────────────────
function ProgramDirector() {
  const [tab,setTab]=useState("skillgap");
  const [deptF,setDeptF]=useState("");const[levelF,setLevelF]=useState("");const[mgr,setMgr]=useState("");
  const [genState,setGenState]=useState({});
  const [bookTab,setBookTab]=useState("audience");
  const [bizUnit,setBizUnit]=useState("");const[levelType,setLevelType]=useState("OPRs");const[levelVal,setLevelVal]=useState("");
  const [channels,setChannels]=useState([]);
  const [campaignName,setCampaignName]=useState("");

  const simulate=k=>{setGenState(p=>({...p,[k]:"loading"}));setTimeout(()=>setGenState(p=>({...p,[k]:"done"})),1800);};
  const GenBtn=({k,label})=>(
    <button onClick={()=>simulate(k)} style={{padding:"7px 14px",borderRadius:9,border:"none",cursor:"pointer",background:genState[k]==="done"?C.green:genState[k]==="loading"?C.border:C.blue,color:genState[k]==="done"||genState[k]==="loading"?C.text:"#fff",fontSize:11,fontWeight:600,transition:"all 0.3s"}}>
      {genState[k]==="done"?"✓ Done!":genState[k]==="loading"?"⟳…":label}
    </button>
  );
  const toggleCh=c=>setChannels(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  const hasFilter=deptF||levelF;
  const gapData=SKILL_GAP_DATA[deptF]||[];
  const SENT_DATA=[{month:"Jan",v:62},{month:"Feb",v:71},{month:"Mar",v:68},{month:"Apr",v:80},{month:"May",v:76}];
  const maxV=Math.max(...SENT_DATA.map(d=>d.v));

  const PROG_TABS=[
    {id:"skillgap",    label:"📊 Skill Gap Analysis",      icon:"📊"},
    {id:"sentiment",   label:"📈 Sentiment & Effectiveness",icon:"📈"},
    {id:"trainings",   label:"📋 Past Trainings",           icon:"📋"},
    {id:"content",     label:"✨ AI Content Creator",        icon:"✨"},
    {id:"micro",       label:"⚡ Microlearning Engine",      icon:"⚡"},
    {id:"liveWork",    label:"🏭 Live Work Updates",         icon:"🏭"},
    {id:"scenario",    label:"🎭 Scenario & Simulation",     icon:"🎭"},
    {id:"gamified",    label:"🎮 Gamified Creator",          icon:"🎮"},
    {id:"casestudy",   label:"⚡ Case Study / Incident",     icon:"⚡"},
    {id:"book",        label:"📅 Book Training",             icon:"📅"},
    {id:"calendar",    label:"🗓 Training Calendar",         icon:"🗓"},
    {id:"dashboard",   label:"📊 Training Dashboard",        icon:"📊"},
    {id:"insights",    label:"🧠 AI Insights",               icon:"🧠"},
    {id:"requests",    label:"📥 Requested Trainings",       icon:"📥"},
    {id:"programs",    label:"🟢 Active Programs",           icon:"🟢"},
    {id:"campaign",    label:"📣 Create Campaign",           icon:"📣"},
  ];

  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{width:40,height:40,borderRadius:10,background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#fff"}}>✦</div>
        <div>
          <h2 style={{fontSize:20,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Program Director</h2>
          <div style={{fontSize:12,color:C.text3}}>Trainer-only · AI-powered content, analytics & program management</div>
        </div>
        <Bdg label="🔒 Trainer Access" color={C.blue2}/>
      </div>

      {/* Tab Scroll */}
      <div style={{display:"flex",gap:8,marginBottom:24,borderBottom:`1px solid ${C.border}`,paddingBottom:14,overflowX:"auto"}}>
        {PROG_TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"10px 18px",borderRadius:10,
            border:`1.5px solid ${tab===t.id?C.blue:C.border}`,
            background:tab===t.id?C.blue:C.white,
            color:tab===t.id?"#fff":C.text2,
            fontSize:12,fontWeight:600,cursor:"pointer",
            whiteSpace:"nowrap",flexShrink:0,
            boxShadow:tab===t.id?`0 2px 8px ${C.blue}30`:"none",
            transition:"all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── SKILL GAP ── */}
      {tab==="skillgap"&&(
        <div>
          <Card style={{marginBottom:16}}>
            <SLabel>Filters</SLabel>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Select value={deptF} onChange={setDeptF} options={DEPT_FILTERS} placeholder="Select Department…" style={{minWidth:220}}/>
              <Select value={mgr} onChange={setMgr} options={["Mgr. K. Nair","Mgr. A. Patel","Mgr. S. Gupta","Mgr. R. Sharma"]} placeholder="Select Reporting Manager…" style={{minWidth:200}}/>
              <Select value={levelF} onChange={setLevelF} options={LEVEL_FILTERS} placeholder="Seniority Level…" style={{minWidth:160}}/>
              {(deptF||levelF||mgr)&&<Btn onClick={()=>{setDeptF("");setLevelF("");setMgr("");}}>Clear</Btn>}
            </div>
          </Card>
          <Card>
            {!hasFilter?(
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <div style={{fontSize:48,marginBottom:16}}>📊</div>
                <div style={{fontSize:16,fontWeight:700,color:C.text}}>Please select filters to view skill gap analysis</div>
                <div style={{fontSize:13,color:C.text3,marginTop:8}}>Choose department and/or seniority level to generate the chart</div>
              </div>
            ):(
              <div>
                <SLabel>Skill Gap — {deptF} {levelF?`· ${levelF}`:""}</SLabel>
                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
                  {gapData.map((d,i)=>(
                    <div key={i}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                        <span style={{fontWeight:600,color:C.text}}>{d.skill}</span>
                        <span style={{color:d.gap>=40?C.red:d.gap>=25?C.accent:C.green,fontWeight:700}}>Gap: {d.gap}%</span>
                      </div>
                      <div style={{height:22,background:C.bg,borderRadius:6,position:"relative",overflow:"hidden"}}>
                        <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${100-d.gap}%`,background:`linear-gradient(90deg,${C.green},#5EE8B5)`,borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8}}>
                          <span style={{fontSize:9,fontWeight:700,color:"#fff"}}>{100-d.gap}% achieved</span>
                        </div>
                        <div style={{position:"absolute",right:0,top:0,bottom:0,width:`${d.gap}%`,background:`${d.gap>=40?C.red:d.gap>=25?C.accent:C.green}30`,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
                          <span style={{fontSize:9,fontWeight:700,color:d.gap>=40?C.red:d.gap>=25?C.accent:C.green}}>{d.gap}% gap</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                  {[{l:"Avg Gap",v:`${Math.round(gapData.reduce((a,d)=>a+d.gap,0)/gapData.length)}%`,c:C.red},{l:"Critical Gaps (>40%)",v:`${gapData.filter(d=>d.gap>40).length}`,c:C.red},{l:"Dept Employees",v:"148",c:C.accent}].map((s,i)=>(
                    <div key={i} style={{background:C.bg,borderRadius:10,padding:"12px 14px",textAlign:"center"}}>
                      <div style={{fontSize:20,fontWeight:800,color:s.c}}>{s.v}</div>
                      <div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:4}}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ── SENTIMENT ── */}
      {tab==="sentiment"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card>
            <SLabel>Microlearning Engagement Trend</SLabel>
            <div style={{display:"flex",alignItems:"flex-end",gap:10,height:160,paddingTop:10}}>
              {SENT_DATA.map((d,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                  <div style={{fontSize:10,color:C.blue,fontWeight:700}}>{d.v}%</div>
                  <div style={{width:"100%",borderRadius:"4px 4px 0 0",background:`linear-gradient(180deg,${C.blue},${C.blue2})`,height:`${(d.v/maxV)*120}px`,transition:"height 0.5s"}}/>
                  <div style={{fontSize:10,color:C.text3}}>{d.month}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,padding:"10px 14px",background:C.blue3,borderRadius:10,fontSize:12,color:C.blue,fontWeight:600}}>📈 Engagement up 18% vs last quarter</div>
          </Card>
          <Card>
            <SLabel>Effectiveness Breakdown</SLabel>
            {[{label:"Completion Rate",v:74,c:C.green},{label:"Knowledge Retention",v:62,c:C.blue},{label:"Learner Satisfaction",v:88,c:C.accent},{label:"On-the-job Application",v:55,c:"#9B59B6"}].map((m,i)=>(
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:C.text}}>{m.label}</span><span style={{color:m.c,fontWeight:700}}>{m.v}%</span></div>
                <div style={{height:7,background:C.border,borderRadius:4}}><div style={{height:"100%",borderRadius:4,width:`${m.v}%`,background:m.c}}/></div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── PAST TRAININGS ── */}
      {tab==="trainings"&&(
        <Card>
          <SLabel>Past Trainings — Revision Actions</SLabel>
          {CREATED_TRAININGS.map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 0",borderBottom:i<CREATED_TRAININGS.length-1?`1px solid ${C.border}`:"none",flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>{t.title}</div>
                <div style={{fontSize:11,color:C.text3,marginTop:2}}>{t.type} · {t.date} · {t.participants} participants</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                  <div style={{height:5,background:C.border,borderRadius:3,width:100}}><div style={{height:"100%",borderRadius:3,width:`${t.completion}%`,background:t.completion>=75?C.green:t.completion>=60?C.accent:C.red}}/></div>
                  <span style={{fontSize:11,color:C.text3}}>{t.completion}% completion</span>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0}}>
                <Btn color={C.blue} style={{fontSize:11}}>📤 Send Revision Microlearning</Btn>
                <Btn color={C.accent} style={{fontSize:11}}>📝 Send Revision Assessment</Btn>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ── AI CONTENT CREATOR ── */}
      {tab==="content"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card>
            <SLabel>Upload Source Material</SLabel>
            <div style={{border:`2px dashed ${C.blue4}`,borderRadius:12,padding:"28px 20px",textAlign:"center",marginBottom:16,background:C.blue3}}>
              <div style={{fontSize:32,marginBottom:8}}>📤</div>
              <div style={{fontSize:13,fontWeight:600,color:C.text}}>Drag & drop or click to upload</div>
              <div style={{fontSize:11,color:C.text3,marginTop:4}}>SOP · PDF · PPT · DOC · Video · Excel</div>
            </div>
            <SLabel>What do you want to create?</SLabel>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {["📹 AI Video","📝 Quiz / Assessment","🎓 Full Course","📋 Visual Walkthrough","📑 Microlearning","🎮 Gamified Module"].map(t=>(
                <div key={t} style={{padding:"7px 12px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:12,color:C.text2,cursor:"pointer",background:C.bg}}>{t}</div>
              ))}
            </div>
            <textarea placeholder="Optional: add a prompt to guide AI generation…" style={{width:"100%",padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,color:C.text,resize:"vertical",minHeight:70,outline:"none"}}/>
          </Card>
          <Card>
            <SLabel>Auto-Generate</SLabel>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{k:"video",icon:"🎬",label:"Generate AI Animated Video"},{k:"quiz",icon:"📝",label:"Generate Quiz & Assessment"},{k:"course",icon:"🎓",label:"Build Full Course"},{k:"wt",icon:"🗺",label:"SOP → Visual Walkthrough"},{k:"micro",icon:"⚡",label:"Create Microlearning Snippet"}].map(item=>(
                <div key={item.k} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                  <span style={{fontSize:20}}>{item.icon}</span>
                  <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text}}>{item.label}</span>
                  <GenBtn k={item.k} label="Generate"/>
                </div>
              ))}
            </div>
            <div style={{marginTop:14,display:"flex",gap:10}}>
              <Btn variant="fill" color={C.blue} style={{flex:1}}>✦ Generate All</Btn>
              <Btn style={{flex:1}}>📄 Auto-Create MOI</Btn>
            </div>
          </Card>
        </div>
      )}

      {/* ── LIVE WORK UPDATES ── */}
      {tab==="liveWork"&&<LiveWorkUpdates/>}

      {/* ── SCENARIO ── */}
      {tab==="scenario"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card>
            <SLabel>Choose Scenario Template</SLabel>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
              {[{icon:"🔀",label:"Branch-Based Decision Tree"},{icon:"🏭",label:"Shopfloor Emergency Sim"},{icon:"💬",label:"Dialogue & Negotiation"},{icon:"⚗",label:"Chemical Hazard Scenario"},{icon:"🔧",label:"Equipment Failure Drill"},{icon:"📊",label:"Data-Driven Decision"}].map(t=>(
                <div key={t.label} style={{padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,background:C.bg,cursor:"pointer",display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:18}}>{t.icon}</span><span style={{fontSize:12,fontWeight:600,color:C.text}}>{t.label}</span>
                </div>
              ))}
            </div>
            <Btn variant="fill" color={C.blue} style={{width:"100%"}}>🎭 Build Scenario</Btn>
          </Card>
          <Card>
            <SLabel>Step-by-Step Guide</SLabel>
            {["Upload your SOP or incident report","Choose a scenario template","AI extracts key decision points","Review & customize branches","Add images, videos, or audio","Publish & assign to learners"].map((step,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:13,color:C.text,paddingTop:3}}>{step}</div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── GAMIFIED ── */}
      {tab==="gamified"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Card>
            <SLabel>Choose Game Type</SLabel>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              {[{icon:"⚔",label:"Boss Fight Quiz"},{icon:"🔢",label:"Step Sequencing"},{icon:"🎯",label:"Target Practice"},{icon:"🃏",label:"Flashcard Challenge"},{icon:"🏆",label:"Leaderboard Race"},{icon:"🧩",label:"Puzzle Completion"}].map(g=>(
                <div key={g.label} style={{padding:"12px",borderRadius:10,border:`1.5px solid ${C.border}`,background:C.bg,cursor:"pointer"}}>
                  <div style={{fontSize:22,marginBottom:4}}>{g.icon}</div>
                  <div style={{fontSize:12,fontWeight:600,color:C.text}}>{g.label}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div><SLabel>Difficulty</SLabel><Select value="" onChange={()=>{}} options={["Easy","Medium","Hard","Adaptive"]} placeholder="Select…" style={{width:"100%"}}/></div>
              <div><SLabel>Structure</SLabel><Select value="" onChange={()=>{}} options={["Linear","Branching","Timed","Unlimited"]} placeholder="Select…" style={{width:"100%"}}/></div>
            </div>
            <textarea placeholder="Describe what you want to gamify…" style={{width:"100%",padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,resize:"vertical",minHeight:70,outline:"none",marginBottom:12}}/>
            <Btn variant="fill" color={C.blue} style={{width:"100%"}}>🎮 Generate Gamified Training</Btn>
          </Card>
          <Card>
            <SLabel>Step-by-Step Guide</SLabel>
            {["Choose your game type & difficulty","Upload reference material (SOP, PDF, Video)","Add a prompt describing your learning objective","AI converts content into game mechanics","Preview the game before publishing","Assign to audience & track leaderboard"].map((step,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{i+1}</div>
                <div style={{fontSize:13,color:C.text}}>{step}</div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── CASE STUDY ── */}
      {tab==="casestudy"&&(
        <Card>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <SLabel>Upload Source</SLabel>
              <div style={{border:`2px dashed ${C.blue4}`,borderRadius:10,padding:"24px 20px",textAlign:"center",background:C.blue3,marginBottom:14}}>
                <div style={{fontSize:28,marginBottom:6}}>📁</div>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>Incident Report / Case Study</div>
                <div style={{fontSize:11,color:C.text3,marginTop:4}}>PDF · DOCX · PPT · Video</div>
              </div>
              <SLabel>Type</SLabel>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["⚠ Incident Report","✅ Success Story","📖 Process Challenge","🏆 Best Practice"].map(t=>(
                  <div key={t} style={{padding:"6px 12px",borderRadius:9,border:`1.5px solid ${C.border}`,fontSize:12,color:C.text2,cursor:"pointer",background:C.bg}}>{t}</div>
                ))}
              </div>
            </div>
            <div>
              <SLabel>Generate From This Incident</SLabel>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[{k:"csv",icon:"🎬",label:"AI Video Documentary"},{k:"csq",icon:"📝",label:"Learning Quiz"},{k:"csc",icon:"🎓",label:"Full Case Study Course"},{k:"csg",icon:"🎮",label:"Gamified Scenario"},{k:"csf",icon:"⚡",label:"Flashcard Series"}].map(item=>(
                  <div key={item.k} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                    <span style={{fontSize:18}}>{item.icon}</span>
                    <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text}}>{item.label}</span>
                    <GenBtn k={item.k} label="Generate"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── BOOK TRAINING ── */}
      {tab==="book"&&(
        <Card>
          <div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",marginBottom:16}}>📅 Book a Training</div>
          <div style={{display:"flex",gap:8,marginBottom:18,borderBottom:`1px solid ${C.border}`,paddingBottom:12}}>
            {["audience","location","invite"].map(t=>(
              <button key={t} onClick={()=>setBookTab(t)} style={{padding:"7px 16px",borderRadius:9,border:`1.5px solid ${bookTab===t?C.blue:C.border}`,background:bookTab===t?C.blue:C.white,color:bookTab===t?"#fff":C.text2,fontSize:12,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{t}</button>
            ))}
          </div>
          {bookTab==="audience"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
              <div><SLabel>Business Unit</SLabel><Select value={bizUnit} onChange={setBizUnit} options={BIZ_UNITS} placeholder="Select Business Unit…" style={{width:"100%"}}/></div>
              <div>
                <SLabel>Level Type</SLabel>
                <Select value={levelType} onChange={setLevelType} options={["OPRs","NOPRs"]} style={{width:"100%"}}/>
                <div style={{marginTop:10}}><SLabel>Level</SLabel><Select value={levelVal} onChange={setLevelVal} options={levelType==="OPRs"?OPR_LEVELS:NOPR_LEVELS} placeholder="Select Level…" style={{width:"100%"}}/></div>
              </div>
              <div>
                <SLabel>Search by Keywords</SLabel>
                <input placeholder="Search managers, employees…" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none",marginBottom:10}}/>
                <SLabel>Manager Names</SLabel>
                <input placeholder="Type manager name…" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none"}}/>
              </div>
            </div>
          )}
          {bookTab==="location"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div><SLabel>Training Location</SLabel><Select value="" onChange={()=>{}} options={["Training Centre – Jamshedpur","Innovation Hub – Kalinganagar","Site B – Meramandali","Virtual / Online","Learning Hub – Corporate"]} placeholder="Choose location…" style={{width:"100%"}}/></div>
              <div>
                <SLabel>Date & Time</SLabel>
                <input type="date" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none",marginBottom:10}}/>
                <input type="time" style={{width:"100%",padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none"}}/>
              </div>
            </div>
          )}
          {bookTab==="invite"&&(
            <div>
              <SLabel>Send Invites via</SLabel>
              <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
                {["📧 Email","💬 Teams","📱 WhatsApp","🔔 ULIP App"].map(ch=>(
                  <div key={ch} onClick={()=>toggleCh(ch)} style={{padding:"8px 16px",borderRadius:9,border:`1.5px solid ${channels.includes(ch)?C.blue:C.border}`,background:channels.includes(ch)?C.blue3:C.bg,color:channels.includes(ch)?C.blue:C.text2,fontSize:12,fontWeight:600,cursor:"pointer"}}>{ch}{channels.includes(ch)&&" ✓"}</div>
                ))}
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <Btn variant="fill" color={C.blue}>📨 Send Invite</Btn>
                <Btn color={C.accent}>🔔 Send Reminder</Btn>
                <Btn color={C.green}>📊 Attendance Report</Btn>
                <Btn color={C.blue2}>📝 Upload Attendance</Btn>
                <Btn color={C.blue2}>📋 Upload Assessment Marks</Btn>
                <Btn color={C.text3}>💬 Send Feedback Survey</Btn>
              </div>
              <div style={{marginTop:14,display:"flex",gap:10}}>
                <Btn color={C.blue}>📄 Employee Report</Btn>
                <Btn color={C.blue2}>🏢 Department Report</Btn>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* ── CALENDAR ── */}
      {tab==="calendar"&&(
        <Card>
          <SLabel>Upcoming Trainings You've Scheduled</SLabel>
          {[{date:"May 09",title:"Six Sigma Yellow Belt",audience:"Operations · IL4-IL5",mode:"Blended",registered:34},{date:"May 14",title:"Digital Tools Workshop",audience:"Technology · All",mode:"Online",registered:89},{date:"May 21",title:"Leadership Bootcamp",audience:"OPRs · IL3+",mode:"Classroom",registered:22},{date:"May 28",title:"Hazmat Handling",audience:"Safety · NS5-NS8",mode:"Classroom",registered:47}].map((e,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"90px 1fr auto",gap:16,alignItems:"center",padding:"14px 0",borderBottom:`1px solid ${C.border}`}}>
              <div style={{background:C.blue3,color:C.blue,borderRadius:10,padding:"8px 10px",textAlign:"center",fontWeight:700,fontSize:13}}>{e.date}</div>
              <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{e.title}</div><div style={{fontSize:11,color:C.text3,marginTop:2}}>{e.audience} · {e.mode}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:C.blue}}>{e.registered}</div><div style={{fontSize:10,color:C.text3}}>registered</div></div>
            </div>
          ))}
        </Card>
      )}

      {/* ── DASHBOARD ── */}
      {tab==="dashboard"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
            {[{l:"Trainings Created",v:"18",c:C.blue},{l:"Total Participants",v:"1,240",c:C.green},{l:"Avg Completion",v:"74%",c:C.accent},{l:"Avg Engagement",v:"High",c:"#9B59B6"}].map((s,i)=>(
              <Card key={i} pad={16} style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:800,color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div><div style={{fontSize:10,color:C.text3,marginTop:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div></Card>
            ))}
          </div>
          <Card>
            <SLabel>All Created Trainings</SLabel>
            {CREATED_TRAININGS.map((t,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 80px",gap:8,alignItems:"center",padding:"12px 0",borderBottom:i<CREATED_TRAININGS.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>{t.title}</div>
                <Bdg label={t.type} color={C.blue}/>
                <div style={{fontSize:12,color:C.text2}}>{t.date}</div>
                <div>
                  <div style={{height:6,background:C.border,borderRadius:3,marginBottom:3}}><div style={{height:"100%",borderRadius:3,width:`${t.completion}%`,background:t.completion>=80?C.green:C.blue}}/></div>
                  <div style={{fontSize:10,color:C.text3}}>{t.completion}%</div>
                </div>
                <Btn style={{fontSize:11}}>Leaderboard</Btn>
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ── MICROLEARNING ENGINE ── */}
      {tab==="micro"&&(
        <MicrolearningEngine toggleCh={toggleCh} channels={channels}/>
      )}

      {/* ── AI INSIGHTS ── */}
      {tab==="insights"&&(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
            {[{v:"Data Analytics",l:"Most Searched Skill",i:"🔍",c:C.blue},{v:"Operations TSJ",l:"Top Learning Dept.",i:"🏭",c:C.green},{v:"Gamified Formats",l:"Highest Engagement",i:"🎮",c:C.accent},{v:"↑ 12% this month",l:"Completion Trend",i:"📈",c:"#9B59B6"}].map((s,i)=>(
              <Card key={i} pad={18}><div style={{fontSize:28,marginBottom:8}}>{s.i}</div><div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>{s.l}</div><div style={{fontSize:15,fontWeight:700,color:s.c,marginTop:6}}>{s.v}</div></Card>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <Card>
              <SLabel>Top Searched Skills (30 Days)</SLabel>
              {[["Data Analytics",92],["Process Safety",78],["PLC Programming",65],["Lean Manufacturing",60],["Leadership",54]].map(([s,p],i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:C.text}}>{s}</span><span style={{color:C.blue,fontWeight:600}}>{p} searches</span></div>
                  <div style={{height:6,background:C.border,borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:`${p}%`,background:`linear-gradient(90deg,${C.blue},#7B97F8)`}}/></div>
                </div>
              ))}
            </Card>
            <Card>
              <SLabel>Top Departments by Engagement</SLabel>
              {[["Operations TSJ",88],["Safety, H & S",82],["Technology & R&D",74],["Engineering & Projects",68],["HRM",55]].map(([d,p],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                  <div style={{width:32,height:32,borderRadius:8,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🏭</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600,color:C.text}}>{d}</div>
                    <div style={{height:5,background:C.border,borderRadius:3,marginTop:4}}><div style={{height:"100%",borderRadius:3,width:`${p}%`,background:C.green}}/></div>
                  </div>
                  <div style={{fontSize:13,fontWeight:700,color:C.green}}>{p}%</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {/* ── REQUESTS ── */}
      {tab==="requests"&&(
        <Card>
          <SLabel>Training Requests from Managers</SLabel>
          {REQUESTED_TRAININGS.map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"14px 0",borderBottom:i<REQUESTED_TRAININGS.length-1?`1px solid ${C.border}`:"none"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{r.topic}</div>
                <div style={{fontSize:11,color:C.text3,marginTop:2}}>{r.dept} · Requested by {r.by} · {r.date}</div>
              </div>
              <Bdg label={r.priority} color={r.priority==="High"?C.red:C.accent}/>
              <div style={{display:"flex",gap:8}}>
                <Btn variant="fill" color={C.blue}>Accept</Btn>
                <Btn color={C.text3}>Decline</Btn>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* ── ACTIVE PROGRAMS ── */}
      {tab==="programs"&&(
        <div>
          <div style={{background:`linear-gradient(135deg,${C.green}15,${C.white})`,border:`2px solid ${C.green}50`,borderRadius:16,padding:22,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:44,height:44,borderRadius:12,background:C.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#fff"}}>◉</div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif"}}>AURA Circles</span>
                  <span style={{padding:"3px 12px",borderRadius:20,background:C.green,color:"#fff",fontSize:12,fontWeight:700}}>🟢 LIVE</span>
                </div>
                <div style={{fontSize:12,color:C.text2,marginTop:4}}>Leadership · Since Mar 2024 · 340 participants</div>
              </div>
              <Btn variant="fill" color={C.green}>Manage →</Btn>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            {ACTIVE_PROGRAMS.slice(1).map((p,i)=>(
              <Card key={i}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <div style={{width:36,height:36,borderRadius:10,background:`${p.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📋</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{p.name}</div><div style={{fontSize:11,color:C.text3}}>{p.type} · {p.since}</div></div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <Bdg label={p.status} color={p.status==="Active"?C.blue:C.accent}/>
                  <span style={{fontSize:12,color:C.text3}}>{p.participants} participants</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── CAMPAIGN ── */}
      {tab==="campaign"&&(
        <Card>
          <div style={{fontSize:15,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",marginBottom:16}}>📣 Create Learning Campaign</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            <div>
              <SLabel>Campaign Name</SLabel>
              <input value={campaignName} onChange={e=>setCampaignName(e.target.value)} placeholder="e.g. Safety Month 2025" style={{width:"100%",padding:"9px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:13,color:C.text,outline:"none",marginBottom:14}}/>
              <SLabel>Campaign Theme</SLabel>
              <Select value="" onChange={()=>{}} options={["Safety & Compliance","Leadership & Growth","Digital Upskilling","Quality & Excellence","Custom"]} placeholder="Choose theme…" style={{width:"100%",marginBottom:14}}/>
              <SLabel>Target Audience</SLabel>
              <Select value="" onChange={()=>{}} options={BIZ_UNITS} placeholder="Select Business Unit…" style={{width:"100%",marginBottom:14}}/>
              <SLabel>Duration</SLabel>
              <div style={{display:"flex",gap:10}}>
                <input type="date" style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none"}}/>
                <input type="date" style={{flex:1,padding:"8px 12px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,outline:"none"}}/>
              </div>
            </div>
            <div>
              <SLabel>Include in Campaign</SLabel>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                {["📹 AI Videos","🎮 Gamified Modules","📝 Assessments","🎭 Scenarios","📖 Case Studies","🔔 Auto Nudges"].map(item=>(
                  <div key={item} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:9,background:C.bg,border:`1px solid ${C.border}`}}>
                    <input type="checkbox" style={{accentColor:C.blue}}/>
                    <span style={{fontSize:13,color:C.text}}>{item}</span>
                  </div>
                ))}
              </div>
              <Btn variant="fill" color={C.blue} style={{width:"100%"}}>📣 Launch Campaign</Btn>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── PLACEHOLDER ──────────────────────────────────────────────────────────────
function PlaceholderPage({label}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:12}}>
      <div style={{fontSize:48}}>🚧</div>
      <div style={{fontSize:18,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif"}}>{label}</div>
      <div style={{fontSize:13,color:C.text3}}>Coming soon.</div>
    </div>
  );
}

// ─── TQM MICROLEARNING POPUP ──────────────────────────────────────────────────
const TQM_MICRO = {
  skill: "TQM",
  tag: "TPM · Daily Management",
  duration: "2 min",
  title: "The 7 Steps of Autonomous Maintenance",
  summary: "Autonomous Maintenance (AM) is a cornerstone of TPM. It shifts basic maintenance tasks — cleaning, lubrication, inspection, and tightening — to operators. This reduces breakdowns and builds ownership on the shopfloor.",
  keyPoints: [
    "Step 1: Initial cleaning & inspection",
    "Step 2: Eliminate contamination sources",
    "Step 3: Set cleaning & lubrication standards",
    "Step 4: General inspection skills",
    "Step 5: Autonomous inspection",
    "Step 6: Standardise & visualise workplaces",
    "Step 7: Full autonomous management",
  ],
  question: "Which step in Autonomous Maintenance involves operators taking full responsibility for their equipment without supervisor oversight?",
  options: [
    { id:"a", text:"Step 3 – Set Cleaning & Lubrication Standards" },
    { id:"b", text:"Step 5 – Autonomous Inspection" },
    { id:"c", text:"Step 7 – Full Autonomous Management" },
    { id:"d", text:"Step 2 – Eliminate Contamination Sources" },
  ],
  correct: "c",
};

function MicrolearningPopup({ onClose }) {
  const [phase, setPhase] = useState("watch"); // "watch" | "question" | "result"
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === TQM_MICRO.correct;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => setPhase("result"), 600);
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:600,
      background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"flex-end",
      padding:"0 32px 0 0",
    }}>
      {/* Panel — 50% width, full height scrollable */}
      <div style={{
        width:"50%", height:"92vh", background:C.white,
        borderRadius:20, overflow:"hidden",
        display:"flex", flexDirection:"column",
        boxShadow:"0 24px 80px rgba(0,0,0,0.4)",
        animation:"slideInRight 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}>

        {/* Header */}
        <div style={{
          background:`linear-gradient(135deg,#003D6B,${C.blue})`,
          padding:"20px 24px", flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>⚡</div>
              <div>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.12em"}}>Daily Microlearning · {TQM_MICRO.tag}</div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",marginTop:1}}>{TQM_MICRO.title}</div>
              </div>
            </div>
            <button onClick={onClose} style={{width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          {/* Phase tabs */}
          <div style={{display:"flex",gap:6,marginTop:10}}>
            {[{id:"watch",label:"📹 Watch"},{ id:"question",label:"❓ Quick Check"}].map(p=>(
              <div key={p.id} onClick={()=>{if(p.id==="question"&&phase==="watch")setPhase("question");}} style={{
                padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",
                background:phase===p.id||( p.id==="question"&&phase==="result")?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",
                color:"#fff",border:"1px solid rgba(255,255,255,0.3)",
              }}>{p.label}</div>
            ))}
            <div style={{marginLeft:"auto",padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(245,166,35,0.3)",color:"#FFD166",border:"1px solid rgba(245,166,35,0.5)"}}>
              ⏱ {TQM_MICRO.duration}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:"auto",padding:"24px"}}>

          {/* WATCH PHASE */}
          {phase==="watch" && (
            <div>
              {/* Video placeholder */}
              <div style={{
                background:"linear-gradient(135deg,#003D6B,#0080C7)",
                borderRadius:14, height:200, display:"flex",
                flexDirection:"column", alignItems:"center", justifyContent:"center",
                marginBottom:20, position:"relative", overflow:"hidden", cursor:"pointer",
              }} onClick={()=>setPhase("question")}>
                <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)"}}/>
                <div style={{width:64,height:64,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"3px solid rgba(255,255,255,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,color:"#fff",marginBottom:12}}>▶</div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>Play Video</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:4}}>Click to watch · {TQM_MICRO.duration}</div>
                <div style={{position:"absolute",bottom:12,left:0,right:0,padding:"0 16px"}}>
                  <div style={{height:3,background:"rgba(255,255,255,0.2)",borderRadius:2}}>
                    <div style={{height:"100%",width:"0%",background:"#FFD166",borderRadius:2}}/>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div style={{marginBottom:18}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>📄 Summary</div>
                <p style={{fontSize:13,color:C.text2,lineHeight:1.7}}>{TQM_MICRO.summary}</p>
              </div>

              {/* Key Points */}
              <div style={{marginBottom:24}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>🔑 Key Learning Points</div>
                {TQM_MICRO.keyPoints.map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"7px 12px",borderRadius:9,background:C.bg,marginBottom:6,border:`1px solid ${C.border}`}}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:C.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</div>
                    <span style={{fontSize:12,color:C.text,lineHeight:1.5}}>{pt}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={()=>setPhase("question")}
                style={{width:"100%",padding:"13px",borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,border:"none",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:`0 4px 16px ${C.blue}40`}}>
                I've watched it — Take the Quick Check →
              </button>
            </div>
          )}

          {/* QUESTION PHASE */}
          {phase==="question" && !submitted && (
            <div>
              <div style={{marginBottom:20,padding:"16px",background:C.blue3,borderRadius:12,border:`1px solid ${C.blue4}`}}>
                <div style={{fontSize:10,fontWeight:700,color:C.blue,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Quick Knowledge Check · TQM / TPM</div>
                <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.6}}>{TQM_MICRO.question}</div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                {TQM_MICRO.options.map(opt=>(
                  <div
                    key={opt.id}
                    onClick={()=>setSelected(opt.id)}
                    style={{
                      display:"flex",alignItems:"center",gap:14,
                      padding:"14px 16px",borderRadius:12,cursor:"pointer",
                      border:`2px solid ${selected===opt.id?C.blue:C.border}`,
                      background: selected===opt.id?C.blue3:C.white,
                      transition:"all 0.15s",
                    }}
                  >
                    <div style={{
                      width:28,height:28,borderRadius:"50%",flexShrink:0,
                      background:selected===opt.id?C.blue:C.bg,
                      border:`2px solid ${selected===opt.id?C.blue:C.border}`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:12,fontWeight:700,
                      color:selected===opt.id?"#fff":C.text3,
                      transition:"all 0.15s",
                    }}>{opt.id.toUpperCase()}</div>
                    <span style={{fontSize:13,color:selected===opt.id?C.blue:C.text,fontWeight:selected===opt.id?600:400,lineHeight:1.4}}>{opt.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selected}
                style={{
                  width:"100%",padding:"13px",borderRadius:12,
                  background:selected?`linear-gradient(135deg,${C.blue},${C.blue2})`:"#e0e7ef",
                  border:"none",color:selected?"#fff":"#aab",
                  fontSize:14,fontWeight:700,cursor:selected?"pointer":"not-allowed",
                  boxShadow:selected?`0 4px 16px ${C.blue}40`:"none",
                  transition:"all 0.2s",
                }}>
                Submit Answer
              </button>
            </div>
          )}

          {/* Submitting transition */}
          {phase==="question" && submitted && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,gap:16}}>
              <div style={{fontSize:40,animation:"spin 0.8s linear infinite"}}>⟳</div>
              <div style={{fontSize:14,color:C.text3}}>Checking your answer…</div>
            </div>
          )}

          {/* RESULT PHASE */}
          {phase==="result" && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"16px 0"}}>
              {isCorrect ? (
                <>
                  <div style={{fontSize:72,marginBottom:16,animation:"popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)"}}>🎉</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.green,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Great job, Vikram!</div>
                  <div style={{fontSize:14,color:C.text2,marginBottom:24,lineHeight:1.6}}>That's correct! Step 7 – Full Autonomous Management is when operators take complete ownership of their equipment.</div>
                  {/* XP reward card */}
                  <div style={{
                    background:"linear-gradient(135deg,#003D6B,#0080C7)",
                    borderRadius:16,padding:"20px 32px",marginBottom:24,
                    boxShadow:`0 8px 32px ${C.blue}40`,width:"100%",
                  }}>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",marginBottom:6}}>You have earned</div>
                    <div style={{fontSize:36,fontWeight:900,color:"#FFD166",fontFamily:"'Playfair Display',serif",letterSpacing:"-1px",marginBottom:6}}>+5 Skill XP</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.9)",fontWeight:600}}>in TQM</div>
                    <div style={{marginTop:12,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2}}>
                      <div style={{height:"100%",width:"52%",background:"#FFD166",borderRadius:2,boxShadow:"0 0 8px rgba(255,209,102,0.6)"}}/>
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",marginTop:4}}>Total TQM XP: 4,825 / 10,000</div>
                  </div>
                  <div style={{display:"flex",gap:10,width:"100%"}}>
                    <button onClick={onClose} style={{flex:1,padding:"12px",borderRadius:10,background:C.blue,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>Continue Learning 🚀</button>
                    <button onClick={onClose} style={{flex:1,padding:"12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`,color:C.text2,fontSize:13,cursor:"pointer"}}>Close</button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{fontSize:72,marginBottom:16}}>😅</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.accent,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Not quite!</div>
                  <div style={{fontSize:14,color:C.text2,marginBottom:16,lineHeight:1.6}}>The correct answer is <strong style={{color:C.green}}>C – Step 7: Full Autonomous Management</strong>, where operators take complete responsibility without supervisor oversight.</div>
                  <div style={{background:`${C.green}10`,border:`1px solid ${C.green}30`,borderRadius:12,padding:14,width:"100%",marginBottom:20,textAlign:"left"}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.green,marginBottom:4}}>💡 Remember</div>
                    <div style={{fontSize:12,color:C.text2,lineHeight:1.6}}>The 7 steps of AM progress from basic cleaning (Step 1) to full operator autonomy (Step 7). Each step builds on the previous one. Review the lesson and try again tomorrow!</div>
                  </div>
                  <div style={{display:"flex",gap:10,width:"100%"}}>
                    <button onClick={()=>{setPhase("watch");setSelected(null);setSubmitted(false);}} style={{flex:1,padding:"12px",borderRadius:10,background:C.blue,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>📹 Re-watch Lesson</button>
                    <button onClick={onClose} style={{flex:1,padding:"12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`,color:C.text2,fontSize:13,cursor:"pointer"}}>Close</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight { from{transform:translateX(40px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes popIn { from{transform:scale(0.4);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function ULIP() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [active,setActive]=useState("home");
  const [showMicro,setShowMicro]=useState(false);

  // Fire microlearning popup 15 seconds after login
  useEffect(()=>{
    if(loggedIn){
      const t=setTimeout(()=>setShowMicro(true),15000);
      return()=>clearTimeout(t);
    }
  },[loggedIn]);

  if(!loggedIn) return <LoginPage onLogin={()=>setLoggedIn(true)}/>;
  const renderPage=()=>{
    switch(active){
      case "home":        return <HomePage/>;
      case "profile":     return <ProfilePage/>;
      case "goals":       return <GoalsPage/>;
      case "mentors":     return <MentorsPage/>;
      case "jobs":        return <JobsPage/>;
      case "communities": return <CommunitiesPage/>;
      case "director":    return <ProgramDirector/>;
      default:            return <PlaceholderPage label={NAV_ITEMS.find(n=>n.id===active)?.label||active}/>;
    }
  };
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.blue4};border-radius:3px;}
        select,input,textarea,button{font-family:'DM Sans',sans-serif;}
        a{text-decoration:none;}
      `}</style>
      <div style={{display:"flex",height:"100vh",background:C.bg}}>
        {/* SIDEBAR */}
        <aside style={{width:230,background:C.sidebar,display:"flex",flexDirection:"column",flexShrink:0,zIndex:10}}>
          {/* ULIP logo in sidebar */}
          <div style={{padding:"16px 18px 12px",borderBottom:"1px solid rgba(255,255,255,0.25)",display:"flex",alignItems:"center",gap:12}}>
            <ULIPLogoImg size={44}/>
            <div>
              <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"'Playfair Display',serif",letterSpacing:"-0.5px"}}>ULIP</div>
              <div style={{fontSize:8,color:"rgba(255,255,255,0.85)",textTransform:"uppercase",letterSpacing:"0.15em",lineHeight:1.3}}>AI Powered · Future Ready</div>
            </div>
          </div>
          <div style={{padding:"10px 18px",borderBottom:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",gap:10}}>
            <ProfileAvatar size={32}/>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>Vikram Mehta</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.85)"}}>TQM · H BF · TSN · IL4</div>
            </div>
          </div>
          <nav style={{flex:1,padding:"10px 10px",overflowY:"auto"}}>
            {NAV_ITEMS.map(item=>(
              <button key={item.id} onClick={()=>setActive(item.id)} style={{
                width:"100%",display:"flex",alignItems:"center",gap:10,
                padding:"9px 12px",borderRadius:9,border:"none",
                background:active===item.id?"rgba(255,255,255,0.22)":"transparent",
                color:"#fff",
                fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",
                marginBottom:2,textAlign:"left",fontWeight:active===item.id?700:500,
                borderLeft:active===item.id?"3px solid #fff":"3px solid transparent",
                opacity:active===item.id?1:0.88,
              }}>
                <span style={{fontSize:14,width:18,textAlign:"center",flexShrink:0}}>{item.icon}</span>
                {item.label}
                {item.id==="director"&&<span style={{marginLeft:"auto",fontSize:9,padding:"1px 5px",borderRadius:8,background:"rgba(245,166,35,0.25)",color:"#FFD166",fontWeight:700}}>PRO</span>}
              </button>
            ))}
          </nav>
          <div style={{padding:"10px 14px",margin:"0 10px 14px",background:"rgba(255,255,255,0.12)",borderRadius:10,border:"1px solid rgba(255,255,255,0.25)"}}>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.75)",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:3}}>Powered by</div>
            <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>TDA Intelligence</div>
          </div>
        </aside>
        {/* MAIN */}
        <main style={{flex:1,overflowY:"auto",padding:"20px 28px"}}>
          <TopBar/>
          {renderPage()}
        </main>
      </div>
      <TDAChatbot/>
      {showMicro && <MicrolearningPopup onClose={()=>setShowMicro(false)}/>}
    </>
  );
}
