import { useState } from "react";
import C from "../theme";

/* ─── Proficiency level system ──────────────────────────────────────────────── */
const PL_LABELS = ["","Basic","Supervised","Independent","Practitioner","Expert"];
const PL_COL    = ["","#8A94A6","#F5A623","#0080C7","#9B59B6","#18B982"];
const xpToPL    = xp => Math.min(5, Math.floor(xp / 1000) + 1);
const plTag     = (pl,small) => (
  <span style={{padding:small?"1px 5px":"2px 7px",borderRadius:5,background:`${PL_COL[pl]}20`,color:PL_COL[pl],fontSize:small?8:10,fontWeight:700,whiteSpace:"nowrap"}}>
    PL{pl}
  </span>
);

/* ─── Skills & monthly hours ────────────────────────────────────────────────── */
const SKILLS  = ["Safety","TQM","Digital","Maintenance","Leadership","Process Ctrl","Analytics","Compliance"];
const MONTHLY = [{m:"Dec",v:38},{m:"Jan",v:45},{m:"Feb",v:52},{m:"Mar",v:48},{m:"Apr",v:60},{m:"May",v:50}];

/* ─── Team data
       skills.xp      = cumulative skill XP  (PL = floor(xp/1000)+1, max PL5)
       skills.prevXpQ = XP at start of this quarter (velocity = xp − prevXpQ / 90 days)
       skills.targetPL = proficiency target from annual skill assessment              ── */
const TEAM = [
  { name:"Ravi Kumar",    init:"RK", col:"#0080C7", level:"IL3", role:"TQM Associate",
    xp:3240, hoursMonth:8,  completions:12, certStatus:"valid",    certDue:"Aug 2026",
    skills:{ Safety:{xp:2100,prevXpQ:1850,targetPL:3}, TQM:{xp:2800,prevXpQ:2500,targetPL:4}, Digital:{xp:1100,prevXpQ:820,targetPL:3}, Maintenance:{xp:1680,prevXpQ:1500,targetPL:2}, Leadership:{xp:1820,prevXpQ:1600,targetPL:3}, "Process Ctrl":{xp:2200,prevXpQ:2000,targetPL:3}, Analytics:{xp:680,prevXpQ:560,targetPL:2}, Compliance:{xp:2400,prevXpQ:2100,targetPL:3} }},
  { name:"Anil Sharma",   init:"AS", col:"#E5484D", level:"IL2", role:"Maintenance Tech.",
    xp:2180, hoursMonth:4,  completions:7,  certStatus:"expired",  certDue:"May 2026",
    skills:{ Safety:{xp:1520,prevXpQ:1380,targetPL:3}, TQM:{xp:1200,prevXpQ:1080,targetPL:2}, Digital:{xp:680,prevXpQ:620,targetPL:2}, Maintenance:{xp:3100,prevXpQ:2850,targetPL:4}, Leadership:{xp:820,prevXpQ:740,targetPL:2}, "Process Ctrl":{xp:1650,prevXpQ:1520,targetPL:3}, Analytics:{xp:420,prevXpQ:380,targetPL:2}, Compliance:{xp:1820,prevXpQ:1650,targetPL:3} }},
  { name:"Deepak Yadav",  init:"DY", col:"#18B982", level:"IL4", role:"BF Operator",
    xp:4820, hoursMonth:14, completions:18, certStatus:"valid",    certDue:"Dec 2026",
    skills:{ Safety:{xp:3600,prevXpQ:3200,targetPL:4}, TQM:{xp:2200,prevXpQ:2000,targetPL:3}, Digital:{xp:1820,prevXpQ:1620,targetPL:2}, Maintenance:{xp:2800,prevXpQ:2500,targetPL:3}, Leadership:{xp:2200,prevXpQ:2000,targetPL:3}, "Process Ctrl":{xp:3500,prevXpQ:3100,targetPL:4}, Analytics:{xp:1200,prevXpQ:980,targetPL:2}, Compliance:{xp:3800,prevXpQ:3500,targetPL:4} }},
  { name:"Suresh Patel",  init:"SP", col:"#F5A623", level:"IL3", role:"Safety Engineer",
    xp:3560, hoursMonth:10, completions:14, certStatus:"valid",    certDue:"Oct 2026",
    skills:{ Safety:{xp:4100,prevXpQ:3850,targetPL:5}, TQM:{xp:1650,prevXpQ:1500,targetPL:2}, Digital:{xp:820,prevXpQ:720,targetPL:2}, Maintenance:{xp:1820,prevXpQ:1680,targetPL:3}, Leadership:{xp:1650,prevXpQ:1500,targetPL:3}, "Process Ctrl":{xp:2200,prevXpQ:2000,targetPL:3}, Analytics:{xp:1020,prevXpQ:900,targetPL:2}, Compliance:{xp:3600,prevXpQ:3300,targetPL:4} }},
  { name:"Mohan Singh",   init:"MS", col:"#9B59B6", level:"IL2", role:"TQM Technician",
    xp:2640, hoursMonth:5,  completions:9,  certStatus:"expiring", certDue:"Jun 2026",
    skills:{ Safety:{xp:1820,prevXpQ:1680,targetPL:3}, TQM:{xp:3050,prevXpQ:2850,targetPL:4}, Digital:{xp:620,prevXpQ:560,targetPL:2}, Maintenance:{xp:1200,prevXpQ:1080,targetPL:2}, Leadership:{xp:1050,prevXpQ:950,targetPL:2}, "Process Ctrl":{xp:1680,prevXpQ:1520,targetPL:3}, Analytics:{xp:560,prevXpQ:500,targetPL:2}, Compliance:{xp:2200,prevXpQ:2000,targetPL:3} }},
  { name:"Pradeep Kumar", init:"PK", col:"#FF6B35", level:"IL3", role:"Digital Technician",
    xp:2940, hoursMonth:9,  completions:11, certStatus:"valid",    certDue:"Sep 2026",
    skills:{ Safety:{xp:1650,prevXpQ:1500,targetPL:3}, TQM:{xp:1520,prevXpQ:1380,targetPL:2}, Digital:{xp:3200,prevXpQ:2850,targetPL:4}, Maintenance:{xp:1050,prevXpQ:950,targetPL:2}, Leadership:{xp:1200,prevXpQ:1080,targetPL:2}, "Process Ctrl":{xp:1520,prevXpQ:1380,targetPL:2}, Analytics:{xp:2800,prevXpQ:2550,targetPL:3}, Compliance:{xp:1820,prevXpQ:1650,targetPL:3} }},
];

/* ─── Role requirements (target PL per skill) ───────────────────────────────── */
const ROLE_REQ = {
  "TQM Associate":      {Safety:3,TQM:4,Digital:2,Maintenance:2,Leadership:3,"Process Ctrl":3,Analytics:2,Compliance:3},
  "Maintenance Tech.":  {Safety:3,TQM:2,Digital:2,Maintenance:4,Leadership:2,"Process Ctrl":3,Analytics:2,Compliance:3},
  "BF Operator":        {Safety:4,TQM:3,Digital:2,Maintenance:3,Leadership:3,"Process Ctrl":4,Analytics:2,Compliance:4},
  "Safety Engineer":    {Safety:5,TQM:2,Digital:2,Maintenance:3,Leadership:3,"Process Ctrl":3,Analytics:2,Compliance:4},
  "TQM Technician":     {Safety:3,TQM:4,Digital:2,Maintenance:2,Leadership:2,"Process Ctrl":3,Analytics:2,Compliance:3},
  "Digital Technician": {Safety:3,TQM:2,Digital:4,Maintenance:2,Leadership:2,"Process Ctrl":2,Analytics:3,Compliance:3},
};

