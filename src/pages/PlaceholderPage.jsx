import C from "../theme";

export default function PlaceholderPage({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60vh", flexDirection:"column", gap:12 }}>
      <div style={{ fontSize:48 }}>🚧</div>
      <div style={{ fontSize:18, fontWeight:700, color:C.text, fontFamily:"'Playfair Display',serif" }}>{label}</div>
      <div style={{ fontSize:13, color:C.text3 }}>Coming soon.</div>
    </div>
  );
}
