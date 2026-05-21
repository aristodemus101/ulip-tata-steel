export function ULIPLogoImg({ size=48 }) {
  const s = size;
  return (
    <div style={{ width:s, height:s, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4FC3F7"/>
            <stop offset="60%" stopColor="#0080C7"/>
            <stop offset="100%" stopColor="#003D6B"/>
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0080C7" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0080C7" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="48" r="44" fill="url(#glowGrad)"/>
        <circle cx="50" cy="48" r="32" fill="url(#globeGrad)" opacity="0.95"/>
        <ellipse cx="50" cy="48" rx="18" ry="32" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="18" y1="48" x2="82" y2="48" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="22" y1="34" x2="78" y2="34" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <line x1="22" y1="62" x2="78" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        <ellipse cx="50" cy="48" rx="42" ry="14" fill="none" stroke="#90CAF9" strokeWidth="2.5" opacity="0.7" transform="rotate(-20 50 48)"/>
        <path d="M72 58 L84 58 L84 65 L90 65" stroke="#90CAF9" strokeWidth="1.5" fill="none"/>
        <circle cx="90" cy="65" r="2.5" fill="#4FC3F7"/>
        <path d="M84 58 L84 52 L90 52" stroke="#90CAF9" strokeWidth="1" fill="none"/>
        <circle cx="90" cy="52" r="2" fill="#0080C7"/>
        {[[50,28],[68,42],[62,60],[38,60],[32,42],[50,48]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#E3F2FD" opacity="0.9"/>
        ))}
        <path d="M50 28 L68 42 L62 60 L38 60 L32 42 L50 28" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" fill="none"/>
      </svg>
    </div>
  );
}

export function TataLogoSVG() {
  return (
    <div style={{ background:"#ffffff", borderRadius:8, padding:"5px 14px", display:"flex", alignItems:"center", height:40, border:"1px solid #DDE6EF", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>
      <svg height={22} viewBox="0 0 180 36" xmlns="http://www.w3.org/2000/svg" style={{display:"block"}}>
        <text x="0"  y="27" fontFamily="'Arial Black',Gadget,sans-serif" fontWeight="900" fontSize="28" fill="#0078C8" letterSpacing="-1">TATA</text>
        <text x="96" y="27" fontFamily="Arial,Helvetica,sans-serif"       fontWeight="600" fontSize="26" fill="#0078C8" letterSpacing="-0.5">STEEL</text>
      </svg>
    </div>
  );
}
