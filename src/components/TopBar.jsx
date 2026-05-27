import { useState } from "react";
import C from "../theme";
import { TataLogoSVG } from "./Logos";
import ProfileAvatar from "./ProfileAvatar";

export default function TopBar({ notifications = [], onNotifClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profOpen,  setProfOpen]  = useState(false);
  const [q, setQ] = useState("");
  const unreadCount = notifications.filter(n => n.u).length;

  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, paddingBottom:14, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ flex:"0 1 320px", position:"relative", minWidth:180 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses, skills…"
          style={{ width:"100%", padding:"9px 14px 9px 34px", borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:12, color:C.text, background:C.white, outline:"none" }}/>
        <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:C.text3 }}>🔍</span>
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ padding:"5px 10px", borderRadius:8, background:C.blue3, fontSize:11, color:C.blue, fontWeight:600, whiteSpace:"nowrap" }}>🔥 42-day streak</div>
      <TataLogoSVG/>

      {/* Notifications */}
      <div style={{ position:"relative" }}>
        <button onClick={()=>{ setNotifOpen(p=>!p); setProfOpen(false); }} style={{ width:36, height:36, borderRadius:"50%", background:C.bg, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, position:"relative" }}>
          🔔
          {unreadCount>0 && <span style={{ position:"absolute", top:2, right:2, width:8, height:8, borderRadius:"50%", background:C.red, border:"2px solid #fff" }}/>}
        </button>
        {notifOpen && (
          <div style={{ position:"absolute", right:0, top:44, width:320, background:C.white, border:`1px solid ${C.border}`, borderRadius:12, boxShadow:"0 8px 24px #0E172618", zIndex:200, maxHeight:420, overflowY:"auto" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}`, fontSize:13, fontWeight:700, color:C.text, position:"sticky", top:0, background:C.white }}>
              Notifications {unreadCount>0 && <span style={{ marginLeft:6, padding:"1px 7px", borderRadius:10, background:C.red, color:"#fff", fontSize:10, fontWeight:700 }}>{unreadCount}</span>}
            </div>
            {notifications.map((n,i)=>(
              <div key={i} onClick={()=>{ if(n.action) { onNotifClick?.(n); setNotifOpen(false); } }}
                style={{ display:"flex", gap:10, padding:"10px 16px", borderBottom:i<notifications.length-1?`1px solid ${C.border}`:"none", background:n.u?C.blue3:C.white, cursor:n.action?"pointer":"default" }}>
                <span style={{ fontSize:18 }}>{n.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:C.text, fontWeight:n.action?600:400 }}>{n.text}</div>
                  <div style={{ fontSize:10, color:C.text3, marginTop:2 }}>{n.time}{n.action && <span style={{ marginLeft:6, color:C.blue, fontWeight:600 }}>Tap to open →</span>}</div>
                </div>
                {n.u && <div style={{ width:7, height:7, borderRadius:"50%", background:C.blue, flexShrink:0, marginTop:4 }}/>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ position:"relative" }}>
        <div onClick={()=>{ setProfOpen(p=>!p); setNotifOpen(false); }} style={{ cursor:"pointer" }}>
          <ProfileAvatar size={36}/>
        </div>
        {profOpen && (
          <div style={{ position:"absolute", right:0, top:44, width:200, background:C.white, border:`1px solid ${C.border}`, borderRadius:12, boxShadow:"0 8px 24px #0E172618", zIndex:200, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.text }}>Jay Pratap Singh</div>
              <div style={{ fontSize:11, color:C.text3 }}>TQM · H Blast Furnace · TSN</div>
            </div>
            {[{icon:"⚙",label:"Settings"},{icon:"❓",label:"Help Centre"},{icon:"📋",label:"FAQs"},{icon:"🚪",label:"Logout",color:C.red}].map((item,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", cursor:"pointer", fontSize:13, color:item.color||C.text, borderBottom:i<3?`1px solid ${C.border}`:"none" }}
                onMouseEnter={e=>e.currentTarget.style.background=C.bg}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
