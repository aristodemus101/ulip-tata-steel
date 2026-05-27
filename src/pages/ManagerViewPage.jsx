import { useState } from "react";
import C from "../theme";

/* ─── Team data ─────────────────────────────────────────────────────────────── */
const TEAM = [
  { name:"Ravi Kumar",    init:"RK", col:"#0080C7", level:"IL3", role:"TQM Associate",      xp:3240, hoursMonth:8,  completions:12, certStatus:"valid",    certDue:"Aug 2026", skills:{Safety:82,TQM:78,Digital:45,Maintenance:68,Leadership:60,"Process Ctrl":72,Analytics:38,Compliance:85} },
  { name:"Anil Sharma",   init:"AS", col:"#E5484D", level:"IL2", role:"Maintenance Tech.",  xp:2180, hoursMonth:4,  completions:7,  certStatus:"expired",  certDue:"May 2026", skills:{Safety:75,TQM:55,Digital:35,Maintenance:82,Leadership:42,"Process Ctrl":65,Analytics:28,Compliance:78} },
  { name:"Deepak Yadav",  init:"DY", col:"#18B982", level:"IL4", role:"BF Operator",        xp:4820, hoursMonth:14, completions:18, certStatus:"valid",    certDue:"Dec 2026", skills:{Safety:90,TQM:70,Digital:58,Maintenance:78,Leadership:72,"Process Ctrl":88,Analytics:52,Compliance:92} },
  { name:"Suresh Patel",  init:"SP", col:"#F5A623", level:"IL3", role:"Safety Engineer",    xp:3560, hoursMonth:10, completions:14, certStatus:"valid",    certDue:"Oct 2026", skills:{Safety:95,TQM:62,Digital:42,Maintenance:60,Leadership:55,"Process Ctrl":70,Analytics:45,Compliance:90} },
  { name:"Mohan Singh",   init:"MS", col:"#9B59B6", level:"IL2", role:"TQM Technician",     xp:2640, hoursMonth:5,  completions:9,  certStatus:"expiring", certDue:"Jun 2026", skills:{Safety:72,TQM:75,Digital:30,Maintenance:55,Leadership:48,"Process Ctrl":62,Analytics:32,Compliance:80} },
  { name:"Pradeep Kumar", init:"PK", col:"#FF6B35", level:"IL3", role:"Digital Technician", xp:2940, hoursMonth:9,  completions:11, certStatus:"valid",    certDue:"Sep 2026", skills:{Safety:68,TQM:58,Digital:72,Maintenance:50,Leadership:52,"Process Ctrl":58,Analytics:68,Compliance:75} },
];

/* ─── Role-specific required levels ─────────────────────────────────────────── */
const ROLE_REQ = {
  "TQM Associate":      {Safety:80,TQM:82,Digital:60,Maintenance:58,Leadership:62,"Process Ctrl":68,Analytics:55,Compliance:80},
  "Maintenance Tech.":  {Safety:85,TQM:58,Digital:52,Maintenance:88,Leadership:48,"Process Ctrl":72,Analytics:42,Compliance:80},
  "BF Operator":        {Safety:90,TQM:68,Digital:60,Maintenance:82,Leadership:70,"Process Ctrl":92,Analytics:55,Compliance:90},
  "Safety Engineer":    {Safety:95,TQM:62,Digital:55,Maintenance:62,Leadership:65,"Process Ctrl":70,Analytics:50,Compliance:95},
  "TQM Technician":     {Safety:78,TQM:80,Digital:55,Maintenance:60,Leadership:55,"Process Ctrl":65,Analytics:50,Compliance:80},
  "Digital Technician": {Safety:75,TQM:52,Digital:82,Maintenance:52,Leadership:55,"Process Ctrl":58,Analytics:72,Compliance:75},
};

const SKILLS   = ["Safety","TQM","Digital","Maintenance","Leadership","Process Ctrl","Analytics","Compliance"];
const MONTHLY  = [{m:"Dec",v:38},{m:"Jan",v:45},{m:"Feb",v:52},{m:"Mar",v:48},{m:"Apr",v:60},{m:"May",v:50}];

