import C from "../theme";
import { Bdg } from "../components/ui";

export default function LoginPage({ onLogin }) {
  const FEATURES = [
    { icon:"🎯", label:"AI-Personalised Learning Journeys"  },
    { icon:"⚡", label:"Microlearning in Minutes"           },
    { icon:"📊", label:"Real-time Skill Gap Dashboard"      },
    { icon:"🏅", label:"SOE Certifications & XP Rewards"   },
    { icon:"🧠", label:"TDA AI Knowledge Assistant"        },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(145deg,#001E3C 0%,#003D6B 45%,#005A8E 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      {/* Background decorations */}
      <div style={{ position:"absolute", top:-120, right:-120, width:480, height:480, borderRadius:"50%", background:"rgba(0,128,199,0.12)" }}/>
      <div style={{ position:"absolute", bottom:-180, left:-100, width:560, height:560, borderRadius:"50%", background:"rgba(0,128,199,0.08)" }}/>
      <div style={{ position:"absolute", top:"40%", left:"38%", width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:1040, padding:"0 32px", display:"flex", gap:72, alignItems:"center" }}>

        {/* Left panel */}
        <div style={{ flex:1 }}>
          {/* Tata Steel logo */}
          <div style={{ display:"inline-flex", alignItems:"center", background:"#fff", borderRadius:12, padding:"10px 20px", marginBottom:32, boxShadow:"0 4px 24px rgba(0,0,0,0.2)" }}>
            <img src="/tata-steel-logo.svg" alt="Tata Steel" style={{ height:32, width:"auto", display:"block" }}/>
          </div>

          {/* ULIP branding */}
          <div style={{ marginBottom:10 }}>
            <div style={{ fontSize:64, fontWeight:900, color:"#fff", fontFamily:"'Playfair Display',serif", letterSpacing:"-2px", lineHeight:1, marginBottom:10 }}>ULIP</div>
            <div style={{ fontSize:22, fontWeight:600, color:"rgba(255,255,255,0.9)", lineHeight:1.35, marginBottom:8 }}>Unified Learning &<br/>Intelligence Platform</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:20, background:"rgba(245,166,35,0.2)", border:"1px solid rgba(245,166,35,0.4)" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#FFD166" }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"#FFD166", letterSpacing:"0.08em" }}>TATA STEEL · HUMAN RESOURCES MANAGEMENT</span>
            </div>
          </div>

          <div style={{ width:48, height:3, background:"rgba(255,255,255,0.2)", borderRadius:2, margin:"24px 0" }}/>

          {/* Feature list */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {FEATURES.map((f,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 16px", borderRadius:12, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(4px)", animation:`fadeSlide 0.4s ease ${i*0.08}s both` }}>
                <span style={{ fontSize:18 }}>{f.icon}</span>
                <span style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.88)" }}>{f.label}</span>
                <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade8080" }}/>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — login card */}
        <div style={{ width:400, background:"rgba(255,255,255,0.98)", borderRadius:24, padding:40, boxShadow:"0 32px 100px rgba(0,0,0,0.4)", backdropFilter:"blur(8px)" }}>
          {/* Card header */}
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ width:56, height:56, borderRadius:16, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, margin:"0 auto 16px" }}>🎓</div>
            <div style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif", marginBottom:6 }}>Welcome Back</div>
            <div style={{ fontSize:13, color:C.text3 }}>Sign in to your ULIP account to continue</div>
          </div>

          {/* Login options */}
          <div onClick={onLogin} style={{ padding:"18px 20px", borderRadius:14, border:`2px solid ${C.blue}`, background:C.blue3, cursor:"pointer", marginBottom:12, transition:"all 0.18s" }}
            onMouseEnter={e=>e.currentTarget.style.background="#dbeeff"}
            onMouseLeave={e=>e.currentTarget.style.background=C.blue3}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🧑‍💼</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>Login for OPR / NOPR</div>
                <div style={{ fontSize:11, color:C.text3, marginTop:2 }}>Permanent employees · IL & NS levels</div>
              </div>
              <span style={{ fontSize:18, color:C.blue, fontWeight:700 }}>→</span>
            </div>
          </div>

          <div style={{ padding:"18px 20px", borderRadius:14, border:`2px solid ${C.border}`, background:"#f8f9fb", cursor:"not-allowed", opacity:0.55, marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"linear-gradient(135deg,#9B59B6,#6C3483)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>👷</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.text }}>Login for Contractor</div>
                <div style={{ fontSize:11, color:C.text3, marginTop:2 }}>GWC / Contract workforce access</div>
              </div>
              <Bdg label="Coming Soon" color="#9B59B6"/>
            </div>
          </div>

          <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:20, textAlign:"center" }}>
            <div style={{ fontSize:11, color:C.text3, marginBottom:8 }}>🔒 Single Sign-On via Azure AD · Secured by MFA</div>
            <div style={{ fontSize:10, color:C.text3 }}>© 2025 Tata Steel Limited. All rights reserved.</div>
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
