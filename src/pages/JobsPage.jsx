import C from "../theme";
import { Card, Bdg, Btn } from "../components/ui";
import { JOB_OPENINGS } from "../data/workData";

export default function JobsPage() {
  return (
    <div style={{maxWidth:1100}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:0}}>Internal Job Openings</h2>
        <Bdg label="AI-matched to your profile" color={C.green}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {JOB_OPENINGS.map((job,i)=>(
          <Card key={i} style={{borderLeft:`4px solid ${job.match>=90?C.green:job.match>=85?C.blue:C.accent}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1,marginRight:12}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text,lineHeight:1.3,marginBottom:4}}>{job.title}</div>
                <div style={{fontSize:12,color:C.text3}}>{job.dept} · {job.location} · {job.level}</div>
              </div>
              <div style={{textAlign:"center",background:job.match>=90?`${C.green}15`:job.match>=85?C.blue3:`${C.accent}15`,borderRadius:10,padding:"6px 12px",flexShrink:0}}>
                <div style={{fontSize:16,fontWeight:800,color:job.match>=90?C.green:job.match>=85?C.blue:C.accent}}>{job.match}%</div>
                <div style={{fontSize:9,color:C.text3,textTransform:"uppercase"}}>Match</div>
              </div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {job.skills.map(s=><Bdg key={s} label={s} color={C.blue}/>)}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:11,color:C.text3}}>Posted {job.posted}</div>
              <Btn variant="fill" color={C.blue} style={{fontSize:11}}>Apply Now →</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
