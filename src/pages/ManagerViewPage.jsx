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

const SKILLS    = ["Safety","TQM","Digital","Maintenance","Leadership","Process Ctrl","Analytics","Compliance"];
const REQUIRED  = {Safety:85,TQM:75,Digital:65,Maintenance:70,Leadership:65,"Process Ctrl":75,Analytics:60,Compliance:85};
const MONTHLY   = [{m:"Dec",v:38},{m:"Jan",v:45},{m:"Feb",v:52},{m:"Mar",v:48},{m:"Apr",v:60},{m:"May",v:50}];

const avg       = k  => Math.round(TEAM.reduce((s,m)=>s+m.skills[k],0)/TEAM.length);
const ragCol    = v  => v>=75?"#18B982":v>=50?"#F5A623":"#E5484D";
const certCol   = s  => ({valid:"#18B982",expiring:"#F5A623",expired:"#E5484D"}[s]);
const certLbl   = s  => ({valid:"Valid ✓",expiring:"Expiring ⚠",expired:"Expired ✗"}[s]);
const heatBg    = v  => v>=85?"#0080C718":v>=70?"#18B98218":v>=50?"#F5A62318":"#E5484D18";
const heatFg    = v  => v>=85?"#0080C7":v>=70?"#18B982":v>=50?"#F5A623":"#E5484D";

const RISK_ALERTS = [
  { sev:"red",   text:'Anil Sharma\'s safety certification expired (May 2026). Must not perform critical tasks until renewed.',                  action:"Assign Renewal" },
  { sev:"red",   text:`Analytics avg at ${avg("Analytics")}% — 16 pts below the 60% required threshold. Zero members at proficiency.`,          action:"View Plan" },
  { sev:"amber", text:"Mohan Singh's certification expires in 12 days (Jun 2026). Initiate renewal this week.",                                  action:"Schedule Now" },
  { sev:"amber", text:`Team Digital skills at ${avg("Digital")}% avg — 18 pts below the 65% target. 4 of 6 members need upskilling.`,           action:"Assign Course" },
  { sev:"amber", text:"Pradeep Kumar has not completed a safety refresher in 90+ days. Compliance risk flagged by ULIP.",                        action:"Send Reminder" },
];

const AI_ACTIONS = [
  { icon:"📚", color:"#0080C7", title:"Assign Data Analytics Cohort",          desc:"4 members below 60% Analytics threshold. EdNext cohort starts Jun 3.",           tag:"Skill Gap"    },
  { icon:"🔄", color:"#E5484D", title:"Initiate Cert Renewal — Anil & Mohan",  desc:"Expired/expiring certs detected. Auto-enroll both in SOE Safety refresher.",     tag:"Urgent"       },
  { icon:"🤝", color:"#9B59B6", title:"Connect with Priya K. (Analytics SME)", desc:"Arrange an SME session for the 4 members scoring below Analytics target.",       tag:"SME Session"  },
  { icon:"⚡", color:"#18B982", title:"Digital Upskilling Microlearning Series",desc:"Assign 5-part IIoT & Digital Tools series to Ravi, Anil, Suresh, Mohan.",       tag:"Microlearning" },
  { icon:"🎯", color:"#F5A623", title:"Leadership Bootcamp — Q3 Batch",        desc:"55% avg leadership score. 4 members below target. Nominate for July batch.",     tag:"Leadership"   },
];

