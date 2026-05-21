import { useState } from "react";
import C from "../theme";

export default function TDAChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from:"bot", text:"Hi Vikram! I'm TDA, your AI assistant. How can I help you today?" }]);
  const [inp, setInp] = useState("");

  const SUGG = ["How to start Line 4 safely?","What is lockout-tagout procedure?","Show troubleshooting for conveyor jams","Explain bearing replacement process"];

  const send = (t) => {
    const txt = t || inp;
    if (!txt.trim()) return;
    setMsgs(p=>[...p,{from:"user",text:txt},{from:"bot",text:`Here's what I found on "${txt}": Check the SOP module in ULIP. Want me to open the 2-min micro video?`}]);
    setInp("");
  };

  return (
    <>
      <div onClick={()=>setOpen(p=>!p)} style={{ position:"fixed", bottom:28, right:28, width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.blue2})`, boxShadow:`0 4px 20px ${C.blue}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, cursor:"pointer", zIndex:500 }}>
        {open?"✕":"🧠"}
      </div>
      {open && (
        <div style={{ position:"fixed", bottom:92, right:28, width:340, background:C.white, border:`1px solid ${C.border}`, borderRadius:16, boxShadow:"0 8px 40px #0E172620", zIndex:499, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:`linear-gradient(135deg,${C.blue},${C.blue2})`, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#ffffff20", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🧠</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>TDA Assistant</div>
              <div style={{ fontSize:10, color:"#ffffff80" }}>AI Powered · Future Ready</div>
            </div>
          </div>
          <div style={{ flex:1, maxHeight:240, overflowY:"auto", padding:"12px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {msgs.map((m,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:m.from==="user"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:10, background:m.from==="user"?C.blue:C.bg, color:m.from==="user"?"#fff":C.text, fontSize:12, lineHeight:1.5, borderBottomRightRadius:m.from==="user"?2:10, borderBottomLeftRadius:m.from==="bot"?2:10 }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 }}>
              {SUGG.map((s,i)=><div key={i} onClick={()=>send(s)} style={{ fontSize:10, padding:"3px 9px", borderRadius:20, background:C.blue3, color:C.blue, cursor:"pointer", border:`1px solid ${C.blue4}` }}>{s}</div>)}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask TDA anything…" style={{ flex:1, padding:"8px 12px", borderRadius:8, border:`1px solid ${C.border}`, fontSize:12, outline:"none" }}/>
              <button onClick={()=>send()} style={{ padding:"8px 12px", borderRadius:8, background:C.blue, border:"none", color:"#fff", fontSize:12, cursor:"pointer" }}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
