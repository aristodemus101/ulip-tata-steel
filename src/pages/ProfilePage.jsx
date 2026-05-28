import { useState } from "react";
import C from "../theme";
import { Card, Bdg, Btn, SLabel } from "../components/ui";
import ProfileAvatar from "../components/ProfileAvatar";
import SOEBadge from "../components/SOEBadge";
import { SKILL_MODULES, SKILL_NAMES, SKILL_GAPS, LEARNING_MAP, SOE_CERTS } from "../data/learningData";

const PL_LABELS = ["","Basic","Can do with support","Can do independently","Practitioner","Expert"];
const PL_COL    = ["","#8A94A6","#F5A623","#0080C7","#9B59B6","#18B982"];
const xpToPL    = xp => Math.min(5, Math.floor(xp / 1000) + 1);

function SkillDrilldown({ skill, xp, targetPL, skillGap, onClose }) {
  const modules = SKILL_MODULES[skill] || [
    { type:"micro",  icon:"⚡", title:`${skill} Introduction`,        duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:`${skill} Foundations Course`,  duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:`${skill} Knowledge Check`,     duration:"10 min", xp:50, q:`Which is a key principle of ${skill}?`, opts:["Option A","Option B","Option C","Option D"], correct:0 },
  ];
  const [activeAssess, setActiveAssess] = useState(null);
  const [selOpt, setSelOpt] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const currentPL  = xpToPL(xp);
  const xpInLevel  = xp % 1000;
  const xpToNext   = 1000 - xpInLevel;
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
              <div style={{ fontSize:18, fontWeight:800, color:"#fff" }}>PL{currentPL}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>{PL_LABELS[currentPL]}</div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.15)", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#FFD166" }}>PL{targetPL}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Target</div>
            </div>
            <div style={{ background:"rgba(229,72,77,0.3)", borderRadius:10, padding:"8px 14px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#FFB3B5" }}>{skillGap}%</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>Skill Gap</div>
            </div>
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", paddingLeft:8, gap:4 }}>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)", textTransform:"uppercase" }}>{xp} XP · {xpInLevel}/1000 in PL{currentPL}</div>
              <div style={{ width:"100%", height:8, background:"rgba(255,255,255,0.2)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${(xp/5000)*100}%`, background:"linear-gradient(90deg,#4FC3F7,#fff)", borderRadius:4 }}/>
              </div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)" }}>{xpToNext} XP to PL{Math.min(5,currentPL+1)}</div>
            </div>
          </div>
        </div>

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

function SkillPassport({ onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"#0E172670",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
      <div style={{background:C.white,borderRadius:20,width:700,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 80px #0E172640"}}>
        <div style={{background:`linear-gradient(135deg,${C.sidebar},${C.blue})`,padding:"24px 28px",borderRadius:"20px 20px 0 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:14}}>
            <ProfileAvatar size={72}/>
            <div style={{flex:1}}>
              <div style={{fontSize:20,fontWeight:800,color:"#fff",fontFamily:"'Playfair Display',serif"}}>Jay Pratap Singh</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.7)"}}>Manager · IL5 · TQM Department</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.6)"}}>Area: H Blast Furnace · Plant: TSN · Jamshedpur</div>
            </div>
            <div style={{textAlign:"center",background:"rgba(255,255,255,0.15)",borderRadius:12,padding:"12px 18px"}}>
              <div style={{fontSize:28,fontWeight:800,color:"#FFD700",fontFamily:"'Playfair Display',serif"}}>3,120</div>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",textTransform:"uppercase",letterSpacing:"0.1em"}}>Skill XP</div>
            </div>
            <button onClick={onClose} style={{width:30,height:30,borderRadius:"50%",background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",fontSize:16,cursor:"pointer"}}>✕</button>
          </div>
        </div>
        <div style={{padding:"24px 28px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
            <div>
              <SLabel>Top Skills</SLabel>
              {[["Blast Furnace Operations",3850],["Leadership & Team Mgmt",3500],["Process Safety",2900],["TPM & Lean",3200],["Project Management",3100]].map(([s,v],i)=>{
                const pl=xpToPL(v);
                return (
                  <div key={i} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,marginBottom:4}}>
                      <span style={{color:C.text}}>{s}</span>
                      <span style={{padding:"1px 6px",borderRadius:5,background:`${PL_COL[pl]}20`,color:PL_COL[pl],fontSize:10,fontWeight:700}}>PL{pl}</span>
                    </div>
                    <div style={{height:6,background:C.border,borderRadius:3}}><div style={{height:"100%",borderRadius:3,width:`${(v/5000)*100}%`,background:`linear-gradient(90deg,${PL_COL[pl]},${PL_COL[Math.min(5,pl+1)]})`}}/></div>
                    <div style={{fontSize:9,color:C.text3,marginTop:2}}>{v} XP · {v%1000}/1000 in PL{pl}</div>
                  </div>
                );
              })}
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

export default function ProfilePage() {
  const [skillFilter,setSkillFilter]=useState("Safety");
  const [showPassport,setShowPassport]=useState(false);
  const [goalSearch,setGoalSearch]=useState("");
  const [goalSugg,setGoalSugg]=useState([]);
  const [selSkill,setSelSkill]=useState(null);
  const [selLevel,setSelLevel]=useState(null);
  const [drillSkill,setDrillSkill]=useState(null);

  const JMAP={
    Safety:["Fire Safety","Emergency Response","Hazmat Handling","Process Safety","LOTO Procedure"],
    Engineering:["PLC Programming","Hydraulics","Predictive Maintenance","Blast Furnace Operations","Industrial IoT"],
    Leadership:["Team Management","Communication","Project Management","Change Management","Coaching Skills"],
    Digital:["Data Analytics","Python Basics","AI/ML Basics","Digital Twins","Power BI"],
  };
  const ALL_SKILLS_SHUFFLED=["Fire Safety","PLC Programming","Team Management","Data Analytics","Emergency Response","Predictive Maintenance","Communication","Python Basics","Process Safety","Blast Furnace Operations","Project Management","AI/ML Basics","LOTO Procedure","Industrial IoT","Change Management","Power BI","Hazmat Handling","Hydraulics","Coaching Skills","Digital Twins"];
  const SKILLS_JOURNEY=skillFilter==="All"?ALL_SKILLS_SHUFFLED:(JMAP[skillFilter]||[]);

  const findGap = name => SKILL_GAPS.find(g => g.skill.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(g.skill.toLowerCase()));

  return (
    <div style={{maxWidth:1100}}>
      {showPassport&&<SkillPassport onClose={()=>setShowPassport(false)}/>}
      {drillSkill&&<SkillDrilldown skill={drillSkill.skill} xp={drillSkill.xp} targetPL={drillSkill.targetPL} skillGap={drillSkill.skillGap} onClose={()=>setDrillSkill(null)}/>}

      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",gap:24,alignItems:"flex-start"}}>
          <ProfileAvatar size={90} edit/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:4}}>
              <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Jay Pratap Singh</h2>
              <Bdg label="Gold Learner" color={C.gold}/>
              <Bdg label="Safety Champion" color={C.green}/>
              <Bdg label="🔥 42-day streak" color={C.red}/>
            </div>
            <div style={{fontSize:13,color:C.text2,marginBottom:2}}>Manager · IL5</div>
            <div style={{fontSize:12,color:C.text3,marginBottom:10}}>🏭 Department: TQM &nbsp;|&nbsp; 📍 Area: H Blast Furnace &nbsp;|&nbsp; 🏗 Plant: TSN, Jamshedpur</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["Six Sigma","Lean","Fire Safety","ISO 9001","TPM","Predictive Maint."].map(b=><Bdg key={b} label={b} color={C.blue}/>)}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,flexShrink:0,alignItems:"flex-end"}}>
            <div style={{textAlign:"center",background:C.blue3,borderRadius:14,padding:"14px 22px"}}>
              <div style={{fontSize:32,fontWeight:800,color:C.blue,fontFamily:"'Playfair Display',serif"}}>3,120</div>
              <div style={{fontSize:10,color:C.text3,textTransform:"uppercase",letterSpacing:"0.1em"}}>Skill XP</div>
              <div style={{fontSize:11,color:C.green,marginTop:4}}>Top 12% in team</div>
            </div>
            <button onClick={()=>setShowPassport(true)} style={{padding:"9px 18px",borderRadius:9,background:C.blue,border:"none",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>📋 View Skill Passport</button>
          </div>
        </div>
      </Card>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        {[{l:"Trainings Completed",v:"34",c:C.blue},{l:"Due Trainings",v:"2",c:C.red},{l:"Goal Completion",v:"68%",c:C.green},{l:"Ongoing Projects",v:"1",c:C.accent},{l:"Completed Projects",v:"3",c:C.blue2}].map((s,i)=>(
          <Card key={i} pad={16} style={{textAlign:"center"}}>
            <div style={{fontSize:26,fontWeight:800,color:s.c,fontFamily:"'Playfair Display',serif"}}>{s.v}</div>
            <div style={{fontSize:10,color:C.text3,marginTop:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
          </Card>
        ))}
      </div>

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
        <Card>
          <SLabel>Skill Gap Analysis — click any skill to explore</SLabel>
          {SKILL_GAPS.map((s,i)=>{
            const pl=xpToPL(s.xp);
            const met=pl>=s.targetPL;
            return (
            <div key={i} onClick={()=>setDrillSkill(s)} style={{marginBottom:14,cursor:"pointer",padding:"8px 10px",borderRadius:10,border:`1px solid transparent`,transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.blue3;e.currentTarget.style.borderColor=C.blue4;}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="transparent";}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5,fontSize:12,color:C.text}}>
                <span style={{fontWeight:600}}>{s.skill} <span style={{color:C.blue,fontSize:10}}>↗ View modules</span></span>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{padding:"1px 6px",borderRadius:5,background:`${PL_COL[pl]}20`,color:PL_COL[pl],fontSize:10,fontWeight:700}}>PL{pl}</span>
                  <span style={{fontSize:10,color:C.text3}}>→</span>
                  <span style={{padding:"1px 6px",borderRadius:5,background:`${PL_COL[s.targetPL]}20`,color:PL_COL[s.targetPL],fontSize:10,fontWeight:700}}>PL{s.targetPL}</span>
                  {s.skillGap>0&&<span style={{fontSize:10,color:C.red,fontWeight:600}}>{s.skillGap}% gap</span>}
                </div>
              </div>
              <div style={{height:7,background:C.border,borderRadius:4,position:"relative"}}>
                <div style={{height:"100%",borderRadius:4,width:`${(s.xp/5000)*100}%`,background:met?`linear-gradient(90deg,${C.green},#5EE8B5)`:`linear-gradient(90deg,${C.blue},#7B97F8)`}}/>
                <div style={{position:"absolute",top:-3,height:13,width:2,background:C.text3,left:`${(s.targetPL*1000/5000)*100}%`,borderRadius:2}}/>
              </div>
              <div style={{fontSize:9,color:C.text3,marginTop:3}}>{s.xp} XP · {s.xp%1000}/1000 in PL{pl} · {met?"Target met ✓":`${s.targetPL*1000-s.xp} XP to reach PL${s.targetPL}`}</div>
            </div>
            );
          })}
        </Card>

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
