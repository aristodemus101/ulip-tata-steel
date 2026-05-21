import { useState } from "react";
import C from "../theme";
import { Card, Bdg, SLabel } from "../components/ui";
import { GIGS_DATA } from "../data/workData";

const LEVEL_COLORS = { Beginner:C.green, Intermediate:C.blue, Advanced:C.accent, Expert:"#9B59B6" };

export default function GigsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, color:C.text, fontFamily:"'Playfair Display',serif", margin:0 }}>Gigs & Projects</h2>
          <div style={{ fontSize:13, color:C.text3, marginTop:4 }}>AI-matched internal opportunities based on your skills & goals</div>
        </div>
        <Bdg label={`${GIGS_DATA.length} open gigs · AI-matched`} color={C.green}/>
      </div>

      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(5px)" }}>
          <div style={{ background:C.white, borderRadius:20, width:580, maxHeight:"88vh", overflowY:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.4)" }}>
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
              <div style={{ fontSize:12, color:C.text3, marginBottom:16 }}>Project Owner: <strong style={{ color:C.text2 }}>{selected.owner}</strong> · Deadline: <strong style={{ color:C.red }}>{selected.deadline}</strong></div>
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
              <div style={{ fontSize:11, color:C.text3 }}>⏱ {gig.duration} &nbsp;·&nbsp; <span style={{ color:C.red, fontWeight:600 }}>Apply by {gig.deadline}</span></div>
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
