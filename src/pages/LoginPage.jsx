import C from "../theme";
import { ULIPLogoImg } from "../components/Logos";
import { Bdg } from "../components/ui";

export default function LoginPage({ onLogin }) {
  const FEATURES = [
    { icon:"🎯", label:"AI Learning Journeys"       },
    { icon:"⚡", label:"Microlearning in Minutes"    },
    { icon:"📊", label:"Real-time Skill Dashboard"  },
    { icon:"🏅", label:"SOE Certifications"         },
    { icon:"🧠", label:"TDA Knowledge Assistant"    },
  ];

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg,${C.blue2} 0%,${C.blue} 50%,#00A8E8 100%)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
      <div style={{ position:"absolute", bottom:-150, left:-80, width:500, height:500, borderRadius:"50%", background:"rgba(255,255,255,0.03)" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:980, padding:"0 24px", display:"flex", gap:60, alignItems:"center" }}>
        {/* Left panel */}
        <div style={{ flex:1 }}>
          <div style={{ marginBottom:24 }}>
            <ULIPLogoImg size={120}/>
          </div>
          <div style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:4 }}>Unified Learning Intelligence Platform</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:32 }}>Tata Steel · Human Resources Management</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {FEATURES.map((f,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", borderRadius:10, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", animation:`fadeSlide 0.4s ease ${i*0.1}s both` }}>
                <span style={{ fontSize:20 }}>{f.icon}</span>
                <span style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.9)" }}>{f.label}</span>
                <div style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:C.green }}/>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width:380, background:"rgba(255,255,255,0.97)", borderRadius:20, padding:36, boxShadow:"0 24px 80px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif" }}>Welcome Back</div>
            <div style={{ fontSize:13, color:C.text3, marginTop:6 }}>Select your login type to continue</div>
          </div>

          <div onClick={onLogin} style={{ padding:"20px 22px", borderRadius:14, border:`2px solid ${C.blue}`, background:C.blue3, cursor:"pointer", marginBottom:14, transition:"all 0.18s" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg,${C.blue},${C.blue2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🧑‍💼</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.text }}>Login for OPR / NOPR</div>
                <div style={{ fontSize:12, color:C.text3, marginTop:2 }}>For permanent employees (IL & NS levels)</div>
              </div>
              <span style={{ fontSize:18, color:C.blue }}>→</span>
            </div>
          </div>

          <div style={{ padding:"20px 22px", borderRadius:14, border:`2px solid ${C.border}`, background:"#fafafa", cursor:"not-allowed", opacity:0.6, marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:"linear-gradient(135deg,#9B59B6,#6C3483)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>👷</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.text }}>Login for Contractor</div>
                <div style={{ fontSize:12, color:C.text3, marginTop:2 }}>GWC / Contract workforce access</div>
              </div>
              <Bdg label="Coming Soon" color="#9B59B6"/>
            </div>
          </div>

          <div style={{ textAlign:"center", fontSize:11, color:C.text3 }}>Single Sign-On via Azure AD · Secured by MFA</div>
        </div>
      </div>

      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
