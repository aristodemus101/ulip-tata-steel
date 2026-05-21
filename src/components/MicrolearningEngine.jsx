import { useState } from "react";
import C from "../theme";
import { Card, Bdg, Btn, SLabel } from "./ui";
import { EXISTING_MICROS, DEPT_FILTERS, LEVEL_FILTERS } from "../data/workData";

const STATUS_COLOR = { Active:C.green, Paused:C.accent };

const QUIZ_TYPES = [
  { id:"mcq",   icon:"🔘", label:"Single Select (MCQ)",   desc:"One correct answer from multiple options" },
  { id:"multi", icon:"☑",  label:"Multi-Select",           desc:"Multiple correct answers" },
  { id:"word",  icon:"✏",  label:"Word / Short Answer",    desc:"Free text or keyword match" },
  { id:"image", icon:"🖼",  label:"Image-Based Question",   desc:"Attach an image with the question" },
];

export default function MicrolearningEngine({ toggleCh, channels }) {
  const [microTab, setMicroTab] = useState("send");
  const [selectedMicro, setSelectedMicro] = useState(null);
  const [quizType, setQuizType] = useState(null);
  const [mcqOptions] = useState(["","","",""]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerated, setAiGenerated] = useState(false);
  const [nudgeType, setNudgeType] = useState(null);

  const MICRO_TABS = [
    { id:"send",  label:"📤 Send Microlearning" },
    { id:"list",  label:"📋 My Microlearnings"  },
    { id:"quiz",  label:"➕ Add Quiz / Assessment" },
  ];

  return (
    <div>
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

      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {MICRO_TABS.map(t=>(
          <button key={t.id} onClick={()=>{ setMicroTab(t.id); setSelectedMicro(null); setQuizType(null); setAiGenerated(false); }} style={{
            padding:"10px 20px",borderRadius:10,border:`1.5px solid ${microTab===t.id?C.blue:C.border}`,
            background:microTab===t.id?C.blue:C.white,color:microTab===t.id?"#fff":C.text2,
            fontSize:13,fontWeight:600,cursor:"pointer",
          }}>{t.label}</button>
        ))}
      </div>

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

      {microTab==="quiz" && (
        <div>
          <Card style={{marginBottom:16}}>
            <SLabel>🤖 AI Question Generator</SLabel>
            <div style={{display:"flex",gap:10}}>
              <input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
                placeholder="Describe the kind of micro assessment you want… e.g. '3 MCQs on TPM Autonomous Maintenance steps, difficulty: medium'"
                style={{flex:1,padding:"11px 16px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,color:C.text,outline:"none"}}/>
              <button onClick={()=>setAiGenerated(true)} style={{padding:"11px 22px",borderRadius:10,background:C.blue,border:"none",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>✦ Generate</button>
            </div>
            {aiGenerated && (
              <div style={{marginTop:12,padding:"12px 14px",background:`${C.green}10`,border:`1px solid ${C.green}30`,borderRadius:10,fontSize:12,color:C.green,fontWeight:600}}>
                ✓ AI generated 3 MCQ questions on Autonomous Maintenance. Scroll down to review & edit them.
              </div>
            )}
          </Card>

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

          {quizType==="word" && (
            <Card style={{marginBottom:16}}>
              <SLabel>Short Answer Question Builder</SLabel>
              <textarea placeholder="Type your question here… e.g. 'Name the 3 pillars of TPM in your own words.'" style={{width:"100%",minHeight:70,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,color:C.text,resize:"vertical",outline:"none",marginBottom:12}}/>
              <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:6}}>Accepted Keywords (for auto-grading)</div>
              <input placeholder="e.g. autonomous, planned, quality (comma separated)" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,outline:"none",marginBottom:12}}/>
              <div style={{padding:"10px 14px",background:C.blue3,borderRadius:9,fontSize:11,color:C.blue}}>💡 TDA will auto-match answers containing these keywords and mark as correct</div>
            </Card>
          )}

          {quizType==="image" && (
            <Card style={{marginBottom:16}}>
              <SLabel>Image-Based Question Builder</SLabel>
              <div style={{border:`2px dashed ${C.blue4}`,borderRadius:10,padding:"20px",textAlign:"center",background:C.blue3,marginBottom:12,cursor:"pointer"}}>
                <div style={{fontSize:28,marginBottom:6}}>🖼</div>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>Upload Question Image</div>
                <div style={{fontSize:11,color:C.text3,marginTop:4}}>JPG · PNG · GIF · SVG</div>
              </div>
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
