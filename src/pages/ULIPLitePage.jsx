import { useState } from "react";
import C from "../theme";
import TDAChatbot from "../components/TDAChatbot";

const T = {
  en: {
    tagline:    "Contractor Learning Portal",
    welcome:    "Welcome to ULIP Lite",
    welcomeSub: "Your quick access to safety training, microlearning and AI assistance.",
    videos:     "Video Recommendations",
    micro:      "Quick Learning",
    logout:     "Logout",
    watch:      "Watch",
    start:      "Start",
    videoList: [
      { icon:"🔥", title:"Fire Safety & Extinguisher Use",  duration:"4 min",  tag:"Safety",    color:"#E5484D" },
      { icon:"🔒", title:"LOTO Procedure — Step by Step",   duration:"3 min",  tag:"Safety",    color:"#F5A623" },
      { icon:"🦺", title:"PPE Usage Guide",                 duration:"5 min",  tag:"Safety",    color:"#18B982" },
      { icon:"🚨", title:"Site Emergency Procedures",       duration:"6 min",  tag:"Emergency", color:"#9B59B6" },
    ],
    microList: [
      { icon:"🚨", title:"Emergency Alarm Codes",   duration:"2 min", tag:"Emergency",  color:"#E5484D", desc:"Know every alarm tone and the correct action to take on the shopfloor." },
      { icon:"🩺", title:"Basic First Aid Steps",   duration:"3 min", tag:"Health",     color:"#18B982", desc:"Immediate response steps for common workplace injuries and incidents." },
      { icon:"⚠️", title:"Hazardous Area Rules",    duration:"2 min", tag:"Safety",     color:"#F5A623", desc:"Zones, signage and mandatory PPE for restricted and dangerous areas." },
      { icon:"📋", title:"Safe Work Permit System", duration:"2 min", tag:"Compliance", color:"#9B59B6", desc:"How to read and follow a work permit before starting any job on site." },
    ],
  },
  hi: {
    tagline:    "ठेका कर्मी शिक्षण पोर्टल",
    welcome:    "ULIP Lite में आपका स्वागत है",
    welcomeSub: "सुरक्षा प्रशिक्षण, माइक्रोलर्निंग और AI सहायता तक त्वरित पहुँच।",
    videos:     "वीडियो अनुशंसाएँ",
    micro:      "त्वरित शिक्षण",
    logout:     "लॉग आउट",
    watch:      "देखें",
    start:      "शुरू करें",
    videoList: [
      { icon:"🔥", title:"अग्नि सुरक्षा और अग्निशामक उपयोग", duration:"4 मिनट", tag:"सुरक्षा",   color:"#E5484D" },
      { icon:"🔒", title:"LOTO प्रक्रिया — चरण दर चरण",       duration:"3 मिनट", tag:"सुरक्षा",   color:"#F5A623" },
      { icon:"🦺", title:"PPE उपयोग मार्गदर्शिका",             duration:"5 मिनट", tag:"सुरक्षा",   color:"#18B982" },
      { icon:"🚨", title:"साइट आपातकालीन प्रक्रियाएँ",        duration:"6 मिनट", tag:"आपातकाल",  color:"#9B59B6" },
    ],
    microList: [
      { icon:"🚨", title:"आपातकालीन अलार्म कोड",    duration:"2 मिनट", tag:"आपातकाल",  color:"#E5484D", desc:"हर अलार्म की आवाज़ और उस पर क्या करना है, यह जानें।" },
      { icon:"🩺", title:"बुनियादी प्राथमिक चिकित्सा",duration:"3 मिनट", tag:"स्वास्थ्य", color:"#18B982", desc:"कार्यस्थल पर चोट या घटना होने पर तुरंत करने योग्य कदम।" },
      { icon:"⚠️", title:"खतरनाक क्षेत्र के नियम",  duration:"2 मिनट", tag:"सुरक्षा",   color:"#F5A623", desc:"प्रतिबंधित क्षेत्रों में ज़ोन, संकेत और अनिवार्य PPE।" },
      { icon:"📋", title:"कार्य अनुमति प्रणाली",    duration:"2 मिनट", tag:"अनुपालन",  color:"#9B59B6", desc:"काम शुरू करने से पहले वर्क परमिट पढ़ें और उसका पालन करें।" },
    ],
  },
  od: {
    tagline:    "ଠିକା କର୍ମୀ ଶିକ୍ଷା ପୋର୍ଟାଲ",
    welcome:    "ULIP Lite ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
    welcomeSub: "ସୁରକ୍ଷା ପ୍ରଶିକ୍ଷଣ, ମାଇକ୍ରୋ ଲର୍ନିଂ ଓ AI ସହାୟତା ପାଇଁ ତ୍ୱରିତ ପ୍ରବେଶ।",
    videos:     "ଭିଡ଼ିଓ ସୁପାରିଶ",
    micro:      "ଶୀଘ୍ର ଶିଖ",
    logout:     "ଲଗ ଆଉଟ",
    watch:      "ଦେଖନ୍ତୁ",
    start:      "ଆରମ୍ଭ",
    videoList: [
      { icon:"🔥", title:"ଅଗ୍ନି ସୁରକ୍ଷା ଓ ଅଗ୍ନି ନିର୍ବାପକ ବ୍ୟବହାର", duration:"4 ମିନଟ", tag:"ସୁରକ୍ଷା", color:"#E5484D" },
      { icon:"🔒", title:"LOTO ପ୍ରକ୍ରିୟା — ପଦକ୍ଷେପ ଦ୍ୱାରା ପଦକ୍ଷେପ", duration:"3 ମିନଟ", tag:"ସୁରକ୍ଷା", color:"#F5A623" },
      { icon:"🦺", title:"PPE ବ୍ୟବହାର ନିର୍ଦ୍ଦେଶ",                    duration:"5 ମିନଟ", tag:"ସୁରକ୍ଷା", color:"#18B982" },
      { icon:"🚨", title:"ସାଇଟ ଜରୁରୀ ପ୍ରକ୍ରିୟା",                    duration:"6 ମିନଟ", tag:"ଜରୁରୀ",  color:"#9B59B6" },
    ],
    microList: [
      { icon:"🚨", title:"ଜରୁରୀ ଆଲାର୍ମ କୋଡ",       duration:"2 ମିନଟ", tag:"ଜରୁରୀ",    color:"#E5484D", desc:"ପ୍ରତ୍ୟେକ ଆଲାର୍ମ ଧ୍ୱନି ଓ ତାର ଉପରେ ସଠିକ ପ୍ରତ୍ୟୁତ୍ତର ଜାଣନ୍ତୁ।" },
      { icon:"🩺", title:"ମୌଳିକ ପ୍ରଥମ ସହାୟତା",      duration:"3 ମିନଟ", tag:"ସ୍ୱାସ୍ଥ୍ୟ",  color:"#18B982", desc:"କର୍ମ ସ୍ଥଳ ଆଘାତ ପ୍ରତି ତ୍ୱରିତ ଓ ସଠିକ ପ୍ରଥମ ପ୍ରତ୍ୟୁତ୍ତର।" },
      { icon:"⚠️", title:"ବିପଜ୍ଜନକ ଅଞ୍ଚଳ ନିୟମ",    duration:"2 ମିନଟ", tag:"ସୁରକ୍ଷା",  color:"#F5A623", desc:"ସୀମିତ ଅଞ୍ଚଳ ପାଇଁ ଜୋନ, ସଂକେତ ଓ ବାଧ୍ୟତାମୂଳକ PPE ନିୟମ।" },
      { icon:"📋", title:"କାର୍ଯ୍ୟ ଅନୁମତି ପ୍ରଣାଳୀ",  duration:"2 ମିନଟ", tag:"ସ୍ୱୀକୃତି", color:"#9B59B6", desc:"ସାଇଟରେ କାମ ଆରମ୍ଭ ପୂର୍ବରୁ ୱାର୍କ ପରମିଟ ପଢ଼ନ୍ତୁ ଓ ଅନୁସରଣ କରନ୍ତୁ।" },
    ],
  },
};

