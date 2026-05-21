import { useState } from "react";

export default function ProfileAvatar({ size=90, edit=false }) {
  const [imgFailed, setImgFailed] = useState(false);

  const initials = (
    <div style={{ width:size, height:size, borderRadius:"50%", background:"linear-gradient(135deg,#0080C7,#0066A3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.3, fontWeight:800, color:"#fff", border:"3px solid #B3D9F0", position:"relative", flexShrink:0 }}>
      DM
      {edit && <div style={{ position:"absolute", bottom:2, right:2, width:Math.max(22,size*0.26), height:Math.max(22,size*0.26), borderRadius:"50%", background:"#0080C7", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.max(10,size*0.13), color:"#fff", cursor:"pointer" }}>✏</div>}
    </div>
  );

  if (imgFailed) return initials;

  return (
    <div style={{ position:"relative", width:size, height:size, flexShrink:0 }}>
      <img
        src="/mnt/user-data/uploads/1779365931803_image.png"
        alt="Divyaansh Mehta"
        onError={()=>setImgFailed(true)}
        style={{ width:size, height:size, borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"3px solid #B3D9F0", display:"block", boxShadow:"0 0 0 3px rgba(0,128,199,0.2)" }}
      />
      {edit && <div style={{ position:"absolute", bottom:2, right:2, width:Math.max(22,size*0.26), height:Math.max(22,size*0.26), borderRadius:"50%", background:"#0080C7", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.max(10,size*0.13), color:"#fff", cursor:"pointer" }}>✏</div>}
    </div>
  );
}