const teamAvg   = k => Math.round(TEAM.reduce((s,m)=>s+m.skills[k],0)/TEAM.length);
const ragCol    = v => v>=75?"#18B982":v>=50?"#F5A623":"#E5484D";
const certCol   = s => ({valid:"#18B982",expiring:"#F5A623",expired:"#E5484D"}[s]);
const certLbl   = s => ({valid:"Valid ✓",expiring:"Expiring ⚠",expired:"Expired ✗"}[s]);
const cellFg    = (curr,req) => curr>=req?"#18B982":curr>=req-10?"#F5A623":"#E5484D";
const cellBg    = (curr,req) => curr>=req?"#18B98218":curr>=req-10?"#F5A62318":"#E5484D18";

const RISK_ALERTS = [
  {sev:"red",   text:"Anil Sharma's safety certification expired (May 2026). Must not perform critical tasks until renewed.",           action:"Assign Renewal"},
  {sev:"red",   text:`Analytics avg at ${teamAvg("Analytics")}% — 16 pts below the 60% required threshold. Zero members at proficiency.`, action:"View Plan"},
  {sev:"amber", text:"Mohan Singh's certification expires in 12 days (Jun 2026). Initiate renewal this week.",                         action:"Schedule Now"},
  {sev:"amber", text:`Team Digital skills at ${teamAvg("Digital")}% avg — 18 pts below the 65% target. 4 of 6 members need upskilling.`, action:"Assign Course"},
  {sev:"amber", text:"Pradeep Kumar has not completed a safety refresher in 90+ days. Compliance risk flagged.",                       action:"Send Reminder"},
];

const AI_ACTIONS = [
  {icon:"📚",color:"#0080C7",title:"Assign Data Analytics Cohort",          desc:"4 members below Analytics threshold. EdNext cohort starts Jun 3.",        tag:"Skill Gap"},
  {icon:"🔄",color:"#E5484D",title:"Initiate Cert Renewal — Anil & Mohan",  desc:"Expired/expiring certs detected. Auto-enroll in SOE Safety refresher.",   tag:"Urgent"},
  {icon:"🤝",color:"#9B59B6",title:"Connect with Priya K. (Analytics SME)", desc:"Arrange SME session on Data Analytics basics for 4 under-performers.",    tag:"SME Session"},
  {icon:"⚡",color:"#18B982",title:"Digital Upskilling Microlearning Series",desc:"Assign 5-part IIoT & Digital Tools series to 4 members.",                 tag:"Microlearning"},
  {icon:"🎯",color:"#F5A623",title:"Leadership Bootcamp — Q3 Batch",        desc:"55% avg leadership score. 4 members below target. Nominate for July.",    tag:"Leadership"},
];

const CONTENT_OPTIONS = [
  {id:"c1",type:"course", icon:"📘",title:"Data Analytics Fundamentals",        source:"EdNext",   duration:"3h"},
  {id:"c2",type:"course", icon:"📘",title:"PLC Architecture & I/O Modules",     source:"SumTotal", duration:"2h"},
  {id:"c3",type:"course", icon:"📘",title:"Six Sigma Yellow Belt Prep",          source:"EdNext",   duration:"4h"},
  {id:"c4",type:"course", icon:"📘",title:"Leadership & Communication Essentials",source:"EdNext",  duration:"2h"},
  {id:"c5",type:"course", icon:"📘",title:"Predictive Maintenance Fundamentals", source:"SumTotal", duration:"3h"},
  {id:"m1",type:"micro",  icon:"⚡",title:"7 Steps of Autonomous Maintenance",   source:"ULIP",     duration:"2 min"},
  {id:"m2",type:"micro",  icon:"⚡",title:"Fire Safety & Extinguisher Use",      source:"ULIP",     duration:"3 min"},
  {id:"m3",type:"micro",  icon:"⚡",title:"LOTO Procedure — Step by Step",       source:"ULIP",     duration:"3 min"},
  {id:"m4",type:"micro",  icon:"⚡",title:"What is Kaizen? 90-sec Explainer",    source:"ULIP",     duration:"2 min"},
  {id:"m5",type:"micro",  icon:"⚡",title:"Reading a Control Chart (SPC)",       source:"ULIP",     duration:"2 min"},
];

