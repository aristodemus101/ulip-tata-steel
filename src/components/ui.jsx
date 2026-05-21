import C from "../theme";

export const Card = ({ children, style={}, pad=20 }) => (
  <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:pad, boxShadow:"0 1px 6px #0E172608", ...style }}>
    {children}
  </div>
);

export const SLabel = ({ children, style={} }) => (
  <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:C.text3, marginBottom:10, ...style }}>
    {children}
  </div>
);

export const Bdg = ({ label, color=C.blue }) => (
  <span style={{ display:"inline-block", padding:"2px 9px", borderRadius:20, background:`${color}18`, color, fontSize:11, fontWeight:600, border:`1px solid ${color}30` }}>
    {label}
  </span>
);

export const Btn = ({ children, onClick, variant="outline", color=C.blue, style={}, disabled=false }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding:"8px 16px", borderRadius:9, cursor:disabled?"not-allowed":"pointer",
    border:variant==="fill"?"none":`1.5px solid ${color}40`,
    background:disabled?"#eee":variant==="fill"?color:`${color}0D`,
    color:disabled?"#aaa":variant==="fill"?"#fff":color,
    fontSize:12, fontWeight:600, fontFamily:"'DM Sans',sans-serif", ...style,
  }}>
    {children}
  </button>
);

export const Select = ({ value, onChange, options, placeholder, style={} }) => (
  <select value={value} onChange={e=>onChange(e.target.value)} style={{ padding:"8px 12px", borderRadius:8, border:`1px solid ${C.border}`, fontSize:12, color:C.text, background:C.white, outline:"none", fontFamily:"'DM Sans',sans-serif", ...style }}>
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(o=><option key={o}>{o}</option>)}
  </select>
);
