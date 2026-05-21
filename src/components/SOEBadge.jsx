export default function SOEBadge({ level, size=40 }) {
  const configs = {
    Gold:     { bg:"linear-gradient(135deg,#F5A623,#F0C040)", border:"#F5A623", star:"⭐", glow:"rgba(245,166,35,0.4)" },
    Silver:   { bg:"linear-gradient(135deg,#8A94A6,#BCC2CC)", border:"#8A94A6", star:"🥈", glow:"rgba(138,148,166,0.4)" },
    Platinum: { bg:"linear-gradient(135deg,#9B59B6,#C39BD3)", border:"#9B59B6", star:"💎", glow:"rgba(155,89,182,0.4)" },
  };
  const cfg = configs[level] || configs.Gold;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:cfg.bg, border:`3px solid ${cfg.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.42, boxShadow:`0 0 12px ${cfg.glow}`, flexShrink:0 }}>
      {cfg.star}
    </div>
  );
}
