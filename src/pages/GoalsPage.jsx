import C from "../theme";
import { Card, Bdg } from "../components/ui";
import { TQM_GOALS } from "../data/learningData";

const PL_LABELS = ["","Basic","Can do with support","Can do independently","Practitioner","Expert"];
const PL_COL    = ["","#8A94A6","#F5A623","#0080C7","#9B59B6","#18B982"];
const xpToPL    = xp => Math.min(5, Math.floor(xp / 1000) + 1);

export default function GoalsPage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>My Learning Goals</h2>
        <Bdg label="TQM Competency Framework" color={C.blue}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {TQM_GOALS.map((g)=>{
          const pl      = xpToPL(g.xp);
          const plCol   = PL_COL[pl];
          const met     = pl >= g.targetPL;
          const xpInPL  = g.xp % 1000;
          const xpToNext= met ? 0 : g.targetPL * 1000 - g.xp;
          const barPct  = (g.xp / (g.targetPL * 1000)) * 100;
          return (
            <Card key={g.id} style={{borderTop:`4px solid ${met?C.green:plCol}`,display:"flex",flexDirection:"column",minHeight:230}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:C.blue3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{g.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.3,marginBottom:6}}>{g.title}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{padding:"2px 7px",borderRadius:6,background:`${plCol}18`,color:plCol,fontSize:10,fontWeight:700,border:`1px solid ${plCol}30`}}>PL{pl}</span>
                    <span style={{fontSize:9,color:C.text3}}>→</span>
                    <span style={{padding:"2px 7px",borderRadius:6,background:`${PL_COL[g.targetPL]}18`,color:PL_COL[g.targetPL],fontSize:10,fontWeight:600,border:`1px solid ${PL_COL[g.targetPL]}30`}}>PL{g.targetPL} target</span>
                    {met && <span style={{fontSize:9,color:C.green,fontWeight:700}}>✓ Met</span>}
                  </div>
                  <div style={{marginTop:8}}>
                    <div style={{flex:1,height:5,background:C.border,borderRadius:3}}>
                      <div style={{height:"100%",borderRadius:3,width:`${Math.min(100,barPct)}%`,background:met?C.green:plCol,transition:"width 0.4s"}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                      <span style={{fontSize:9,color:C.text3}}>{g.xp} / {g.targetPL * 1000} XP</span>
                      <span style={{fontSize:9,color:met?C.green:C.text3}}>{met?"Target reached":xpToNext+" XP to go"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{fontSize:11,color:C.text3,marginBottom:8,fontStyle:"italic"}}>Key areas to master:</div>
              <div style={{flex:1,display:"flex",flexDirection:"column",gap:5}}>
                {g.items.map((item,j)=>(
                  <div key={j} style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:C.text2}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:j<pl-1?C.green:C.border,flexShrink:0}}/>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{marginTop:8,padding:"6px 10px",borderRadius:7,background:`${plCol}10`,border:`1px solid ${plCol}25`,fontSize:9,color:plCol,fontWeight:600}}>
                {xpInPL}/1000 XP in PL{pl} · {PL_LABELS[pl]}
              </div>
              <button style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,border:`1.5px solid ${met?C.green:C.blue}`,background:"transparent",color:met?C.green:C.blue,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                {met?"✓ Target PL Reached":"Continue Learning →"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