/* ─── Avatar helper ──────────────────────────────────────────────────────────── */
const Av = ({m,size=26}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:m.col,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.34,fontWeight:800,flexShrink:0}}>{m.init}</div>
);

/* ─── Radar Chart with hover tooltips ───────────────────────────────────────── */
function RadarChart() {
  const [tip, setTip] = useState(null);
  const cx=200, cy=185, r=90, n=SKILLS.length;
  const angle = i => (i*2*Math.PI/n) - Math.PI/2;
  const pt    = (i,pct) => [cx + r*pct*Math.cos(angle(i)), cy + r*pct*Math.sin(angle(i))];
  const avgPts = SKILLS.map((_,i)=>pt(i,teamAvg(SKILLS[i])/100).join(",")).join(" ");
  const reqPts = SKILLS.map((k,i)=>{ const RR=TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||85),0)/TEAM.length; return pt(i,RR/100).join(","); }).join(" ");

  return (
    <svg width={400} height={370}>
      {[0.25,0.5,0.75,1].map(lv=>(
        <polygon key={lv} points={SKILLS.map((_,i)=>pt(i,lv).join(",")).join(" ")} fill="none" stroke="#DDE6EF" strokeWidth={1}/>
      ))}
      {SKILLS.map((_,i)=>{const [x,y]=pt(i,1);return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#DDE6EF" strokeWidth={1}/>;})  }
      <polygon points={reqPts} fill="rgba(245,166,35,0.07)" stroke="#F5A623" strokeWidth={1.5} strokeDasharray="4 3"/>
      <polygon points={avgPts} fill="rgba(0,128,199,0.18)" stroke="#0080C7" strokeWidth={2}/>
      {SKILLS.map((k,i)=>{
        const [x,y]=pt(i,teamAvg(k)/100);
        const isHov = tip?.i===i;
        return (
          <circle key={i} cx={x} cy={y} r={isHov?6:4}
            fill={isHov?"#003D6B":C.blue} stroke="#fff" strokeWidth={1.5}
            style={{cursor:"pointer",transition:"r 0.15s"}}
            onMouseEnter={()=>setTip({i,x,y,k,v:teamAvg(k)})}
            onMouseLeave={()=>setTip(null)}
          />
        );
      })}
      {tip && (()=>{
        const {x,y,k,v}=tip;
        const tw=84, th=34;
        const tx = x<cx ? x-tw-8 : x+8;
        const ty = Math.min(336-th, Math.max(0, y-th/2));
        return (
          <g style={{pointerEvents:"none"}}>
            <rect x={tx} y={ty} width={tw} height={th} rx={7} fill="#001E3C" opacity={0.92}/>
            <text x={tx+tw/2} y={ty+11} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.7)" fontFamily="'DM Sans',sans-serif">{k}</text>
            <text x={tx+tw/2} y={ty+25} textAnchor="middle" fontSize={13} fontWeight={800} fill="#FFD166" fontFamily="'DM Sans',sans-serif">{v}%</text>
          </g>
        );
      })()}
      {SKILLS.map((k,i)=>{
        const [x,y]=pt(i,1.28);
        const anchor = x<cx-5?"end":x>cx+5?"start":"middle";
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle"
            fontSize={9} fontWeight={600} fill="#5A7184" fontFamily="'DM Sans',sans-serif">{k}</text>
        );
      })}
      <text x={cx} y={cy-6} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Team</text>
      <text x={cx} y={cy+7} textAnchor="middle" fontSize={9} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Avg</text>
    </svg>
  );
}

