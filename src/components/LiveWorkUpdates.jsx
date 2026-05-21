import { useState } from "react";
import C from "../theme";
import { Card, Bdg, Btn, SLabel } from "./ui";
import { WORK_ORDERS } from "../data/workData";
import { SKILL_GAPS } from "../data/learningData";

const PRIORITY_COLORS = { Critical:C.red, High:"#FF6B35", Medium:C.accent, Low:C.green };
const STATUS_COLORS   = { Open:C.red, Active:C.accent, Resolved:C.green };
const TYPE_ICONS      = { Maintenance:"🔧", "Safety Shutdown":"🛑", Inspection:"🔍", Electrical:"⚡", "Fire Permit":"🔥", "Confined Space":"⛔" };

export default function LiveWorkUpdates() {
  const [selected, setSelected] = useState(null);
  const [assignModal, setAssignModal] = useState(null);
  const [assigned, setAssigned] = useState({});

  return (
    <div>
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
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
                  <span style={{fontSize:9,color:C.blue,fontWeight:700,textTransform:"uppercase",marginRight:4}}>🤖 AI tags:</span>
                  {wo.skills.map(s=><Bdg key={s} label={s} color={C.blue}/>)}
                </div>
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