/* ─── Radar Chart (SVG) ─────────────────────────────────────────────────────── */
function RadarChart() {
  const cx=140, cy=140, r=92, n=SKILLS.length;
  const angle = i => (i*2*Math.PI/n) - Math.PI/2;
  const pt    = (i,pct) => [cx + r*pct*Math.cos(angle(i)), cy + r*pct*Math.sin(angle(i))];
  const avgPts = SKILLS.map((_,i) => pt(i, avg(SKILLS[i])/100).join(",")).join(" ");
  const reqPts = SKILLS.map((k,i) => pt(i, REQUIRED[k]/100).join(",")).join(" ");
  return (
    <svg width={280} height={280}>
      {[0.25,0.5,0.75,1].map(lv=>(
        <polygon key={lv} points={SKILLS.map((_,i)=>pt(i,lv).join(",")).join(" ")} fill="none" stroke="#DDE6EF" strokeWidth={1}/>
      ))}
      {SKILLS.map((_,i)=>{ const [x,y]=pt(i,1); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#DDE6EF" strokeWidth={1}/>; })}
      <polygon points={reqPts} fill="rgba(245,166,35,0.07)" stroke="#F5A623" strokeWidth={1.5} strokeDasharray="4 3"/>
      <polygon points={avgPts} fill="rgba(0,128,199,0.18)"  stroke="#0080C7" strokeWidth={2}/>
      {SKILLS.map((_,i)=>{ const [x,y]=pt(i,avg(SKILLS[i])/100); return <circle key={i} cx={x} cy={y} r={4} fill="#0080C7" stroke="#fff" strokeWidth={1.5}/>; })}
      {SKILLS.map((k,i)=>{
        const [x,y]=pt(i,1.3);
        const anchor = x<cx-5?"end":x>cx+5?"start":"middle";
        return <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize={9} fill="#7A90A4" fontFamily="'DM Sans',sans-serif">{k}</text>;
      })}
      <text x={cx} y={cy-5} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Team</text>
      <text x={cx} y={cy+9} textAnchor="middle" fontSize={10} fontWeight={700} fill={C.blue} fontFamily="'DM Sans',sans-serif">Avg</text>
    </svg>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────────────────── */
const Av = ({m, size=26}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:m.col,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.35,fontWeight:800,flexShrink:0}}>{m.init}</div>
);

/* ═══════════════════════════════════════════════════════════════════════════════ */
export default function ManagerViewPage() {
  const [appreciated, setAppreciated] = useState({});
  const [assigned,    setAssigned]    = useState({});

  const totalXP     = Math.round(TEAM.reduce((s,m)=>s+m.xp,0)/TEAM.length);
  const activeCount = TEAM.filter(m=>m.hoursMonth>=6).length;
  const critGaps    = SKILLS.filter(k=>avg(k)<REQUIRED[k]-12).length;
  const highRisk    = TEAM.filter(m=>m.certStatus!=="valid").length;
  const totalH      = TEAM.reduce((s,m)=>s+m.hoursMonth,0);
  const maxH        = Math.max(...MONTHLY.map(d=>d.v));
  const completionP = Math.round(TEAM.reduce((s,m)=>s+m.completions,0)/TEAM.length/18*100);

  const KPIS = [
    { label:"Team Skill XP",      value:totalXP.toLocaleString(), sub:"avg / member",         color:C.blue,    icon:"⭐" },
    { label:"Safety Readiness",   value:`${avg("Safety")}%`,       sub:"team avg",             color:"#18B982", icon:"🦺" },
    { label:"Learning Adoption",  value:`${Math.round(activeCount/TEAM.length*100)}%`, sub:`${activeCount}/${TEAM.length} active`, color:"#9B59B6", icon:"📚" },
    { label:"Learning Hours",     value:totalH,                    sub:"team · this month",    color:"#F5A623", icon:"⏱" },
    { label:"Critical Gaps",      value:critGaps,                  sub:"skills below target",  color:critGaps>3?"#E5484D":"#F5A623", icon:"⚠️" },
    { label:"High-Risk Workers",  value:highRisk,                  sub:"cert issues",          color:highRisk>0?"#E5484D":"#18B982", icon:"🚨" },
    { label:"Completion Rate",    value:`${completionP}%`,          sub:"avg course rate",      color:C.blue,    icon:"✅" },
  ];

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
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10,marginBottom:24}}>
        {KPIS.map(k=>(
          <div key={k.label} style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
            <div style={{fontSize:20,fontWeight:900,color:k.color,fontFamily:"'Playfair Display',serif",lineHeight:1}}>{k.value}</div>
            <div style={{fontSize:9,color:C.text3,margin:"4px 0 2px",textTransform:"uppercase",letterSpacing:"0.06em",lineHeight:1.3}}>{k.label}</div>
            <div style={{fontSize:9,color:k.color,fontWeight:600}}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Section 1: Team Capability Snapshot ─────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr 220px",gap:16,marginBottom:24}}>

        {/* Radar */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,alignSelf:"flex-start"}}>Skill Radar Chart</div>
          <div style={{display:"flex",gap:12,fontSize:9,color:C.text3,marginBottom:8,alignSelf:"flex-start"}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:2,background:C.blue,display:"inline-block",borderRadius:1}}/>Team avg</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:2,borderTop:"2px dashed #F5A623",display:"inline-block"}}/>Required</span>
          </div>
          <RadarChart/>
        </div>

        {/* RAG Indicators */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Skill RAG Status · Avg vs Required</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {SKILLS.map(k=>{
              const a=avg(k), req=REQUIRED[k], gap=req-a, color=ragCol(a);
              return (
                <div key={k} style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0,boxShadow:`0 0 6px ${color}70`}}/>
                  <span style={{fontSize:11,color:C.text,fontWeight:600,width:88,flexShrink:0}}>{k}</span>
                  <div style={{flex:1,height:8,background:C.bg,borderRadius:4,overflow:"hidden",position:"relative"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${req}%`,background:`${C.blue}18`,borderRadius:4}}/>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${a}%`,background:color,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:800,color,width:32,textAlign:"right"}}>{a}%</span>
                  <span style={{fontSize:9,color:C.text3,width:20,textAlign:"center"}}>/</span>
                  <span style={{fontSize:10,color:C.blue,width:30}}>{req}%</span>
                  <span style={{fontSize:9,padding:"1px 5px",borderRadius:5,background:gap>0?"#E5484D15":"#18B98215",color:gap>0?"#E5484D":"#18B982",fontWeight:700,width:36,textAlign:"center"}}>
                    {gap>0?`-${gap}`:"✓"}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:12,display:"flex",gap:12,fontSize:9,color:C.text3,borderTop:`1px solid ${C.border}`,paddingTop:10}}>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#18B982",display:"inline-block"}}/>≥ 75% — On track</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#F5A623",display:"inline-block"}}/>50–74% — Developing</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:7,height:7,borderRadius:"50%",background:"#E5484D",display:"inline-block"}}/>&lt; 50% — Critical gap</span>
          </div>
        </div>

        {/* Top performers + Cert status */}
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"14px",flex:1}}>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>🏆 Top Learners</div>
            {[...TEAM].sort((a,b)=>b.xp-a.xp).slice(0,3).map((m,i)=>(
              <div key={m.name} style={{display:"flex",alignItems:"center",gap:8,marginBottom:i<2?8:0}}>
                <div style={{fontSize:13,color:["#F5A623","#8A94A6","#C87941"][i],fontWeight:700}}>{["①","②","③"][i]}</div>
                <Av m={m} size={22}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.text,lineHeight:1.2}}>{m.name.split(" ")[0]}</div>
                  <div style={{fontSize:9,color:C.text3}}>{m.xp.toLocaleString()} XP</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"14px",flex:1}}>
            <div style={{fontSize:10,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>📜 Certifications</div>
            {TEAM.map(m=>(
              <div key={m.name} style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                <Av m={m} size={20}/>
                <div style={{flex:1,fontSize:10,fontWeight:600,color:C.text}}>{m.name.split(" ")[0]}</div>
                <span style={{padding:"1px 6px",borderRadius:6,background:`${certCol(m.certStatus)}15`,color:certCol(m.certStatus),fontSize:8,fontWeight:700,whiteSpace:"nowrap"}}>{certLbl(m.certStatus)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Heatmap ──────────────────────────────────────────── */}
      <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px",marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>Team Skill Heatmap</div>
          <div style={{fontSize:9,color:C.text3}}>— competency % per person per skill · ↑ target score shown in header</div>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"separate",borderSpacing:"0 3px",fontSize:11}}>
            <thead>
              <tr>
                <th style={{textAlign:"left",padding:"4px 10px",fontSize:10,color:C.text3,fontWeight:700,minWidth:140}}>Member</th>
                {SKILLS.map(k=>(
                  <th key={k} style={{padding:"4px 6px",fontSize:9,color:C.text3,fontWeight:700,textAlign:"center",minWidth:72}}>
                    <div style={{lineHeight:1.3}}>{k}</div>
                    <div style={{color:C.blue,fontWeight:800}}>↑{REQUIRED[k]}%</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map(m=>(
                <tr key={m.name}>
                  <td style={{padding:"5px 10px",borderRadius:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Av m={m} size={26}/>
                      <div>
                        <div style={{fontSize:11,fontWeight:700,color:C.text}}>{m.name}</div>
                        <div style={{fontSize:9,color:C.text3}}>{m.role} · {m.level}</div>
                      </div>
                    </div>
                  </td>
                  {SKILLS.map(k=>{
                    const v=m.skills[k];
                    return (
                      <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                        <div style={{padding:"5px 2px",borderRadius:8,background:heatBg(v),border:`1px solid ${heatFg(v)}35`,fontSize:11,fontWeight:700,color:heatFg(v)}}>{v}%</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr style={{borderTop:`2px solid ${C.border}`}}>
                <td style={{padding:"6px 10px",fontSize:10,fontWeight:700,color:C.text3}}>Team Avg</td>
                {SKILLS.map(k=>{
                  const a=avg(k);
                  return (
                    <td key={k} style={{padding:"3px 4px",textAlign:"center"}}>
                      <div style={{padding:"5px 2px",borderRadius:8,background:`${ragCol(a)}20`,border:`1px solid ${ragCol(a)}40`,fontSize:11,fontWeight:800,color:ragCol(a)}}>{a}%</div>
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

        {/* Gap Analysis */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>📉 Skill Gap Analysis · Required vs Current</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {SKILLS.map(k=>{
              const a=avg(k), req=REQUIRED[k], gap=req-a, color=ragCol(a);
              return (
                <div key={k}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:11,fontWeight:600,color:C.text}}>{k}</span>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:10,color:C.text3}}>Current <b style={{color}}>{a}%</b></span>
                      <span style={{fontSize:10,color:C.text3}}>Target <b style={{color:C.blue}}>{req}%</b></span>
                      <span style={{fontSize:9,padding:"1px 6px",borderRadius:6,background:gap>0?"#E5484D15":"#18B98215",color:gap>0?"#E5484D":"#18B982",fontWeight:700}}>{gap>0?`Gap: ${gap}pts`:"On track ✓"}</span>
                    </div>
                  </div>
                  <div style={{height:10,background:C.bg,borderRadius:5,overflow:"hidden",position:"relative"}}>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${req}%`,background:`${C.blue}18`,borderRadius:5}}/>
                    <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${a}%`,background:color,borderRadius:5}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommended Actions */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>🤖 AI Recommended Actions</div>
            <span style={{marginLeft:"auto",padding:"2px 7px",borderRadius:6,background:`${C.blue}15`,color:C.blue,fontSize:9,fontWeight:700}}>TDA Powered</span>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {AI_ACTIONS.map((a,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${a.color}22`}}>
                <div style={{width:32,height:32,borderRadius:8,background:`${a.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:6,marginBottom:3}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.text,flex:1,lineHeight:1.35}}>{a.title}</div>
                    <span style={{fontSize:8,padding:"2px 5px",borderRadius:5,background:`${a.color}18`,color:a.color,fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>{a.tag}</span>
                  </div>
                  <div style={{fontSize:10,color:C.text3,lineHeight:1.5}}>{a.desc}</div>
                </div>
                <button onClick={()=>setAssigned(p=>({...p,[i]:true}))} style={{flexShrink:0,alignSelf:"center",padding:"5px 10px",borderRadius:7,border:"none",background:assigned[i]?"#18B98218":`${a.color}18`,color:assigned[i]?"#18B982":a.color,fontSize:9,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
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

          {/* Monthly bar chart */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Monthly Learning Hours · Team Total</div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:130,padding:"0 4px"}}>
              {MONTHLY.map(d=>(
                <div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%",justifyContent:"flex-end"}}>
                  <div style={{fontSize:9,fontWeight:700,color:d.m==="May"?C.blue:C.text3}}>{d.v}h</div>
                  <div style={{width:"100%",background:d.m==="May"?C.blue:`${C.blue}45`,borderRadius:"5px 5px 0 0",height:`${(d.v/maxH)*110}px`,transition:"height 0.4s"}}/>
                  <div style={{fontSize:9,color:d.m==="May"?C.blue:C.text3,fontWeight:d.m==="May"?700:400}}>{d.m}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual monthly performance */}
          <div>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Individual Performance · May 2026</div>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {[...TEAM].sort((a,b)=>b.hoursMonth-a.hoursMonth).map(m=>(
                <div key={m.name} style={{display:"flex",alignItems:"center",gap:8}}>
                  <Av m={m} size={24}/>
                  <div style={{width:96,flexShrink:0}}>
                    <div style={{fontSize:11,fontWeight:600,color:C.text}}>{m.name.split(" ")[0]}</div>
                    <div style={{fontSize:9,color:C.text3}}>{m.completions} completions</div>
                  </div>
                  <div style={{flex:1,height:7,background:C.bg,borderRadius:4,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(m.hoursMonth/14)*100}%`,background:m.col,borderRadius:4,transition:"width 0.4s"}}/>
                  </div>
                  <span style={{fontSize:10,fontWeight:700,color:m.col,width:26,textAlign:"right"}}>{m.hoursMonth}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 5: Risk Alerts + Recognition ────────────────────────── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>

        {/* Risk Alerts */}
        <div style={{background:C.white,border:`1.5px solid #E5484D22`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>⚠️ Workforce Risk Alerts</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {RISK_ALERTS.map((r,i)=>{
              const c=r.sev==="red"?"#E5484D":"#F5A623";
              return (
                <div key={i} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:10,background:`${c}0c`,border:`1px solid ${c}30`}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:c,marginTop:4,flexShrink:0,boxShadow:`0 0 6px ${c}60`}}/>
                  <div style={{flex:1,fontSize:11,color:C.text,lineHeight:1.55}}>{r.text}</div>
                  <button style={{flexShrink:0,alignSelf:"flex-start",padding:"4px 9px",borderRadius:7,border:"none",background:`${c}18`,color:c,fontSize:9,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{r.action}</button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recognition */}
        <div style={{background:C.white,border:`1.5px solid ${C.border}`,borderRadius:14,padding:"18px"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>🏅 Recognition & Engagement</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {TEAM.map(m=>(
              <div key={m.name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                <Av m={m} size={32}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.text}}>{m.name}</div>
                  <div style={{fontSize:9,color:C.text3}}>{m.role} · {m.hoursMonth}h this month · {m.completions} completions</div>
                </div>
                <div style={{display:"flex",gap:5}}>
                  <button onClick={()=>setAppreciated(p=>({...p,[m.name]:true}))} style={{padding:"4px 9px",borderRadius:7,border:"none",background:appreciated[m.name]?"#18B98218":"#F5A62318",color:appreciated[m.name]?"#18B982":"#F5A623",fontSize:9,fontWeight:700,cursor:"pointer"}}>
                    {appreciated[m.name]?"✓ Done":"👏 Appreciate"}
                  </button>
                  <button style={{padding:"4px 9px",borderRadius:7,border:"none",background:`${C.blue}15`,color:C.blue,fontSize:9,fontWeight:700,cursor:"pointer"}}>🏅 Badge</button>
                  <button style={{padding:"4px 9px",borderRadius:7,border:"none",background:`#9B59B615`,color:"#9B59B6",fontSize:9,fontWeight:700,cursor:"pointer"}}>⭐ Nominate SME</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