/* ─── KPI Detail Modal ───────────────────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════════════════ */
export default function ManagerViewPage() {
  const [modal,         setModal]         = useState(null);
  const [appreciated,   setAppreciated]   = useState({});
  const [assigned,      setAssigned]      = useState({});
  /* recommend state */
  const [selMembers,    setSelMembers]    = useState([]);
  const [selContent,    setSelContent]    = useState([]);
  const [recMsg,        setRecMsg]        = useState("");
  const [contentQ,      setContentQ]      = useState("");
  const [dropOpen,      setDropOpen]      = useState(false);
  const [recSent,       setRecSent]       = useState(false);

  const totalXP     = Math.round(TEAM.reduce((s,m)=>s+m.xp,0)/TEAM.length);
  const critGaps    = SKILLS.filter(k=>{const RR=TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||80),0)/TEAM.length; return teamAvg(k)<RR-10;}).length;
  const totalH      = TEAM.reduce((s,m)=>s+m.hoursMonth,0);
  const completionP = Math.round(TEAM.reduce((s,m)=>s+m.completions,0)/TEAM.length/18*100);
  const maxH        = Math.max(...MONTHLY.map(d=>d.v));

  /* KPI modal content definitions */
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
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Hours spent learning this month per team member. Target is 10h/month per member.</div>
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
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Skills where the team average is more than 10 pts below the role-weighted required threshold.</div>
        {SKILLS.map(k=>{
          const a=teamAvg(k);
          const RR=Math.round(TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||80),0)/TEAM.length);
          const gap=RR-a;
          if(gap<=10) return null;
          return (
            <div key={k} style={{marginBottom:14,padding:"12px 14px",borderRadius:10,background:`${"#E5484D"}0c`,border:"1px solid #E5484D25"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontSize:12,fontWeight:700,color:C.text}}>{k}</span>
                <span style={{fontSize:11,padding:"2px 7px",borderRadius:6,background:"#E5484D18",color:"#E5484D",fontWeight:700}}>Gap: {gap} pts</span>
              </div>
              <div style={{height:7,background:C.bg,borderRadius:3,overflow:"hidden",marginBottom:6,position:"relative"}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${RR}%`,background:"#E5484D18",borderRadius:3}}/>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${a}%`,background:"#E5484D",borderRadius:3}}/>
              </div>
              <div style={{fontSize:10,color:C.text3}}>Current avg: <b style={{color:"#E5484D"}}>{a}%</b> · Required: <b style={{color:C.blue}}>{RR}%</b></div>
            </div>
          );
        })}
      </div>
    ),
    "Completion Rate": (
      <div>
        <div style={{fontSize:12,color:C.text3,marginBottom:16}}>Course and microlearning completion count per team member. Target: 18 completions/member.</div>
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
    {icon:"⭐",label:"Team Skill XP",        value:totalXP.toLocaleString(),  sub:"avg / member",       color:C.blue},
    {icon:"⏱",label:"Learning Hours",        value:totalH,                    sub:"team · this month",  color:"#F5A623"},
    {icon:"⚠️",label:"Critical Skill Gaps",  value:critGaps,                  sub:"skills below target",color:critGaps>3?"#E5484D":"#F5A623"},
    {icon:"✅",label:"Completion Rate",       value:`${completionP}%`,          sub:"avg course rate",    color:C.blue},
  ];

  /* recommend helpers */
  const toggleMember = n => setSelMembers(p=>p.includes(n)?p.filter(x=>x!==n):[...p,n]);
  const toggleAll    = () => setSelMembers(s=>s.length===TEAM.length?[]:TEAM.map(m=>m.name));
  const toggleContent= c => setSelContent(p=>p.find(x=>x.id===c.id)?p.filter(x=>x.id!==c.id):[...p,c]);
  const filteredContent = CONTENT_OPTIONS.filter(c=>c.title.toLowerCase().includes(contentQ.toLowerCase()));

  const handleAssign = () => {
    if(!selMembers.length||!selContent.length) return;
    setRecSent(true);
    setTimeout(()=>{ setRecSent(false); setSelMembers([]); setSelContent([]); setRecMsg(""); setContentQ(""); }, 3500);
  };

  return (
    <div style={{maxWidth:1100,paddingBottom:60}}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${C.blue},${C.blue2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>👔</div>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Manager View</h2>
          <div style={{fontSize:12,color:C.text3}}>Team of {TEAM.length} · H Blast Furnace · TSN · Last updated: Today</div>
        </div>
        <div style={{marginLeft:"auto",padding:"5px 12px",borderRadius:8,background:`${C.blue}15`,fontSize:11,color:C.blue,fontWeight:700,border:`1px solid ${C.blue}25`}}>🤖 TDA AI-Assisted</div>
      </div>

      {/* ── KPI Strip ───────────────────────────────────────────────────── */}
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

      {/* ── Section 1: Team Capability Snapshot ─────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,marginBottom:24}}>

        {/* Radar */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"16px 16px 8px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4,alignSelf:"flex-start",paddingLeft:8}}>Skill Radar</div>
          <div style={{display:"flex",gap:12,fontSize:9,color:C.text3,marginBottom:4,alignSelf:"flex-start",paddingLeft:8}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:2,background:C.blue,display:"inline-block",borderRadius:1}}/>Avg</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:1,borderTop:"2px dashed #F5A623",display:"inline-block"}}/>Required</span>
          </div>
          <RadarChart/>
        </div>

        {/* RAG Indicators */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Skill RAG Status · Avg vs Role-Weighted Required</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {SKILLS.map(k=>{
              const a=teamAvg(k);
              const RR=Math.round(TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||80),0)/TEAM.length);
              const gap=RR-a, color=ragCol(a);
              return (
                <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0,boxShadow:`0 0 6px ${color}70`}}/>
                  <span style={{fontSize:11,color:C.text,fontWeight:600,width:84,flexShrink:0}}>{k}</span>
                  <div style={{flex:1,height:9,background:C.bg,borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${RR}%`,background:`${C.blue}18`,borderRadius:4}}/>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${a}%`,background:color,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color,width:28,textAlign:"right"}}>{a}%</span>
                  <span style={{fontSize:9,color:C.text3,width:16,textAlign:"center"}}>/</span>
                  <span style={{fontSize:10,color:C.blue,width:28}}>{RR}%</span>
                  <span style={{fontSize:9,padding:"1px 5px",borderRadius:5,background:gap>0?"#E5484D12":"#18B98212",color:gap>0?"#E5484D":"#18B982",fontWeight:700,width:34,textAlign:"center"}}>
                    {gap>0?`-${gap}`:"✓"}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:10,display:"flex",gap:14,fontSize:9,color:C.text3,borderTop:`1px solid ${C.border}`,paddingTop:10}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#18B982",display:"inline-block"}}/>≥75 On track</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#F5A623",display:"inline-block"}}/>50–74 Developing</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#E5484D",display:"inline-block"}}/>&lt;50 Critical</span>
          </div>
        </div>

      </div>

      {/* ── Section 2: Heatmap ──────────────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>Team Skill Heatmap</div>
          <div style={{fontSize:9,color:C.text3}}>— each cell shows <b>current / required</b> for that associate's role</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 4px",fontSize:11}}>
            <thead>
              <tr>
                <th style={{textAlign:"left",padding:"4px 10px",fontSize:10,color:C.text3,fontWeight:700,minWidth:140}}>Member · Role</th>
                {SKILLS.map(k=>(
                  <th key={k} style={{padding:"4px 4px",fontSize:9,color:C.text3,fontWeight:700,textAlign:"center",minWidth:74}}>
                    <div style={{lineHeight:1.3}}>{k}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map(m=>{
                const req=ROLE_REQ[m.role]||{};
                return (
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
                      const curr=m.skills[k], r=req[k]||80;
                      const fg=cellFg(curr,r), bg=cellBg(curr,r);
                      return (
                        <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                          <div style={{padding:"5px 3px",borderRadius:9,background:bg,border:`1px solid ${fg}35`,lineHeight:1.2}}>
                            <div style={{fontSize:11,fontWeight:800,color:fg}}>{curr}</div>
                            <div style={{fontSize:8,color:C.text3,fontWeight:500}}>/{r}</div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              <tr>
                <td style={{padding:"6px 10px",fontSize:10,fontWeight:700,color:C.text3}}>Team Avg</td>
                {SKILLS.map(k=>{
                  const a=teamAvg(k);
                  const RR=Math.round(TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||80),0)/TEAM.length);
                  const fg=cellFg(a,RR), bg=cellBg(a,RR);
                  return (
                    <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                      <div style={{padding:"5px 3px",borderRadius:9,background:bg,border:`1px solid ${fg}50`,lineHeight:1.2}}>
                        <div style={{fontSize:11,fontWeight:800,color:fg}}>{a}</div>
                        <div style={{fontSize:8,color:C.text3,fontWeight:500}}>/{RR}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 3: Gap Analysis + AI Actions ────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>📉 Skill Gap Analysis</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {SKILLS.map(k=>{
                const a=teamAvg(k);
                const RR=Math.round(TEAM.reduce((s,m)=>s+(ROLE_REQ[m.role]?.[k]||80),0)/TEAM.length);
                const gap=RR-a, color=ragCol(a);
                return (
                  <div key={k}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <span style={{fontSize:11,fontWeight:600,color:C.text}}>{k}</span>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:10,color:C.text3}}>Avg <b style={{color}}>{a}%</b></span>
                        <span style={{fontSize:10,color:C.text3}}>Req <b style={{color:C.blue}}>{RR}%</b></span>
                        <span style={{fontSize:9,padding:"1px 6px",borderRadius:6,background:gap>0?"#E5484D12":"#18B98212",color:gap>0?"#E5484D":"#18B982",fontWeight:700}}>
                          {gap>0?`-${gap}pts`:"✓"}
                        </span>
                      </div>
                    </div>
                    <div style={{height:9,background:C.bg,borderRadius:4,overflow:"hidden",position:"relative"}}>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${RR}%`,background:`${C.blue}18`,borderRadius:4}}/>
                      <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${a}%`,background:color,borderRadius:4}}/>
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

      {/* ── Section 4: Learning Analytics ───────────────────────────────── */}
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

      {/* ── Section 5: Risk Alerts + Recognition ────────────────────────── */}
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

      {/* ── Section 6: Recommend Learnings ──────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"22px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${C.blue}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>📋</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,color:C.text}}>Recommend Learnings to Team</div>
            <div style={{fontSize:11,color:C.text3}}>Select members and assign courses or microlearnings with a personal note.</div>
          </div>
        </div>

        {/* Member selection */}
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

        {/* Content selector */}
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

        {/* Personal message */}
        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,marginBottom:8}}>3 · Add a Personal Note <span style={{fontWeight:400}}>(optional)</span></div>
          <textarea value={recMsg} onChange={e=>setRecMsg(e.target.value)} rows={3} placeholder="e.g. Hi team, please complete this before our June review session…"
            style={{width:"100%",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:12,color:C.text,resize:"vertical",outline:"none",fontFamily:"'DM Sans',sans-serif"}}/>
        </div>

        {/* Assign button */}
        {recSent ? (
          <div style={{padding:"14px 20px",borderRadius:12,background:"#18B98218",border:"1.5px solid #18B98240",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>✅</span>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#18B982"}}>Assigned successfully!</div>
              <div style={{fontSize:11,color:C.text3}}>{selContent.length} item{selContent.length>1?"s":""} assigned to {selMembers.length} member{selMembers.length>1?"s":""}. They'll see it in their ULIP dashboard.</div>
            </div>
          </div>
        ) : (
          <button onClick={handleAssign}
            disabled={!selMembers.length||!selContent.length}
            style={{padding:"12px 28px",borderRadius:11,border:"none",background:selMembers.length&&selContent.length?`linear-gradient(135deg,${C.blue},${C.blue2})`:"#e0e7ef",color:selMembers.length&&selContent.length?"#fff":"#aab",fontSize:13,fontWeight:700,cursor:selMembers.length&&selContent.length?"pointer":"not-allowed",boxShadow:selMembers.length&&selContent.length?`0 4px 16px ${C.blue}40`:"none"}}>
            Assign to {selMembers.length||"—"} member{selMembers.length!==1?"s":""} →
          </button>
        )}
      </div>

      {/* ── KPI Detail Modal ─────────────────────────────────────────────── */}
      {modal && (
        <Modal title={modal} onClose={()=>setModal(null)}>
          {kpiDetails[modal]}
        </Modal>
      )}
    </div>
  );
}
