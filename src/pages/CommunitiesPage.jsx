import { useState } from "react";
import C from "../theme";
import { Card, Btn } from "../components/ui";
import ProfileAvatar from "../components/ProfileAvatar";
import { COMMUNITY_POSTS } from "../data/workData";

const TYPE_COLORS = { text:C.blue, insight:C.green, question:C.accent, achievement:"#9B59B6", tip:C.red };
const TYPE_LABELS = { text:"💬 Post", insight:"💡 Insight", question:"❓ Question", achievement:"🏆 Achievement", tip:"⚡ Tip" };

export default function CommunitiesPage() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts]     = useState(COMMUNITY_POSTS);

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts(p=>[{ author:"Jay Pratap Singh", dept:"TQM · TSN", avatar:"JS", color:C.blue, time:"Just now", text:newPost, likes:0, comments:0, type:"text" },...p]);
    setNewPost("");
  };

  return (
    <div style={{maxWidth:760,margin:"0 auto"}}>
      <h2 style={{fontSize:22,fontWeight:700,color:C.text,fontFamily:"'Playfair Display',serif",margin:"0 0 20px"}}>Communities</h2>

      <Card style={{marginBottom:20}}>
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <ProfileAvatar size={38}/>
          <div style={{flex:1}}>
            <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} placeholder="Share a learning, tip, question or achievement…" style={{width:"100%",minHeight:80,padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.border}`,fontSize:13,color:C.text,resize:"none",outline:"none",fontFamily:"'DM Sans',sans-serif"}}/>
            <div style={{display:"flex",gap:8,marginTop:10,justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:8}}>
                {["📷 Photo","📹 Video","📄 Document"].map(t=><button key={t} style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bg,color:C.text2,fontSize:12,cursor:"pointer"}}>{t}</button>)}
              </div>
              <Btn variant="fill" color={C.blue} onClick={addPost} disabled={!newPost.trim()}>Post</Btn>
            </div>
          </div>
        </div>
      </Card>

      {posts.map((post,i)=>(
        <Card key={i} style={{marginBottom:16}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
            <div style={{width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${post.color},${post.color}bb)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0}}>{post.avatar}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{post.author}</div>
              <div style={{fontSize:11,color:C.text3}}>{post.dept} · {post.time}</div>
            </div>
            <span style={{padding:"3px 10px",borderRadius:20,fontSize:10,fontWeight:600,background:`${TYPE_COLORS[post.type]}15`,color:TYPE_COLORS[post.type],border:`1px solid ${TYPE_COLORS[post.type]}30`}}>
              {TYPE_LABELS[post.type]}
            </span>
          </div>
          <div style={{fontSize:13,color:C.text2,lineHeight:1.7,marginBottom:14}}>{post.text}</div>
          <div style={{display:"flex",gap:6,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
            {[["👍",post.likes,"Like"],["💬",post.comments,"Comment"],["↗","","Share"]].map(([icon,count,label],j)=>(
              <button key={j} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.text2,fontSize:12,cursor:"pointer"}}>{icon} {count} <span style={{color:C.text3}}>{label}</span></button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