export default function ULIPLitePage({ onLogout }) {
  const [lang, setLang] = useState("en");
  const tx = T[lang];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&family=Noto+Sans:wght@400;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#B3D9F0; border-radius:3px; }
      `}</style>

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(135deg,#001E3C,#0080C7)", padding:"0 28px", height:62, display:"flex", alignItems:"center", gap:16, boxShadow:"0 2px 16px rgba(0,0,0,0.25)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:9, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚡</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff", fontFamily:"'Playfair Display',serif", letterSpacing:"-0.3px", lineHeight:1.1 }}>ULIP Lite</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.65)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{tx.tagline}</div>
          </div>
        </div>

        {/* Language Toggle */}
        <div style={{ marginLeft:"auto", display:"flex", gap:5 }}>
          {[{code:"en",label:"EN"},{code:"hi",label:"हिन्दी"},{code:"od",label:"ଓଡ଼ିଆ"}].map(l => (
            <button key={l.code} onClick={()=>setLang(l.code)} style={{
              padding:"6px 14px", borderRadius:20,
              border:`1.5px solid ${lang===l.code?"#fff":"rgba(255,255,255,0.3)"}`,
              background:lang===l.code?"rgba(255,255,255,0.22)":"transparent",
              color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer",
              transition:"all 0.15s", fontFamily:"'Noto Sans','DM Sans',sans-serif",
            }}>{l.label}</button>
          ))}
        </div>

        <button onClick={onLogout} style={{ padding:"6px 16px", borderRadius:20, border:"1.5px solid rgba(255,255,255,0.3)", background:"transparent", color:"rgba(255,255,255,0.8)", fontSize:12, cursor:"pointer", marginLeft:8, fontFamily:"'DM Sans',sans-serif" }}>
          {tx.logout} ↩
        </button>
      </div>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main style={{ maxWidth:1100, margin:"0 auto", padding:"28px 28px 100px" }}>

        {/* Welcome Banner */}
        <div style={{ background:"linear-gradient(135deg,#003D6B,#0080C7)", borderRadius:18, padding:"24px 28px", marginBottom:32, display:"flex", alignItems:"center", gap:20, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
          <div style={{ width:54, height:54, borderRadius:14, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>👷</div>
          <div style={{ position:"relative", zIndex:1 }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:"#fff", fontFamily:"'Playfair Display',serif", margin:"0 0 6px", lineHeight:1.2 }}>{tx.welcome}</h1>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.75)", margin:0, lineHeight:1.6 }}>{tx.welcomeSub}</p>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:6, flexWrap:"wrap", position:"relative", zIndex:1 }}>
            {["GWC","Contract Workforce","Tata Steel"].map(tag => (
              <span key={tag} style={{ padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", fontSize:10, color:"rgba(255,255,255,0.85)", fontWeight:600 }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* ── Videos ──────────────────────────────────────────────────── */}
        <div style={{ marginBottom:32 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:C.blue }}/>
            <h2 style={{ fontSize:16, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif", margin:0 }}>📹 {tx.videos}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {tx.videoList.map((v, i) => (
              <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, overflow:"hidden", cursor:"pointer", transition:"box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 6px 24px ${v.color}35`; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
                <div style={{ height:120, background:`linear-gradient(135deg,${v.color}dd,${v.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <div style={{ width:50, height:50, borderRadius:"50%", background:"rgba(255,255,255,0.25)", border:"2.5px solid rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:"#fff" }}>▶</div>
                  <div style={{ position:"absolute", top:8, right:8, padding:"2px 7px", borderRadius:8, background:"rgba(0,0,0,0.35)", color:"#fff", fontSize:9, fontWeight:700 }}>{v.duration}</div>
                  <span style={{ position:"absolute", bottom:8, left:10, fontSize:22 }}>{v.icon}</span>
                </div>
                <div style={{ padding:"12px 14px" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.4, marginBottom:8, minHeight:34, fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>{v.title}</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ padding:"2px 7px", borderRadius:8, background:`${v.color}18`, color:v.color, fontSize:9, fontWeight:700, fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>{v.tag}</span>
                    <span style={{ fontSize:11, color:C.blue, fontWeight:700 }}>{tx.watch} →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Microlearning ────────────────────────────────────────────── */}
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#F5A623" }}/>
            <h2 style={{ fontSize:16, fontWeight:800, color:C.text, fontFamily:"'Playfair Display',serif", margin:0 }}>⚡ {tx.micro}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {tx.microList.map((m, i) => (
              <div key={i} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px", cursor:"pointer", transition:"box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 6px 24px ${m.color}30`; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:42, height:42, borderRadius:11, background:`${m.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{m.icon}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:C.text, lineHeight:1.35, fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>{m.title}</div>
                    <div style={{ fontSize:9, color:m.color, fontWeight:700, marginTop:2, fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>{m.tag} · {m.duration}</div>
                  </div>
                </div>
                <p style={{ fontSize:11, color:C.text3, lineHeight:1.6, margin:"0 0 12px", fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>{m.desc}</p>
                <button style={{ width:"100%", padding:"9px", borderRadius:9, background:`linear-gradient(135deg,${m.color},${m.color}bb)`, border:"none", color:"#fff", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Noto Sans','DM Sans',sans-serif" }}>
                  {tx.start} ⚡
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <TDAChatbot />
    </div>
  );
}