/* ─── Team stat helpers ─────────────────────────────────────────────────────── */
const teamAvgPL  = k => Math.round(TEAM.reduce((s,m)=>s+xpToPL(m.skills[k].xp),0)/TEAM.length);
const roleReqPL  = k => Math.round(TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||3),0)/TEAM.length);
const teamAvgXP  = k => Math.round(TEAM.reduce((s,m)=>s+m.skills[k].xp,0)/TEAM.length);
const skillVel   = k => Math.round(TEAM.reduce((s,m)=>s+(m.skills[k].xp-m.skills[k].prevXpQ),0)/TEAM.length);
const certCol    = s => ({valid:"#18B982",expiring:"#F5A623",expired:"#E5484D"}[s]);
const certLbl    = s => ({valid:"Valid ✓",expiring:"Expiring ⚠",expired:"Expired ✗"}[s]);
const ragColPL   = (avg,req) => avg>=req?"#18B982":avg>=req-1?"#F5A623":"#E5484D";
const cellFg     = (m,k) => { const c=xpToPL(m.skills[k].xp),r=ROLE_REQ[m.role]?.[k]||3; return c>=r?"#18B982":c>=r-1?"#F5A623":"#E5484D"; };
const cellBg     = (m,k) => { const c=xpToPL(m.skills[k].xp),r=ROLE_REQ[m.role]?.[k]||3; return c>=r?"#18B98218":c>=r-1?"#F5A62318":"#E5484D18"; };
const memberTTC  = (m,k) => {
  const s=m.skills[k], needed=Math.max(0,s.targetPL*1000-s.xp);
  if(!needed) return null;
  const vel=s.xp-s.prevXpQ;
  if(vel<=0) return 9999;
  return Math.round(needed/(vel/90));
};

/* ─── Learning interventions ────────────────────────────────────────────────── */
const INTERVENTIONS = [
  {p:"Ravi Kumar",   sk:"TQM",         type:"course",  icon:"📘",title:"Autonomous Maintenance Module 3",  date:"2026-05-10",xp:120,score:88},
  {p:"Ravi Kumar",   sk:"Safety",      type:"assess",  icon:"📝",title:"Fire Safety Checkpoint Q1",        date:"2026-04-22",xp:50, score:82},
  {p:"Ravi Kumar",   sk:"Analytics",   type:"project", icon:"🛠",title:"Build Shift Report Dashboard",     date:"2026-03-28",xp:100,score:null},
  {p:"Ravi Kumar",   sk:"Digital",     type:"micro",   icon:"⚡",title:"Excel for KPI Dashboards",         date:"2026-04-15",xp:30, score:null},
  {p:"Anil Sharma",  sk:"Safety",      type:"assess",  icon:"📝",title:"Safety Compliance Check Q1",       date:"2026-05-08",xp:50, score:65},
  {p:"Anil Sharma",  sk:"Maintenance", type:"course",  icon:"📘",title:"Predictive vs Prev. Maintenance",  date:"2026-04-30",xp:80, score:76},
  {p:"Anil Sharma",  sk:"Maintenance", type:"project", icon:"🛠",title:"Predictive Maint. Pilot – Conveyor Belt Zone 3",date:"2026-05-05",xp:180,score:null},
  {p:"Anil Sharma",  sk:"Safety",      type:"micro",   icon:"⚡",title:"LOTO in 60 Seconds",               date:"2026-04-12",xp:20, score:null},
  {p:"Deepak Yadav", sk:"Safety",      type:"course",  icon:"📘",title:"Process Safety Management (PSM)", date:"2026-05-14",xp:60, score:92},
  {p:"Deepak Yadav", sk:"Process Ctrl",type:"assess",  icon:"📝",title:"BF Operations Assessment",         date:"2026-05-02",xp:50, score:90},
  {p:"Deepak Yadav", sk:"Analytics",   type:"course",  icon:"📘",title:"Power BI Fundamentals",            date:"2026-04-20",xp:50, score:85},
  {p:"Suresh Patel", sk:"Safety",      type:"course",  icon:"📘",title:"HAZOP Study Methodology",          date:"2026-05-12",xp:40, score:88},
  {p:"Suresh Patel", sk:"Compliance",  type:"assess",  icon:"📝",title:"Process Safety Assessment",        date:"2026-04-28",xp:50, score:94},
  {p:"Suresh Patel", sk:"Leadership",  type:"micro",   icon:"⚡",title:"Situational Leadership 3 min",    date:"2026-04-10",xp:15, score:null},
  {p:"Mohan Singh",  sk:"TQM",         type:"course",  icon:"📘",title:"Six Sigma Yellow Belt Prep",       date:"2026-05-06",xp:80, score:72},
  {p:"Mohan Singh",  sk:"Safety",      type:"assess",  icon:"📝",title:"Emergency Response Quick Check",  date:"2026-04-25",xp:30, score:70},
  {p:"Mohan Singh",  sk:"Digital",     type:"micro",   icon:"⚡",title:"What is Data Analytics?",         date:"2026-04-08",xp:10, score:null},
  {p:"Pradeep Kumar",sk:"Digital",     type:"course",  icon:"📘",title:"Industrial IoT Essentials",        date:"2026-05-15",xp:60, score:88},
  {p:"Pradeep Kumar",sk:"Analytics",   type:"project", icon:"🛠",title:"Analyse Bearing Vibration Data",  date:"2026-05-01",xp:80, score:null},
  {p:"Pradeep Kumar",sk:"Safety",      type:"micro",   icon:"⚡",title:"Fire Triangle & Classes of Fire", date:"2026-04-18",xp:10, score:null},
];

/* ─── Risk alerts ───────────────────────────────────────────────────────────── */
const RISK_ALERTS = [
  {sev:"red",   text:"Anil Sharma's safety certification expired (May 2026). Must not perform critical tasks until renewed.",                                  action:"Assign Renewal"},
  {sev:"red",   text:`Analytics avg PL${teamAvgPL("Analytics").toFixed(1)} vs required PL${roleReqPL("Analytics").toFixed(1)}. 4 of 6 members below target.`, action:"View Plan"},
  {sev:"amber", text:"Mohan Singh's certification expires in 12 days (Jun 2026). Initiate renewal this week.",                                                action:"Schedule Now"},
  {sev:"amber", text:`Digital avg PL${teamAvgPL("Digital").toFixed(1)} vs required PL${roleReqPL("Digital").toFixed(1)}. 4 of 6 members below proficiency.`,  action:"Assign Course"},
  {sev:"amber", text:"Pradeep Kumar has not completed a safety refresher in 90+ days. Compliance risk flagged.",                                              action:"Send Reminder"},
];

