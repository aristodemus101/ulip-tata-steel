import C from "../theme";
import { Card, Bdg } from "../components/ui";
import { TQM_GOALS } from "../data/learningData";

export default function GoalsPage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>My Learning Goals</h2>
        <Bdg label="TQM Competency Framework" color={C.blue}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {TQM_GOALS.map((g)=>(
          <Card key={g.id} style={{borderTop:`4px solid ${g.progress>=75?C.green:g.progress>=50?C.blue:C.accent}`,display:"flex",flexDirection:"column",minHeight:220}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
              <div style={{width:40,height:40,borderRadius:10,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{g.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.3}}>{g.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                  <div style={{flex:1,height:5,background:C.border,borderRadius:3}}>
                    <div style={{height:"100%",borderRadius:3,width:`${g.progress}%`,background:g.progress>=75?C.green:g.progress>=50?C.blue:C.accent}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:g.progress>=75?C.green:g.progress>=50?C.blue:C.accent,flexShrink:0}}>{g.progress}%</span>
                </div>
              </div>
            </div>
            <div style={{fontSize:11,color:C.text3,marginBottom:10,fontStyle:"italic"}}>Key areas to master:</div>
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
              {g.items.map((item,j)=>(
                <div key={j} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:C.text2}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:j<2?C.green:C.border,flexShrink:0}}/>
                  {item}
                </div>
              ))}
            </div>
            <button style={{marginTop:14,width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${C.blue}`,background:"transparent",color:C.blue,fontSize:11,fontWeight:600,cursor:"pointer"}}>
              {g.progress===100?"✓ Completed":"Continue →"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
