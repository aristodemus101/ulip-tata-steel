import { useState } from "react";
import C from "../theme";
import { Card, Bdg, Btn, SLabel } from "../components/ui";
import { MENTOR_LIST } from "../data/workData";

export default function MentorsPage() {
  const [sel, setSel]   = useState(null);
  const [area, setArea] = useState("");
  const [msg, setMsg]   = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div style={{maxWidth:1100}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:"0 0 20px"}}>Find an SME</h2>

      {sel && (
        <div style={{position:"fixed",inset:0,background:"#0E172660",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:C.white,borderRadius:18,width:460,padding:28,boxShadow:"0 16px 60px #0E172630"}}>
            {sent ? (
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:48,marginBottom:12}}>✅</div>
                <div style={{fontSize:18,fontWeight:700,color:C.green}}>Request Sent!</div>
                <div style={{fontSize:13,color:C.text3,marginTop:6,marginBottom:20}}>Your SME session request was sent to {sel.name}</div>
                <Btn onClick={()=>{setSent(false);setSel(null);setArea("");setMsg("");}}>Close</Btn>
              </div>
            ) : (
              <>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                  <div style={{width:50,height:50,borderRadius:"50%",background:`linear-gradient(135deg,${sel.color},${sel.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#fff"}}>{sel.avatar}</div>
                  <div><div style={{fontSize:15,fontWeight:700,color:C.text}}>{sel.name}</div><div style={{fontSize:12,color:C.text3}}>{sel.dept}</div></div>
                  <button onClick={()=>setSel(null)} style={{marginLeft:"auto",width:30,height:30,borderRadius:"50%",background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer",fontSize:14}}>✕</button>
                </div>
                <SLabel>Area of Expertise *</SLabel>
                <input value={area} onChange={e=>setArea(e.target.value)} placeholder={`e.g. ${sel.skills[0]}, career guidance…`} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:13,outline:"none",marginBottom:14}}/>
                <SLabel>What kind of support are you looking for? *</SLabel>
                <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Describe your learning goals and what you'd like help with…" style={{width:"100%",minHeight:100,padding:"10px 12px",borderRadius:9,border:`1px solid ${C.border}`,fontSize:12,resize:"vertical",outline:"none",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}/>
                <div style={{display:"flex",gap:10}}>
                  <Btn style={{flex:1}} onClick={()=>setSel(null)}>Cancel</Btn>
                  <Btn variant="fill" color={C.blue} style={{flex:1}} disabled={!area||!msg} onClick={()=>setSent(true)}>Send Request</Btn>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        {MENTOR_LIST.map((m,i)=>(
          <Card key={i}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${m.color},${m.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#fff",flexShrink:0}}>{m.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>{m.name}</div>
                <div style={{fontSize:11,color:C.text3}}>{m.dept}</div>
                <div style={{fontSize:11,color:C.text2,marginTop:2}}>⭐ {m.exp} experience</div>
              </div>
            </div>
            <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:8}}>📌 {m.area}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
              {m.skills.map(s=><Bdg key={s} label={s} color={m.color}/>)}
            </div>
            <div style={{display:"flex",gap:8}}>
              <Btn style={{flex:1,fontSize:11}} color={C.text3}>💬 Message</Btn>
              <Btn variant="fill" color={C.blue} style={{flex:1,fontSize:11}} onClick={()=>setSel(m)}>Request SME Session</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