/* ─── AI Actions ────────────────────────────────────────────────────────────── */
const AI_ACTIONS = [
  {icon:"📚",color:"#0080C7",title:"Assign Data Analytics Cohort",          desc:"4 members at PL1 Analytics. EdNext cohort starts Jun 3 — can advance to PL2 by Q3.",       tag:"Skill Gap"},
  {icon:"🔄",color:"#E5484D",title:"Initiate Cert Renewal — Anil & Mohan", desc:"Expired/expiring certs detected. Auto-enroll in SOE Safety refresher immediately.",         tag:"Urgent"},
  {icon:"🤝",color:"#9B59B6",title:"Connect with Priya K. (Analytics SME)",desc:"Arrange SME session on Data Analytics for PL1 members to accelerate XP gain.",              tag:"SME Session"},
  {icon:"⚡",color:"#18B982",title:"Digital Upskilling Microlearning Series",desc:"Assign 5-part IIoT & Digital Tools series to 4 members currently at PL1 in Digital.",       tag:"Microlearning"},
  {icon:"🎯",color:"#F5A623",title:"Leadership Bootcamp — Q3 Batch",        desc:"4 members at PL2 Leadership, target PL3. July bootcamp can close gap in one quarter.",      tag:"Leadership"},
];

/* ─── Content options for Recommend Learnings ───────────────────────────────── */
const CONTENT_OPTIONS = [
  {id:"c1",type:"course",icon:"📘",title:"Data Analytics Fundamentals",          source:"EdNext",   duration:"3h"},
  {id:"c2",type:"course",icon:"📘",title:"PLC Architecture & I/O Modules",       source:"SumTotal", duration:"2h"},
  {id:"c3",type:"course",icon:"📘",title:"Six Sigma Yellow Belt Prep",            source:"EdNext",   duration:"4h"},
  {id:"c4",type:"course",icon:"📘",title:"Leadership & Communication Essentials", source:"EdNext",   duration:"2h"},
  {id:"c5",type:"course",icon:"📘",title:"Predictive Maintenance Fundamentals",   source:"SumTotal", duration:"3h"},
  {id:"m1",type:"micro", icon:"⚡",title:"7 Steps of Autonomous Maintenance",     source:"ULIP",     duration:"2 min"},
  {id:"m2",type:"micro", icon:"⚡",title:"Fire Safety & Extinguisher Use",        source:"ULIP",     duration:"3 min"},
  {id:"m3",type:"micro", icon:"⚡",title:"LOTO Procedure — Step by Step",         source:"ULIP",     duration:"3 min"},
  {id:"m4",type:"micro", icon:"⚡",title:"What is Kaizen? 90-sec Explainer",      source:"ULIP",     duration:"2 min"},
  {id:"m5",type:"micro", icon:"⚡",title:"Reading a Control Chart (SPC)",         source:"ULIP",     duration:"2 min"},
];

/* ─── Avatar ────────────────────────────────────────────────────────────────── */
const Av = ({m,size=26}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:m.col,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.34,fontWeight:800,flexShrink:0}}>{m.init}</div>
);

