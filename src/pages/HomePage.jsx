import C from "../theme";
import { Card } from "../components/ui";
import { REC_LEARNINGS, POPULAR_MICRO, CALENDAR_EVENTS } from "../data/learningData";

export default function HomePage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Welcome back, Vikram 👋</h2>
        <p style={{color:C.text2,fontSize:13,marginTop:4}}>You have <strong style={{color:C.red}}>1 overdue</strong> and <strong style={{color:C.blue}}>4 AI-recommended</strong> opportunities waiting.</p>
      </div>

      {/* Daily Knowledge Byte */}
      <div style={{background:"linear-gradient(135deg,#003D6B 0%,#005A8E 60%,#0080C7 100%)",borderRadius:16,padding:"24px 28px",marginBottom:20,display:"flex",alignItems:"center",gap:24,position:"relative",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,128,199,0.3)"}}>
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

      {/* 3 tiles */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
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

        <Card pad={0} style={{overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:`1px solid ${C.border}`,background:"#FFF9EE"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.accent}}>⚡ Popular Microlearnings</div>
            <div style={{fontSize:10,color:C.text3,marginTop:2}}>Trending this week</div>
          </div>
          <div style={{overflowY:"auto",maxHeight:340}}>
            {POPULAR_MICRO.map((m,i)=>(
              <div key={i} style={{padding:"12px 14px",borderBottom:i<POPULAR_MICRO.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5}}>
                  <div style={{width:34,height:34,borderRadius:8,background:`${m.color}18`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{m.type==="video"?"▶":"📄"}</div>
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

      {/* Bottom action tiles */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginTop:16}}>
        {[
          { color:C.green, icon:"💬", title:"Real-time Feedback", text:"Have you recently given a presentation, managed a project, or stretched yourself? Ask for feedback on how you did.", link:"Request feedback" },
          { color:C.blue,  icon:"🎯", title:"Goals",              text:"Set learning goals to help you grow. Establish milestones, track your progress, invite supporters, and more.",      link:"Create a goal" },
          { color:C.accent,icon:"✦",  title:"Explore ULIP",       links:["My activity","Mentors","Profile","Feedback","Contact us"] },
        ].map((tile,i)=>(
          <div key={i} style={{background:`linear-gradient(145deg,${tile.color}12,${C.white})`,border:`1.5px solid ${tile.color}35`,borderRadius:16,padding:24,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:-16,right:-16,width:80,height:80,borderRadius:"50%",background:`${tile.color}10`}}/>
            <div style={{fontSize:28,marginBottom:12}}>{tile.icon}</div>
            <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8,fontFamily:"'Playfair Display',serif"}}>{tile.title}</div>
            {tile.text && <p style={{fontSize:12,color:C.text2,lineHeight:1.65,marginBottom:16}}>{tile.text}</p>}
            {tile.link  && <a href="#" style={{fontSize:13,color:tile.color,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>{tile.link} <span style={{fontSize:16}}>→</span></a>}
            {tile.links && <div style={{display:"flex",flexDirection:"column",gap:7}}>{tile.links.map(l=><a key={l} href="#" style={{fontSize:13,color:tile.color,fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>{l} <span style={{fontSize:14}}>→</span></a>)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
