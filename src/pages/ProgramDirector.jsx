import { useState } from "react";
import C from "../theme";
import { Card, Bdg, Btn, SLabel, Select } from "../components/ui";
import MicrolearningEngine from "../components/MicrolearningEngine";
import LiveWorkUpdates from "../components/LiveWorkUpdates";
import {
  SKILL_GAP_DATA, DEPT_FILTERS, LEVEL_FILTERS, BIZ_UNITS, OPR_LEVELS, NOPR_LEVELS,
  CREATED_TRAININGS, ACTIVE_PROGRAMS, REQUESTED_TRAININGS, GROUPS,
} from "../data/workData";

export default function ProgramDirector() {
  const [group,setGroup]=useState("analytics");
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

  const activeGroup=GROUPS.find(g=>g.id===group);

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

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        {GROUPS.map(g=>{
          const isActive=group===g.id;
          return (
            <button key={g.id} onClick={()=>{setGroup(g.id);if(!g.tabs.find(t=>t.id===tab))setTab(g.tabs[0].id);}} style={{
              padding:"16px 18px",borderRadius:14,border:`2px solid ${isActive?g.color:C.border}`,
              background:isActive?`${g.color}12`:C.white,
              cursor:"pointer",textAlign:"left",transition:"all 0.15s",
              boxShadow:isActive?`0 4px 16px ${g.color}25`:"none",
            }}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <div style={{width:36,height:36,borderRadius:10,background:isActive?g.color:`${g.color}20`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,transition:"all 0.15s"}}>{g.icon}</div>
                <span style={{fontSize:14,fontWeight:700,color:isActive?g.color:C.text}}>{g.label}</span>
              </div>
              <div style={{fontSize:11,color:C.text3,lineHeight:1.4}}>{g.desc}</div>
              <div style={{marginTop:8,fontSize:10,color:isActive?g.color:C.text3,fontWeight:600}}>{g.tabs.length} sections</div>
            </button>
          );
        })}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:22,borderBottom:`1px solid ${C.border}`,paddingBottom:12,flexWrap:"wrap"}}>
        {activeGroup.tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            padding:"7px 14px",borderRadius:9,
            border:`1.5px solid ${tab===t.id?activeGroup.color:C.border}`,
            background:tab===t.id?activeGroup.color:C.white,
            color:tab===t.id?"#fff":C.text2,
            fontSize:12,fontWeight:600,cursor:"pointer",
            whiteSpace:"nowrap",transition:"all 0.15s",
            boxShadow:tab===t.id?`0 2px 8px ${activeGroup.color}30`:"none",
          }}>{t.label}</button>
        ))}
      </div>

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

      {tab==="liveWork"&&<LiveWorkUpdates/>}

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

      {tab==="micro"&&(
        <MicrolearningEngine toggleCh={toggleCh} channels={channels}/>
      )}

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