/* ─── Radar Chart (PL 1–5 scale) ────────────────────────────────────────────── */
function RadarChart() {
  const [tip, setTip] = useState(null);
  const cx=200, cy=185, r=90, n=SKILLS.length;
  const angle  = i => (i*2*Math.PI/n) - Math.PI/2;
  const pt     = (i,pct) => [cx + r*pct*Math.cos(angle(i)), cy + r*pct*Math.sin(angle(i))];
  const avgPts = SKILLS.map((_,i)=>pt(i,teamAvgPL(SKILLS[i])/5).join(",")).join(" ");
  const reqPts = SKILLS.map((k,i)=>pt(i,roleReqPL(k)/5).join(",")).join(" ");

  return (
    <svg width={400} height={370}>
      {[1,2,3,4,5].map(pl=>(
        <polygon key={pl} points={SKILLS.map((_,i)=>pt(i,pl/5).join(",")).join(" ")} fill="none" stroke={pl===3?"#DDE6EF":"#EEF2F7"} strokeWidth={pl===3?1.5:1}/>
      ))}
      {SKILLS.map((_,i)=>{const[x,y]=pt(i,1);return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#DDE6EF" strokeWidth={1}/>;})  }
      {/* PL labels on vertical axis */}
      {[1,2,3,4,5].map(pl=>{const[x,y]=pt(0,pl/5);return <text key={pl} x={x-18} y={y+4} fontSize={7} fill="#9aafbf" fontFamily="'DM Sans',sans-serif">PL{pl}</text>;})}
      <polygon points={reqPts} fill="rgba(245,166,35,0.07)" stroke="#F5A623" strokeWidth={1.5} strokeDasharray="4 3"/>
      <polygon points={avgPts} fill="rgba(0,128,199,0.18)" stroke="#0080C7" strokeWidth={2}/>
      {SKILLS.map((k,i)=>{
        const pl=teamAvgPL(k), [x,y]=pt(i,pl/5), isHov=tip?.i===i;
        return (
          <circle key={i} cx={x} cy={y} r={isHov?6:4}
            fill={isHov?"#003D6B":C.blue} stroke="#fff" strokeWidth={1.5}
            style={{cursor:"pointer",transition:"r 0.15s"}}
            onMouseEnter={()=>setTip({i,x,y,k,v:pl})}
            onMouseLeave={()=>setTip(null)}
          />
        );
      })}
      {tip && (()=>{
        const {x,y,k,v}=tip, tw=88, th=36;
        const tx=x<cx?x-tw-8:x+8, ty=Math.min(334-th,Math.max(0,y-th/2));
        return (
          <g style={{pointerEvents:"none"}}>
            <rect x={tx} y={ty} width={tw} height={th} rx={7} fill="#001E3C" opacity={0.93}/>
            <text x={tx+tw/2} y={ty+12} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="'DM Sans',sans-serif">{k}</text>
            <text x={tx+tw/2} y={ty+26} textAnchor="middle" fontSize={13} fontWeight={800} fill="#FFD166" fontFamily="'DM Sans',sans-serif">PL {v}</text>
          </g>
        );
      })()}
      {SKILLS.map((k,i)=>{
        const [x,y]=pt(i,1.28), anchor=x<cx-5?"end":x>cx+5?"start":"middle";
        return <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize={9} fontWeight={600} fill="#5A7184" fontFamily="'DM Sans',sans-serif">{k}</text>;
      })}
      <text x={cx} y={cy-6}  textAnchor="middle" fontSize={9} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Team</text>
      <text x={cx} y={cy+7}  textAnchor="middle" fontSize={9} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Avg PL</text>
    </svg>
  );
}

/* ─── Modal ─────────────────────────────────────────────────────────────────── */
function Modal({title,onClose,children}) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:C.white,borderRadius:20,padding:28,width:500,maxWidth:"94vw",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.35)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div style={{fontSize:15,fontWeight:800,color:C.text,fontFamily:"'Playfair Display',serif"}}>{title}</div>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:"50%",border:"none",background:C.bg,cursor:"pointer",fontSize:16,color:C.text3,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════ */
export default function ManagerViewPage() {
  const [modal,        setModal]        = useState(null);
  const [appreciated,  setAppreciated]  = useState({});
  const [assigned,     setAssigned]     = useState({});
  const [intFilter,    setIntFilter]    = useState(null);
  const [plApproved,   setPlApproved]   = useState({});
  /* recommend */
  const [selMembers,   setSelMembers]   = useState([]);
  const [selContent,   setSelContent]   = useState([]);
  const [recMsg,       setRecMsg]       = useState("");
  const [contentQ,     setContentQ]     = useState("");
  const [dropOpen,     setDropOpen]     = useState(false);
  const [recSent,      setRecSent]      = useState(false);

  const totalXP     = Math.round(TEAM.reduce((s,m)=>s+m.xp,0)/TEAM.length);
  const totalH      = TEAM.reduce((s,m)=>s+m.hoursMonth,0);
  const critGaps    = SKILLS.filter(k=>teamAvgPL(k)<roleReqPL(k)).length;
  const completionP = Math.round(TEAM.reduce((s,m)=>s+m.completions,0)/TEAM.length/18*100);
  const maxH        = Math.max(...MONTHLY.map(d=>d.v));
  const maxVel      = Math.max(...SKILLS.map(skillVel));

  /* KPI modal details */
  const kpiDetails = {
    "Team Skill XP": (
      <div>
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>XP leaderboard — all 6 team members ranked by total skill XP earned.</div>
        {[...TEAM].sort((a,b)=>b.xp-a.xp).map((m,i)=>(
          <div key={m.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{fontSize:14,color:["#F5A623","#8A94A6","#C87941","#7A90A4","#7A90A4","#7A90A4"][i],fontWeight:700,width:20}}>#{i+1}</div>
            <Av m={m} size={30}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:C.text}}>{m.name} <span style={{fontSize:10,color:C.text3,fontWeight:400}}>· {m.role}</span></div>
              <div style={{height:6,background:C.bg,borderRadius:3,marginTop:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${m.xp/5000*100}%`,background:m.col,borderRadius:3}}/>
              </div>
            </div>
            <div style={{fontSize:14,fontWeight:800,color:m.col,width:60,textAlign:"right"}}>{m.xp.toLocaleString()}</div>
          </div>
        ))}
        <div style={{marginTop:16,padding:"12px 14px",background:C.bg,borderRadius:10,fontSize:12,color:C.text3}}>
          Team total XP: <b style={{color:C.blue}}>{TEAM.reduce((s,m)=>s+m.xp,0).toLocaleString()}</b> · Avg per member: <b style={{color:C.blue}}>{totalXP.toLocaleString()}</b>
        </div>
      </div>
    ),
    "Learning Hours": (
      <div>
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Hours learning this month per team member. Target: 10h/month.</div>
        {[...TEAM].sort((a,b)=>b.hoursMonth-a.hoursMonth).map(m=>(
          <div key={m.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <Av m={m} size={28}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:12,fontWeight:700,color:C.text}}>{m.name}</span>
                <span style={{fontSize:12,fontWeight:800,color:m.hoursMonth>=8?C.green:m.hoursMonth>=5?"#F5A623":"#E5484D"}}>{m.hoursMonth}h</span>
              </div>
              <div style={{height:7,background:C.bg,borderRadius:3,marginTop:4,overflow:"hidden",position:"relative"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:"80%",background:`${C.blue}18`,borderRadius:3}}/>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${Math.min(100,m.hoursMonth/10*100)}%`,background:m.hoursMonth>=8?C.green:m.hoursMonth>=5?"#F5A623":"#E5484D",borderRadius:3}}/>
              </div>
            </div>
          </div>
        ))}
        <div style={{marginTop:16,display:"flex",alignItems:"flex-end",gap:6,height:80,padding:"0 4px"}}>
          {MONTHLY.map(d=>(
            <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%",justifyContent:"flex-end"}}>
              <div style={{fontSize:8,color:d.m==="May"?C.blue:C.text3,fontWeight:d.m==="May"?700:400}}>{d.v}h</div>
              <div style={{width:"100%",background:d.m==="May"?C.blue:`${C.blue}45`,borderRadius:"3px 3px 0 0",height:`${(d.v/maxH)*60}px`}}/>
              <div style={{fontSize:8,color:d.m==="May"?C.blue:C.text3}}>{d.m}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    "Critical Skill Gaps": (
      <div>
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Skills where team avg PL is more than 0.4 below the role-weighted required PL.</div>
        {SKILLS.map(k=>{
          const avgPL=teamAvgPL(k), reqPL=roleReqPL(k), gap=+(reqPL-avgPL).toFixed(1);
          if(gap<0.4) return null;
          return (
            <div key={k} style={{marginBottom:14,padding:"12px 14px",borderRadius:10,background:"#E5484D0c",border:"1px solid #E5484D25"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <span style={{fontSize:12,fontWeight:700,color:C.text}}>{k}</span>
                <span style={{fontSize:11,padding:"2px 7px",borderRadius:6,background:"#E5484D18",color:"#E5484D",fontWeight:700}}>−{gap} PL</span>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:10,color:C.text3}}>Avg:</span>{plTag(Math.round(avgPL))}
                <span style={{fontSize:10,color:C.text3,marginLeft:4}}>Required:</span>{plTag(Math.round(reqPL))}
              </div>
              <div style={{height:7,background:C.bg,borderRadius:3,overflow:"hidden",position:"relative"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${reqPL/5*100}%`,background:"#E5484D18",borderRadius:3}}/>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${avgPL/5*100}%`,background:"#E5484D",borderRadius:3}}/>
              </div>
              <div style={{fontSize:10,color:C.text3,marginTop:6}}>Avg XP gain/qtr: <b style={{color:C.blue}}>+{skillVel(k)} XP</b></div>
            </div>
          );
        })}
      </div>
    ),
    "Completion Rate": (
      <div>
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Course and microlearning completions per member. Target: 18/member.</div>
        {[...TEAM].sort((a,b)=>b.completions-a.completions).map(m=>(
          <div key={m.name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <Av m={m} size={28}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{fontSize:12,fontWeight:700,color:C.text}}>{m.name}</span>
                <span style={{fontSize:11,fontWeight:700,color:m.completions>=14?C.green:m.completions>=9?"#F5A623":"#E5484D"}}>{m.completions}/18</span>
              </div>
              <div style={{height:6,background:C.bg,borderRadius:3,marginTop:4,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${m.completions/18*100}%`,background:m.completions>=14?C.green:m.completions>=9?"#F5A623":"#E5484D",borderRadius:3}}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  const KPIS = [
    {icon:"⭐",label:"Team Skill XP",       value:totalXP.toLocaleString(), sub:"avg / member",       color:C.blue},
    {icon:"⏱",label:"Learning Hours",       value:totalH,                   sub:"team · this month",  color:"#F5A623"},
    {icon:"⚠️",label:"Critical Skill Gaps", value:critGaps,                 sub:"skills below req. PL",color:critGaps>3?"#E5484D":"#F5A623"},
    {icon:"✅",label:"Completion Rate",      value:`${completionP}%`,         sub:"avg course rate",    color:C.blue},
  ];

  /* recommend helpers */
  const toggleMember   = n => setSelMembers(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n]);
  const toggleAll      = () => setSelMembers(s=>s.length===TEAM.length?[]:TEAM.map(m=>m.name));
  const toggleContent  = c => setSelContent(p=>p.find(x=>x.id===c.id)?p.filter(x=>x.id!==c.id):[...p,c]);
  const filteredContent = CONTENT_OPTIONS.filter(c=>c.title.toLowerCase().includes(contentQ.toLowerCase()));
  const handleAssign   = () => {
    if(!selMembers.length||!selContent.length) return;
    setRecSent(true);
    setTimeout(()=>{ setRecSent(false); setSelMembers([]); setSelContent([]); setRecMsg(""); setContentQ(""); },3500);
  };

  return (
    <div style={{maxWidth:1100,paddingBottom:60}}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👔</div>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Manager View</h2>
          <div style={{fontSize:12,color:C.text3}}>Team of {TEAM.length} · H Blast Furnace · TSN · Skill Assessment: Jan 2026</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
          <div style={{padding:"4px 10px",borderRadius:7,background:"#9B59B615",fontSize:10,color:"#9B59B6",fontWeight:700,border:"1px solid #9B59B625"}}>PL1–PL5 Skill Scale</div>
          <div style={{padding:"4px 10px",borderRadius:7,background:`${C.blue}15`,fontSize:11,color:C.blue,fontWeight:700,border:`1px solid ${C.blue}25`}}>🤖 TDA AI-Assisted</div>
        </div>
      </div>

      {/* ── KPI Strip ───────────────────────────────────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
        {KPIS.map(k=>(
          <div key={k.label} onClick={()=>setModal(k.label)}
            style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px 16px",textAlign:"center",cursor:"pointer",transition:"all 0.18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=k.color;e.currentTarget.style.boxShadow=`0 4px 20px ${k.color}25`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
            <div style={{fontSize:22,marginBottom:6}}>{k.icon}</div>
            <div style={{fontSize:26,fontWeight:900,color:k.color,fontFamily:"'Playfair Display',serif",lineHeight:1}}>{k.value}</div>
            <div style={{fontSize:10,color:C.text3,margin:"6px 0 3px",textTransform:"uppercase",letterSpacing:"0.07em"}}>{k.label}</div>
            <div style={{fontSize:9,color:k.color,fontWeight:600}}>{k.sub}</div>
            <div style={{fontSize:9,color:C.text3,marginTop:6,opacity:0.7}}>Click for details →</div>
          </div>
        ))}
      </div>

      {/* ── Section 1: Radar + RAG ──────────────────────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,marginBottom:24}}>

        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"16px 16px 8px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4,alignSelf:"flex-start",paddingLeft:8}}>Skill Radar · PL Scale</div>
          <div style={{display:"flex",gap:12,fontSize:9,color:C.text3,marginBottom:4,alignSelf:"flex-start",paddingLeft:8}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:2,background:C.blue,display:"inline-block",borderRadius:1}}/>Team Avg</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:1,borderTop:"2px dashed #F5A623",display:"inline-block"}}/>Required</span>
          </div>
          <RadarChart/>
        </div>

        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Skill RAG Status · Avg PL vs Role-Weighted Required PL</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {SKILLS.map(k=>{
              const avg=teamAvgPL(k), req=roleReqPL(k), gap=+(req-avg).toFixed(1), color=ragColPL(avg,req);
              return (
                <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0,boxShadow:`0 0 6px ${color}70`}}/>
                  <span style={{fontSize:11,color:C.text,fontWeight:600,width:84,flexShrink:0}}>{k}</span>
                  <div style={{flex:1,height:9,background:C.bg,borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${req/5*100}%`,background:`${C.blue}18`,borderRadius:4}}/>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${avg/5*100}%`,background:color,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color,width:28,textAlign:"right"}}>PL{avg}</span>
                  <span style={{fontSize:9,color:C.text3,width:12,textAlign:"center"}}>/</span>
                  <span style={{fontSize:10,color:C.blue,width:28}}>PL{req}</span>
                  <span style={{fontSize:9,padding:"1px 5px",borderRadius:5,background:gap>0?"#E5484D12":"#18B98212",color:gap>0?"#E5484D":"#18B982",fontWeight:700,width:36,textAlign:"center"}}>
                    {gap>0?`−${gap}`:"✓"}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:10,display:"flex",gap:14,fontSize:9,color:C.text3,borderTop:`1px solid ${C.border}`,paddingTop:10}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#18B982",display:"inline-block"}}/>At required PL</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#F5A623",display:"inline-block"}}/>1 PL below</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#E5484D",display:"inline-block"}}/>2+ PLs below</span>
          </div>
        </div>
      </div>

      {/* ── Section 2: Heatmap ──────────────────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>Team Skill Heatmap</div>
          <div style={{fontSize:9,color:C.text3}}>— each cell: <b>current PL / required PL</b> for that associate's role</div>
          <div style={{marginLeft:"auto",display:"flex",gap:8,fontSize:9}}>
            {[[PL_COL[5],"At target"],[PL_COL[2],"1 PL below"],["#E5484D","2+ below"]].map(([c,l])=>(
              <span key={l} style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:`${c}20`,border:`1px solid ${c}`,display:"inline-block"}}/>{l}</span>
            ))}
          </div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 4px",fontSize:11}}>
            <thead>
              <tr>
                <th style={{textAlign:"left",padding:"4px 10px",fontSize:10,color:C.text3,fontWeight:700,minWidth:140}}>Member · Role</th>
                {SKILLS.map(k=><th key={k} style={{padding:"4px 4px",fontSize:9,color:C.text3,fontWeight:700,textAlign:"center",minWidth:72}}>{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {TEAM.map(m=>(
                <tr key={m.name}>
                  <td style={{padding:"4px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Av m={m} size={26}/>
                      <div>
                        <div style={{fontSize:11,fontWeight:700,color:C.text}}>{m.name}</div>
                        <div style={{fontSize:9,color:C.text3}}>{m.role} · {m.level}</div>
                      </div>
                    </div>
                  </td>
                  {SKILLS.map(k=>{
                    const pl=xpToPL(m.skills[k].xp), req=ROLE_REQ[m.role]?.[k]||3;
                    const fg=cellFg(m,k), bg=cellBg(m,k);
                    return (
                      <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                        <div style={{padding:"5px 3px",borderRadius:9,background:bg,border:`1px solid ${fg}35`,lineHeight:1.2}}>
                          <div style={{fontSize:10,fontWeight:800,color:fg}}>PL{pl}</div>
                          <div style={{fontSize:8,color:C.text3,fontWeight:500}}>/PL{req}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td style={{padding:"6px 10px",fontSize:10,fontWeight:700,color:C.text3}}>Team Avg</td>
                {SKILLS.map(k=>{
                  const avg=teamAvgPL(k), req=roleReqPL(k), axp=teamAvgXP(k);
                  const c=ragColPL(avg,req);
                  return (
                    <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                      <div style={{padding:"5px 3px",borderRadius:9,background:`${c}18`,border:`1px solid ${c}50`,lineHeight:1.2}}>
                        <div style={{fontSize:10,fontWeight:800,color:c}}>PL{avg}</div>
                        <div style={{fontSize:8,color:C.text3,fontWeight:500}}>/PL{req}</div>
                        <div style={{fontSize:7,color:C.text3,marginTop:1}}>{axp} XP</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Skill Velocity & Time to Competence ──────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"20px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>⚡ Skill Velocity & Time to Competence</div>
          <span style={{marginLeft:"auto",padding:"2px 8px",borderRadius:6,background:`${C.blue}15`,color:C.blue,fontSize:9,fontWeight:700}}>Q2 2026 · 1 Jan – 31 Mar baseline</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          {/* Velocity bars */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Avg Skill XP Gained · This Quarter</div>
            {SKILLS.map(k=>{
              const vel=skillVel(k);
              return (
                <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                  <span style={{fontSize:11,fontWeight:600,color:C.text,width:90,flexShrink:0}}>{k}</span>
                  <div style={{flex:1,height:9,background:C.bg,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${vel/maxVel*100}%`,background:`linear-gradient(90deg,${C.blue},${C.blue2})`,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color:C.blue,width:60,textAlign:"right"}}>+{vel} XP/Q</span>
                </div>
              );
            })}
            <div style={{marginTop:12,padding:"10px 12px",borderRadius:9,background:C.bg,fontSize:11,color:C.text3}}>
              Velocity = XP gained this quarter vs Q1 baseline. Higher velocity → faster PL progression.
            </div>
          </div>
          {/* TTC table */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Days to Target PL · At Current Velocity</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",fontSize:10,borderCollapse:"separate",borderSpacing:"0 3px"}}>
                <thead>
                  <tr>
                    <th style={{textAlign:"left",padding:"3px 6px",color:C.text3,fontWeight:700,fontSize:9,minWidth:80}}>Member</th>
                    {SKILLS.map(k=><th key={k} style={{padding:"3px 4px",color:C.text3,fontWeight:700,fontSize:8,textAlign:"center",minWidth:52}}>{k}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {TEAM.map(m=>(
                    <tr key={m.name}>
                      <td style={{padding:"3px 6px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <Av m={m} size={18}/>
                          <span style={{fontSize:10,fontWeight:600,color:C.text}}>{m.name.split(" ")[0]}</span>
                        </div>
                      </td>
                      {SKILLS.map(k=>{
                        const days=memberTTC(m,k);
                        const bg=days===null?"#18B98218":days<=90?"#18B98218":days<=180?"#F5A62318":"#E5484D18";
                        const fg=days===null?"#18B982":days<=90?"#18B982":days<=180?"#F5A623":"#E5484D";
                        const lbl=days===null?"✓":days>=365?">1yr":days>=180?`${Math.round(days/30)}mo`:`${days}d`;
                        return (
                          <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                            <div style={{padding:"3px",borderRadius:6,background:bg,border:`1px solid ${fg}30`,fontSize:9,fontWeight:700,color:fg}}>{lbl}</div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:8,fontSize:9,color:C.text3}}>
              {[["#18B982","✓ Target achieved"],["#18B982","≤ 90 days"],["#F5A623","91–180 days"],["#E5484D","> 180 days"]].map(([c,l])=>(
                <span key={l} style={{display:"flex",alignItems:"center",gap:3}}><span style={{width:8,height:8,borderRadius:2,background:`${c}20`,border:`1px solid ${c}`,display:"inline-block"}}/>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Gap Analysis + AI Actions (with Top Learners/Certs) ──── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>📉 Skill Gap Analysis · PL vs Required PL</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SKILLS.map(k=>{
                const avg=teamAvgPL(k), req=roleReqPL(k), gap=+(req-avg).toFixed(1), color=ragColPL(avg,req);
                return (
                  <div key={k}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <span style={{fontSize:11,fontWeight:600,color:C.text}}>{k}</span>
                      <div style={{display:"flex",gap:6,alignItems:"center"}}>
                        {plTag(Math.round(avg))}
                        <span style={{fontSize:9,color:C.text3}}>→</span>
                        {plTag(Math.round(req))}
                        <span style={{fontSize:9,padding:"1px 5px",borderRadius:5,background:gap>0?"#E5484D12":"#18B98212",color:gap>0?"#E5484D":"#18B982",fontWeight:700}}>
                          {gap>0?`−${gap}`:"✓"}
                        </span>
                      </div>
                    </div>
                    <div style={{height:9,background:C.bg,borderRadius:4,overflow:"hidden",position:"relative"}}>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${req/5*100}%`,background:`${C.blue}18`,borderRadius:4}}/>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${avg/5*100}%`,background:color,borderRadius:4}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"14px"}}>
              <div style={{fontSize:10,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>🏆 Top Learners</div>
              {[...TEAM].sort((a,b)=>b.xp-a.xp).slice(0,3).map((m,i)=>(
                <div key={m.name} style={{display:"flex",alignItems:"center",gap:7,marginBottom:i<2?8:0}}>
                  <div style={{fontSize:12,color:["#F5A623","#8A94A6","#C87941"][i],fontWeight:700,width:16}}>{"①②③"[i]}</div>
                  <Av m={m} size={22}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.text}}>{m.name.split(" ")[0]}</div>
                    <div style={{fontSize:9,color:C.text3}}>{m.xp.toLocaleString()} XP</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"14px"}}>
              <div style={{fontSize:10,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>📜 Certifications</div>
              {TEAM.map(m=>(
                <div key={m.name} style={{display:"flex",alignItems:"center",gap:6,marginBottom:7}}>
                  <Av m={m} size={20}/>
                  <span style={{flex:1,fontSize:10,fontWeight:600,color:C.text}}>{m.name.split(" ")[0]}</span>
                  <span style={{padding:"1px 6px",borderRadius:6,background:`${certCol(m.certStatus)}15`,color:certCol(m.certStatus),fontSize:8,fontWeight:700,whiteSpace:"nowrap"}}>{certLbl(m.certStatus)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>🤖 AI Recommended Actions</div>
            <span style={{marginLeft:"auto",padding:"2px 7px",borderRadius:6,background:`${C.blue}15`,color:C.blue,fontSize:9,fontWeight:700}}>TDA</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {AI_ACTIONS.map((a,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${a.color}22`}}>
                <div style={{width:30,height:30,borderRadius:8,background:`${a.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:5,marginBottom:3,alignItems:"flex-start"}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.text,flex:1,lineHeight:1.3}}>{a.title}</div>
                    <span style={{fontSize:8,padding:"1px 5px",borderRadius:4,background:`${a.color}15`,color:a.color,fontWeight:700,flexShrink:0}}>{a.tag}</span>
                  </div>
                  <div style={{fontSize:10,color:C.text3,lineHeight:1.5}}>{a.desc}</div>
                </div>
                <button onClick={()=>setAssigned(p=>({...p,[i]:true}))} style={{flexShrink:0,alignSelf:"center",padding:"5px 10px",borderRadius:7,border:"none",background:assigned[i]?"#18B98218":`${a.color}15`,color:assigned[i]?"#18B982":a.color,fontSize:9,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {assigned[i]?"✓ Done":"Assign"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 5: Learning Interventions ───────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"20px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${C.blue}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📚</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:C.text}}>Team Learning Interventions</div>
            <div style={{fontSize:11,color:C.text3}}>Courses, assessments, projects & microlearnings completed this quarter. Evidence for PL review.</div>
          </div>
          <div style={{marginLeft:"auto",padding:"4px 10px",borderRadius:8,background:"#18B98218",fontSize:10,color:"#18B982",fontWeight:700}}>{INTERVENTIONS.length} activities logged</div>
        </div>
        {/* Member filter */}
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
          <button onClick={()=>setIntFilter(null)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${!intFilter?C.blue:C.border}`,background:!intFilter?C.blue3:C.bg,color:!intFilter?C.blue:C.text3,fontSize:11,fontWeight:700,cursor:"pointer"}}>All</button>
          {TEAM.map(m=>{
            const sel=intFilter===m.name;
            return (
              <button key={m.name} onClick={()=>setIntFilter(sel?null:m.name)} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderRadius:20,border:`1.5px solid ${sel?m.col:C.border}`,background:sel?`${m.col}18`:C.bg,color:sel?m.col:C.text3,fontSize:11,fontWeight:sel?700:400,cursor:"pointer"}}>
                <Av m={m} size={14}/>{m.name.split(" ")[0]}
              </button>
            );
          })}
        </div>
        {/* Intervention rows */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {INTERVENTIONS.filter(iv=>!intFilter||iv.p===intFilter).map((iv,i)=>{
            const typeCol={course:C.blue,assess:C.green,project:"#9B59B6",micro:"#F5A623"}[iv.type]||C.blue;
            const tm=TEAM.find(m=>m.name===iv.p);
            return (
              <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                <div style={{width:28,height:28,borderRadius:8,background:`${typeCol}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{iv.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{iv.title}</div>
                  <div style={{display:"flex",gap:6,marginTop:3,flexWrap:"wrap"}}>
                    {tm && !intFilter && <span style={{fontSize:9,color:tm.col,fontWeight:700}}>{iv.p.split(" ")[0]}</span>}
                    <span style={{fontSize:9,padding:"1px 5px",borderRadius:4,background:`${typeCol}15`,color:typeCol,fontWeight:700}}>{iv.type}</span>
                    <span style={{fontSize:9,padding:"1px 5px",borderRadius:4,background:C.blue3,color:C.blue,fontWeight:600}}>{iv.sk}</span>
                    <span style={{fontSize:9,color:C.text3}}>{iv.date}</span>
                  </div>
                </div>
                <div style={{flexShrink:0,textAlign:"right"}}>
                  <div style={{fontSize:10,fontWeight:800,color:C.blue}}>+{iv.xp} XP</div>
                  {iv.score!==null && (
                    <div style={{fontSize:9,padding:"1px 5px",borderRadius:4,background:iv.score>=80?"#18B98218":iv.score>=60?"#F5A62318":"#E5484D18",color:iv.score>=80?"#18B982":iv.score>=60?"#F5A623":"#E5484D",fontWeight:700,marginTop:2}}>{iv.score}%</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section 6: PL Year-End Review ───────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid #F5A62335`,borderRadius:14,padding:"20px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <div style={{width:36,height:36,borderRadius:10,background:"#F5A62318",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏅</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:C.text}}>PL Year-End Review · Manager Approval</div>
            <div style={{fontSize:11,color:C.text3}}>Members who have crossed a PL threshold this quarter. PL officially advances only upon manager approval at year-end.</div>
          </div>
          <div style={{marginLeft:"auto",padding:"4px 10px",borderRadius:8,background:"#F5A62318",fontSize:10,color:"#F5A623",fontWeight:700,border:"1px solid #F5A62335"}}>Pending Approval</div>
        </div>
        <div style={{padding:"10px 12px",borderRadius:9,background:"#F5A62308",border:"1px solid #F5A62320",fontSize:11,color:C.text3,marginBottom:16,lineHeight:1.6}}>
          Members earn XP throughout the year through courses, assessments, and projects — this closes their skill gap %. The official <b style={{color:C.text}}>PL level number</b> only advances at year-end when the manager reviews evidence and approves.
        </div>
        {TEAM.map(m=>{
          const pending=SKILLS.filter(k=>{
            const s=m.skills[k];
            return xpToPL(s.xp)>xpToPL(s.prevXpQ) && xpToPL(s.xp)<=s.targetPL;
          });
          if(!pending.length) return null;
          return (
            <div key={m.name} style={{marginBottom:16,padding:"14px",borderRadius:12,background:C.bg,border:`1px solid ${C.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <Av m={m} size={30}/>
                <div>
                  <div style={{fontSize:12,fontWeight:800,color:C.text}}>{m.name}</div>
                  <div style={{fontSize:10,color:C.text3}}>{m.role} · {m.level} · {pending.length} skill{pending.length>1?"s":""} ready for PL upgrade</div>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {pending.map(k=>{
                  const s=m.skills[k], prevPL=xpToPL(s.prevXpQ), currPL=xpToPL(s.xp);
                  const key=`${m.name}_${k}`, approved=plApproved[key];
                  const evidence=INTERVENTIONS.filter(iv=>iv.p===m.name&&iv.sk===k);
                  return (
                    <div key={k} style={{padding:"10px 12px",borderRadius:10,background:approved?"#18B98212":"#fff",border:`1.5px solid ${approved?"#18B982":"#F5A623"}35`,minWidth:200,flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                        <span style={{fontSize:11,fontWeight:700,color:C.text}}>{k}</span>
                        <span style={{display:"flex",alignItems:"center",gap:4,marginLeft:"auto"}}>
                          {plTag(prevPL)}
                          <span style={{fontSize:10,color:C.text3}}>→</span>
                          {plTag(currPL)}
                        </span>
                      </div>
                      <div style={{fontSize:9,color:C.text3,marginBottom:6}}>{PL_LABELS[prevPL]} → <b style={{color:PL_COL[currPL]}}>{PL_LABELS[currPL]}</b></div>
                      {evidence.length>0 && (
                        <div style={{fontSize:9,color:C.text3,marginBottom:8}}>
                          Evidence: {evidence.map(e=>`${e.type} (${e.score?e.score+"%":"done"}, +${e.xp}XP)`).join(" · ")}
                        </div>
                      )}
                      <button onClick={()=>setPlApproved(p=>({...p,[key]:!p[key]}))}
                        style={{width:"100%",padding:"6px",borderRadius:7,border:"none",background:approved?"#18B982":`linear-gradient(135deg,${C.blue},${C.blue2})`,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                        {approved?"✓ Approved — PL Upgrade Confirmed":"Approve PL Upgrade"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {TEAM.every(m=>SKILLS.filter(k=>{const s=m.skills[k];return xpToPL(s.xp)>xpToPL(s.prevXpQ)&&xpToPL(s.xp)<=s.targetPL;}).length===0) && (
          <div style={{textAlign:"center",padding:"24px",color:C.text3,fontSize:12}}>No pending PL upgrades this quarter.</div>
        )}
      </div>

      {/* ── Section 7: Learning Analytics ───────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"20px",marginBottom:24}}>
        <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:18}}>📈 Team Learning Analytics</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Monthly Learning Hours · Team Total</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120,padding:"0 4px"}}>
              {MONTHLY.map(d=>(
                <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%",justifyContent:"flex-end"}}>
                  <div style={{fontSize:9,fontWeight:700,color:d.m==="May"?C.blue:C.text3}}>{d.v}h</div>
                  <div style={{width:"100%",background:d.m==="May"?C.blue:`${C.blue}45`,borderRadius:"4px 4px 0 0",height:`${(d.v/maxH)*100}px`}}/>
                  <div style={{fontSize:9,color:d.m==="May"?C.blue:C.text3,fontWeight:d.m==="May"?700:400}}>{d.m}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Individual Performance · May 2026</div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {[...TEAM].sort((a,b)=>b.hoursMonth-a.hoursMonth).map(m=>(
                <div key={m.name} style={{display:"flex",alignItems:"center",gap:8}}>
                  <Av m={m} size={24}/>
                  <div style={{width:90,flexShrink:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.text}}>{m.name.split(" ")[0]}</div>
                    <div style={{fontSize:9,color:C.text3}}>{m.completions} done</div>
                  </div>
                  <div style={{flex:1,height:7,background:C.bg,borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${m.hoursMonth/14*100}%`,background:m.col,borderRadius:3}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:m.col,width:26}}>{m.hoursMonth}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 8: Risk Alerts + Recognition ────────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        <div style={{background:C.white,border:`1.5px solid #E5484D20`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>⚠️ Workforce Risk Alerts</div>
          {RISK_ALERTS.map((r,i)=>{
            const c=r.sev==="red"?"#E5484D":"#F5A623";
            return (
              <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:`${c}0c`,border:`1px solid ${c}28`,marginBottom:i<RISK_ALERTS.length-1?8:0}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:c,marginTop:4,flexShrink:0,boxShadow:`0 0 6px ${c}60`}}/>
                <div style={{flex:1,fontSize:11,color:C.text,lineHeight:1.55}}>{r.text}</div>
                <button style={{flexShrink:0,alignSelf:"flex-start",padding:"4px 8px",borderRadius:6,border:"none",background:`${c}15`,color:c,fontSize:9,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{r.action}</button>
              </div>
            );
          })}
        </div>
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>🏅 Recognition & Engagement</div>
          {TEAM.map(m=>(
            <div key={m.name} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`,marginBottom:8}}>
              <Av m={m} size={30}/>
              <div style={{flex:1}}>
                <div style={{fontSize:11,fontWeight:700,color:C.text}}>{m.name}</div>
                <div style={{fontSize:9,color:C.text3}}>{m.hoursMonth}h · {m.completions} completions</div>
              </div>
              <div style={{display:"flex",gap:4}}>
                <button onClick={()=>setAppreciated(p=>({...p,[m.name]:true}))} style={{padding:"3px 8px",borderRadius:6,border:"none",background:appreciated[m.name]?"#18B98218":"#F5A62318",color:appreciated[m.name]?"#18B982":"#F5A623",fontSize:9,fontWeight:700,cursor:"pointer"}}>
                  {appreciated[m.name]?"✓":"👏"}
                </button>
                <button style={{padding:"3px 8px",borderRadius:6,border:"none",background:`${C.blue}15`,color:C.blue,fontSize:9,fontWeight:700,cursor:"pointer"}}>🏅</button>
                <button style={{padding:"3px 8px",borderRadius:6,border:"none",background:"#9B59B615",color:"#9B59B6",fontSize:9,fontWeight:700,cursor:"pointer"}}>⭐ SME</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 9: Recommend Learnings ──────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"22px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${C.blue}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📋</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:C.text}}>Recommend Learnings to Team</div>
            <div style={{fontSize:11,color:C.text3}}>Select members and assign courses or microlearnings with a personal note.</div>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:8}}>1 · Select Members</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            <button onClick={toggleAll} style={{padding:"6px 14px",borderRadius:20,border:`1.5px solid ${selMembers.length===TEAM.length?C.blue:C.border}`,background:selMembers.length===TEAM.length?C.blue3:C.bg,color:selMembers.length===TEAM.length?C.blue:C.text3,fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {selMembers.length===TEAM.length?"✓ All Selected":"Select All"}
            </button>
            {TEAM.map(m=>{
              const sel=selMembers.includes(m.name);
              return (
                <button key={m.name} onClick={()=>toggleMember(m.name)} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,border:`1.5px solid ${sel?m.col:C.border}`,background:sel?`${m.col}18`:C.bg,color:sel?m.col:C.text3,fontSize:11,fontWeight:sel?700:400,cursor:"pointer"}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:m.col,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800}}>{m.init}</div>
                  {m.name.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:8}}>2 · Select Courses / Microlearnings</div>
          <div style={{position:"relative"}}>
            <input value={contentQ} onChange={e=>{setContentQ(e.target.value);setDropOpen(true);}} onFocus={()=>setDropOpen(true)}
              placeholder="Search courses or microlearnings…"
              style={{width:"100%",padding:"9px 14px",borderRadius:10,border:`1.5px solid ${dropOpen?C.blue:C.border}`,fontSize:12,color:C.text,background:C.white,outline:"none"}}/>
            {dropOpen && (
              <div style={{position:"absolute",left:0,right:0,top:"100%",marginTop:4,background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,boxShadow:"0 8px 24px #0E172618",zIndex:50,maxHeight:220,overflowY:"auto"}}>
                {filteredContent.length===0 && <div style={{padding:"14px 16px",fontSize:12,color:C.text3}}>No results</div>}
                {filteredContent.map(c=>{
                  const sel=!!selContent.find(x=>x.id===c.id);
                  return (
                    <div key={c.id} onClick={()=>{toggleContent(c);setDropOpen(false);setContentQ("");}}
                      style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",cursor:"pointer",background:sel?C.blue3:C.white,borderBottom:`1px solid ${C.border}`}}
                      onMouseEnter={e=>e.currentTarget.style.background=sel?C.blue3:C.bg}
                      onMouseLeave={e=>e.currentTarget.style.background=sel?C.blue3:C.white}>
                      <span style={{fontSize:16}}>{c.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:sel?700:400,color:C.text}}>{c.title}</div>
                        <div style={{fontSize:9,color:C.text3}}>{c.source} · {c.duration}</div>
                      </div>
                      <span style={{padding:"2px 6px",borderRadius:6,background:c.type==="micro"?"#F5A62318":"#0080C718",color:c.type==="micro"?"#F5A623":C.blue,fontSize:9,fontWeight:700}}>{c.type}</span>
                      {sel && <span style={{color:C.blue,fontWeight:700,fontSize:12}}>✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {selContent.length>0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
              {selContent.map(c=>(
                <div key={c.id} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:20,background:c.type==="micro"?"#F5A62318":"#0080C718",border:`1px solid ${c.type==="micro"?"#F5A62340":"#0080C740"}`}}>
                  <span style={{fontSize:11}}>{c.icon}</span>
                  <span style={{fontSize:11,color:C.text,fontWeight:600}}>{c.title}</span>
                  <button onClick={()=>toggleContent(c)} style={{background:"none",border:"none",cursor:"pointer",color:C.text3,fontSize:13,lineHeight:1,padding:"0 0 0 2px"}}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:8}}>3 · Add a Personal Note <span style={{fontWeight:400}}>(optional)</span></div>
          <textarea value={recMsg} onChange={e=>setRecMsg(e.target.value)} rows={3} placeholder="e.g. Hi team, please complete this before our June review session…"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:12,color:C.text,resize:"vertical",outline:"none",fontFamily:"'DM Sans',sans-serif"}}/>
        </div>
        {recSent ? (
          <div style={{padding:"14px 20px",borderRadius:12,background:"#18B98218",border:"1.5px solid #18B98240",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>✅</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#18B982"}}>Assigned successfully!</div>
              <div style={{fontSize:11,color:C.text3}}>{selContent.length} item{selContent.length>1?"s":""} assigned to {selMembers.length} member{selMembers.length>1?"s":""}. They'll see it in their ULIP dashboard.</div>
            </div>
          </div>
        ) : (
          <button onClick={handleAssign} disabled={!selMembers.length||!selContent.length}
            style={{padding:"12px 28px",borderRadius:11,border:"none",background:selMembers.length&&selContent.length?`linear-gradient(135deg,${C.blue},${C.blue2})`:"#e0e7ef",color:selMembers.length&&selContent.length?"#fff":"#aab",fontSize:13,fontWeight:700,cursor:selMembers.length&&selContent.length?"pointer":"not-allowed",boxShadow:selMembers.length&&selContent.length?`0 4px 16px ${C.blue}40`:"none"}}>
            Assign to {selMembers.length||"—"} member{selMembers.length!==1?"s":""} →
          </button>
        )}
      </div>

      {/* ── KPI Detail Modal ─────────────────────────────────────────────────── */}
      {modal && (
        <Modal title={modal} onClose={()=>setModal(null)}>
          {kpiDetails[modal]}
        </Modal>
      )}
    </div>
  );
}
