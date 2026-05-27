import { useState, useEffect } from "react";
import C from "../theme";
import { USER } from "../data/userData";

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

export default function MicrolearningPopup({ onClose, onXPEarned }) {
  const [phase, setPhase] = useState("watch");
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === TQM_MICRO.correct;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => setPhase("result"), 600);
  };

  useEffect(() => {
    if (phase === "result" && isCorrect) {
      onXPEarned?.();
    }
  }, [phase]);

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:600,
      background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"flex-end",
      padding:"0 32px 0 0",
    }}>
      <div style={{
        width:"50%", height:"92vh", background:C.white,
        borderRadius:20, overflow:"hidden",
        display:"flex", flexDirection:"column",
        boxShadow:"0 24px 80px rgba(0,0,0,0.4)",
        animation:"slideInRight 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}>
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
          <div style={{display:"flex",gap:6,marginTop:10}}>
            {[{id:"watch",label:"📹 Watch"},{id:"question",label:"❓ Quick Check"}].map(p=>(
              <div key={p.id} onClick={()=>{if(p.id==="question"&&phase==="watch")setPhase("question");}} style={{
                padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",
                background:phase===p.id||(p.id==="question"&&phase==="result")?"rgba(255,255,255,0.25)":"rgba(255,255,255,0.1)",
                color:"#fff",border:"1px solid rgba(255,255,255,0.3)",
              }}>{p.label}</div>
            ))}
            <div style={{marginLeft:"auto",padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:600,background:"rgba(245,166,35,0.3)",color:"#FFD166",border:"1px solid rgba(245,166,35,0.5)"}}>
              ⏱ {TQM_MICRO.duration}
            </div>
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"24px"}}>
          {phase==="watch" && (
            <div>
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

              <div style={{marginBottom:18}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>📄 Summary</div>
                <p style={{fontSize:13,color:C.text2,lineHeight:1.7}}>{TQM_MICRO.summary}</p>
              </div>

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

          {phase==="question" && submitted && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,gap:16}}>
              <div style={{fontSize:40,animation:"spin 0.8s linear infinite"}}>⟳</div>
              <div style={{fontSize:14,color:C.text3}}>Checking your answer…</div>
            </div>
          )}

          {phase==="result" && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"16px 0"}}>
              {isCorrect ? (
                <>
                  <div style={{fontSize:72,marginBottom:16,animation:"popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)"}}>🎉</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.green,fontFamily:"'Playfair Display',serif",marginBottom:8}}>Great job, {USER.firstName}!</div>
                  <div style={{fontSize:14,color:C.text2,marginBottom:24,lineHeight:1.6}}>That's correct! Step 7 – Full Autonomous Management is when operators take complete ownership of their equipment.</div>
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
