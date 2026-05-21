import C from "../theme";
import { NAV_ITEMS } from "../data/navItems";
import { ULIPLogoImg } from "./Logos";
import ProfileAvatar from "./ProfileAvatar";

export default function Sidebar({ active, setActive }) {
  return (
    <aside style={{ width:230, background:C.sidebar, display:"flex", flexDirection:"column", flexShrink:0, zIndex:10 }}>
      <div style={{ padding:"16px 18px 12px", borderBottom:"1px solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", gap:12 }}>
        <ULIPLogoImg size={44}/>
        <div>
          <div style={{ fontSize:18, fontWeight:800, color:"#fff", fontFamily:"'Playfair Display',serif", letterSpacing:"-0.5px" }}>ULIP</div>
          <div style={{ fontSize:8, color:"rgba(255,255,255,0.85)", textTransform:"uppercase", letterSpacing:"0.15em", lineHeight:1.3 }}>AI Powered · Future Ready</div>
        </div>
      </div>

      <div style={{ padding:"10px 18px", borderBottom:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", gap:10 }}>
        <ProfileAvatar size={32}/>
        <div>
          <div style={{ fontSize:12, fontWeight:600, color:"#fff" }}>Vikram Mehta</div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.85)" }}>TQM · H BF · TSN · IL4</div>
        </div>
      </div>

      <nav style={{ flex:1, padding:"10px", overflowY:"auto" }}>
        {NAV_ITEMS.map(item=>(
          <button key={item.id} onClick={()=>setActive(item.id)} style={{
            width:"100%", display:"flex", alignItems:"center", gap:10,
            padding:"9px 12px", borderRadius:9, border:"none",
            background:active===item.id?"rgba(255,255,255,0.22)":"transparent",
            color:"#fff", fontSize:12, cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif", marginBottom:2,
            textAlign:"left", fontWeight:active===item.id?700:500,
            borderLeft:active===item.id?"3px solid #fff":"3px solid transparent",
            opacity:active===item.id?1:0.88,
          }}>
            <span style={{ fontSize:14, width:18, textAlign:"center", flexShrink:0 }}>{item.icon}</span>
            {item.label}
            {item.id==="director" && <span style={{ marginLeft:"auto", fontSize:9, padding:"1px 5px", borderRadius:8, background:"rgba(245,166,35,0.25)", color:"#FFD166", fontWeight:700 }}>PRO</span>}
          </button>
        ))}
      </nav>

      <div style={{ padding:"10px 14px", margin:"0 10px 14px", background:"rgba(255,255,255,0.12)", borderRadius:10, border:"1px solid rgba(255,255,255,0.25)" }}>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.75)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:3 }}>Powered by</div>
        <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>TDA Intelligence</div>
      </div>
    </aside>
  );
}
