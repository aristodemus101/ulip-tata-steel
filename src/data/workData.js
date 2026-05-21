export const WORK_ORDERS = [
  { id:"WO-2026-1142", type:"Maintenance",     equipment:"Blast Furnace Tuyere – BF4",     priority:"Critical", status:"Open",     raised:"1h ago",  dept:"Operations TSN",       permit:"Work Permit #WP-448",       skills:["Blast Furnace Operations","Hydraulics & Pneumatics","Process Safety"], engagementPct:0  },
  { id:"WO-2026-1138", type:"Safety Shutdown", equipment:"Conveyor Belt – Zone 3",         priority:"High",     status:"Active",   raised:"3h ago",  dept:"Engineering",          permit:"Hot Work Permit #HWP-112",  skills:["Process Safety","LOTO Procedure","Emergency Response"], engagementPct:62 },
  { id:"WO-2026-1131", type:"Maintenance",     equipment:"Hydraulic Press – Pellet Plant", priority:"Medium",   status:"Active",   raised:"6h ago",  dept:"Operations TSN",       permit:"Cold Work Permit #CWP-89",  skills:["Hydraulics & Pneumatics","Predictive Maintenance"],   engagementPct:78 },
  { id:"WO-2026-1125", type:"Inspection",      equipment:"Furnace Cooling Water Lines",    priority:"High",     status:"Resolved", raised:"1d ago",  dept:"Maintenance",          permit:"Confined Space #CS-034",    skills:["Process Safety","Blast Furnace Operations"],          engagementPct:88 },
  { id:"WO-2026-1118", type:"Electrical",      equipment:"PLC Panel – Line 2 SCADA",       priority:"Medium",   status:"Active",   raised:"1d ago",  dept:"Automation",           permit:"Electrical Permit #EP-203", skills:["PLC Programming","Process Safety"],                    engagementPct:55 },
  { id:"WO-2026-1112", type:"Fire Permit",     equipment:"Welding – Sinter Plant Gate",    priority:"Low",      status:"Active",   raised:"2d ago",  dept:"Engineering",          permit:"Fire Permit #FP-067",       skills:["Fire Safety","LOTO Procedure","Hazmat Handling"],      engagementPct:91 },
];

export const GIGS_DATA = [
  { id:1, title:"Digital Twin Pilot – Blast Furnace #5",       owner:"Priya Krishnamurthy",  dept:"Technology & R&D",       match:94, deadline:"Jun 15", duration:"6 weeks", skills:[{name:"Industrial IoT",level:"Intermediate"},{name:"Data Analytics",level:"Advanced"},{name:"Python Basics",level:"Beginner"}],                                                desc:"Build a real-time digital twin model for Blast Furnace #5 using sensor feeds. The project involves data pipeline setup, anomaly detection modelling and dashboard creation for operators. Output will directly feed into the predictive maintenance programme.", image:"🏭" },
  { id:2, title:"TQM Circle – Sinter Quality Improvement",     owner:"Sunita Agarwal",       dept:"TQM, GSP & SC",          match:91, deadline:"Jun 08", duration:"4 weeks", skills:[{name:"Six Sigma",level:"Intermediate"},{name:"Statistical Process Control",level:"Intermediate"},{name:"TQM",level:"Beginner"}],                                            desc:"Cross-functional quality circle focused on reducing sinter cold strength variation. Work involves SPC chart analysis, root cause workshops and implementing control measures. Feeds into the ongoing ISO 9001 process excellence initiative.", image:"📊" },
  { id:3, title:"Safety Culture Assessment – TSN Site",        owner:"Rajesh Mohanty",       dept:"Safety, H & S",          match:88, deadline:"Jun 20", duration:"3 weeks", skills:[{name:"Process Safety",level:"Advanced"},{name:"Risk Assessment",level:"Intermediate"},{name:"Leadership & Communication",level:"Intermediate"}],                          desc:"Conduct a structured BBS (Behaviour-Based Safety) observation programme across 3 zones at TSN. Analyse near-miss data, present findings to site leadership and recommend interventions for the H2 2026 safety plan.", image:"🦺" },
  { id:4, title:"Kaizen Project – Pellet Plant Water Recovery", owner:"Dr. Anupam Sinha",    dept:"Operations TSN",         match:85, deadline:"Jul 01", duration:"5 weeks", skills:[{name:"Lean Manufacturing",level:"Intermediate"},{name:"Hydraulics & Pneumatics",level:"Beginner"},{name:"Data Analytics",level:"Beginner"}],                              desc:"Identify and eliminate water waste in pellet plant cooling circuits using value stream mapping and lean tools. Target: 15% reduction in water consumption. Eligible for Tata InnoVista internal recognition.", image:"💧" },
  { id:5, title:"AI-Powered Shift Handover Report Automation", owner:"Priya Krishnamurthy",  dept:"Technology & R&D",       match:82, deadline:"Jun 25", duration:"4 weeks", skills:[{name:"AI/ML Basics",level:"Beginner"},{name:"Python Basics",level:"Intermediate"},{name:"Digital Twins",level:"Beginner"}],                                              desc:"Prototype an LLM-powered shift handover report that auto-summarises sensor logs, maintenance tickets and KPI deviations. Built in Python, deployed on internal Azure environment. Great introduction to AI in industrial operations.", image:"🤖" },
  { id:6, title:"TPM Pillar Rollout – Slab Caster Zone",       owner:"Vikrant Desai",        dept:"Engineering & Projects", match:79, deadline:"Jul 10", duration:"8 weeks", skills:[{name:"TPM Fundamentals",level:"Intermediate"},{name:"PLC Programming",level:"Beginner"},{name:"Predictive Maintenance",level:"Beginner"}],                                desc:"Support implementation of TPM Pillars 1–3 (Autonomous, Planned, Quality Maintenance) across the slab caster section. Involves operator training, OEE baseline setting and establishing AM checksheets.", image:"⚙" },
];

export const JOB_OPENINGS = [
  { title:"Sr. Process Engineer – Blast Furnace", dept:"Operations TSJ",         location:"Jamshedpur",   level:"IL4", skills:["BF Ops","Process Opt.","Data Analytics"],        posted:"2d ago", match:96 },
  { title:"Data Analyst – Digital Transformation", dept:"Technology & R&D",      location:"Jamshedpur",   level:"IL3", skills:["Python","Power BI","SQL"],                       posted:"4d ago", match:91 },
  { title:"Safety Engineer – HSE Compliance",      dept:"Safety, H & S",         location:"TSK",          level:"IL3", skills:["Process Safety","HAZOP","Compliance"],            posted:"1d ago", match:88 },
  { title:"Quality Systems Lead – TQM",            dept:"TQM, GSP & SC",         location:"Jamshedpur",   level:"IL5", skills:["Six Sigma","TQM","SPC"],                          posted:"6d ago", match:84 },
  { title:"Automation Engineer – PLC & SCADA",     dept:"Engineering & Projects", location:"Meramandali", level:"IL3", skills:["PLC","SCADA","Automation"],                       posted:"3d ago", match:82 },
  { title:"Project Manager – CapEx Projects",      dept:"Engineering & Projects", location:"Jamshedpur",   level:"IL5", skills:["PM","Leadership","Cost Control"],                 posted:"5d ago", match:79 },
];

export const MENTOR_LIST = [
  { name:"Dr. Anupam Sinha",    area:"Blast Furnace Operations", dept:"TSN Operations",   exp:"22 yrs", skills:["BF Ops","Iron Making","Process Opt."], avatar:"AS", color:"#E5484D" },
  { name:"Priya Krishnamurthy", area:"Data Analytics & AI",      dept:"Technology & R&D", exp:"15 yrs", skills:["Analytics","Python","ML"],             avatar:"PK", color:"#0080C7" },
  { name:"Rajesh Mohanty",      area:"Safety & Environment",     dept:"Safety, H & S",    exp:"18 yrs", skills:["HSE","LOTO","Risk Mgmt"],              avatar:"RM", color:"#18B982" },
  { name:"Sunita Agarwal",      area:"TQM & Quality Systems",    dept:"TQM, GSP & SC",    exp:"14 yrs", skills:["Six Sigma","TQM","SPC"],               avatar:"SA", color:"#9B59B6" },
  { name:"Vikrant Desai",       area:"Digital & Automation",     dept:"Engineering",      exp:"12 yrs", skills:["PLC","IoT","Automation"],              avatar:"VD", color:"#F5A623" },
  { name:"Dr. Meera Nair",      area:"Leadership & OD",          dept:"HRM",              exp:"20 yrs", skills:["Leadership","Coaching","Change Mgmt"], avatar:"MN", color:"#FF6B35" },
];

export const COMMUNITY_POSTS = [
  { author:"Rajesh M.", dept:"Safety, H & S",   avatar:"RM", color:"#E5484D", time:"2h ago", text:"Just completed the new LOTO simulation module! The gamified format made it so much more engaging than the old classroom format. Highly recommend everyone in ops to try it 💪", likes:24, comments:7,  type:"tip"         },
  { author:"Priya K.",  dept:"Technology & R&D", avatar:"PK", color:"#0080C7", time:"5h ago", text:"Sharing our team's learnings from the Digital Twin pilot at Blast Furnace #4. Key insight: real-time sensor integration reduced unplanned downtime by 23% in Q1. Full case study is now on ULIP 🎯", likes:48, comments:13, type:"insight"     },
  { author:"Sunita A.", dept:"TQM, GSP & SC",   avatar:"SA", color:"#9B59B6", time:"1d ago", text:"Congratulations to the TQM Circle team on achieving Platinum level in the School of TQM! 🏆 A big milestone for our department.", likes:62, comments:21, type:"achievement" },
];

export const SKILL_GAP_DATA = {
  "TQM, GSP & SC":           [{skill:"TQM Fundamentals",gap:22},{skill:"Data Analytics",gap:38},{skill:"Supply Chain",gap:44},{skill:"Six Sigma",gap:18},{skill:"Policy Mgmt",gap:30}],
  "Operations TSJ":          [{skill:"BF Operations",gap:15},{skill:"PLC Programming",gap:42},{skill:"Predictive Maint.",gap:55},{skill:"Safety Protocols",gap:20},{skill:"Digital Tools",gap:60}],
  "Safety, H & S":           [{skill:"Process Safety",gap:12},{skill:"Emergency Response",gap:8},{skill:"HAZOP Analysis",gap:35},{skill:"Environmental Mgmt",gap:28},{skill:"Risk Assessment",gap:18}],
  "Technology & R&D":        [{skill:"AI/ML Basics",gap:48},{skill:"Data Analytics",gap:30},{skill:"Digital Twins",gap:62},{skill:"Python",gap:40},{skill:"IoT Platforms",gap:35}],
  "Engineering & Projects":  [{skill:"PLC/SCADA",gap:38},{skill:"Project Mgmt",gap:25},{skill:"CAD/CAM",gap:45},{skill:"Hydraulics",gap:30},{skill:"Automation",gap:52}],
  "HRM":                     [{skill:"HR Analytics",gap:55},{skill:"Change Mgmt",gap:32},{skill:"Learning Design",gap:40},{skill:"Digital Tools",gap:45},{skill:"Coaching Skills",gap:22}],
};

export const DEPT_FILTERS  = ["TQM, GSP & SC","Operations TSJ","Safety, H & S","Technology & R&D","Engineering & Projects","HRM","Finance","Corporate Services"];
export const LEVEL_FILTERS = ["IL1","IL2","IL3","IL4","IL5","IL6","IL7","IL8","IL9","IL10","IL11","IL12"];
export const BIZ_UNITS     = ["One IT","One Shared Services","TQM, GSP and Supply Chain","Technology and R&D","Engineering & Projects","Tata Steel Meramandali","Long Products Division","Raw Materials","Human Resources Management","Operations TSJ","Safety, Health & Sustainability","Corporate Services"];
export const OPR_LEVELS    = ["IL2","IL3","IL4","IL5","IL6"];
export const NOPR_LEVELS   = ["NS1","NS2","NS3","NS4","NS5","NS6","NS7","NS8","NS9","NS10","NS11","NS12"];

export const CREATED_TRAININGS = [
  { title:"Furnace Safety SOP",         type:"Course",     date:"Apr 20", participants:124, completion:78 },
  { title:"Blast Furnace Incident '23", type:"Case Study", date:"Apr 12", participants:89,  completion:91 },
  { title:"Quality Boss Fight Quiz",    type:"Gamified",   date:"Mar 28", participants:200, completion:64 },
  { title:"PLC Basics Simulation",      type:"Simulation", date:"Mar 10", participants:56,  completion:55 },
];

export const ACTIVE_PROGRAMS = [
  { name:"AURA Circles",       status:"Live",     participants:340, type:"Leadership",  since:"Mar 2024", color:"#18B982" },
  { name:"Safety First Cohort",status:"Active",   participants:180, type:"HSE",         since:"Apr 2024", color:"#0080C7" },
  { name:"Digital Upskilling", status:"Active",   participants:220, type:"Technology",  since:"Feb 2024", color:"#F5A623" },
  { name:"Lean Champions",     status:"Upcoming", participants:90,  type:"Operations",  since:"Jun 2024", color:"#9B59B6" },
];

export const REQUESTED_TRAININGS = [
  { dept:"Operations TSJ",   topic:"Advanced PLC Programming",   by:"Mgr. K. Nair",  date:"May 01", priority:"High"   },
  { dept:"Safety, H & S",    topic:"Emergency Evacuation Drill", by:"Mgr. A. Patel", date:"Apr 28", priority:"Medium" },
  { dept:"Technology & R&D", topic:"AI Tools for Engineers",     by:"Mgr. S. Gupta", date:"Apr 25", priority:"High"   },
];

export const EXISTING_MICROS = [
  { id:1, title:"The 7 Steps of Autonomous Maintenance", topic:"TPM",    duration:"2 min",   sent:340, openRate:78, successRate:82, groups:["Operations TSJ","TQM Dept"],   channels:["WhatsApp","Teams"],         status:"Active", created:"Apr 15", lastSent:"May 18" },
  { id:2, title:"What is Kaizen? A 90-second explainer", topic:"Lean",   duration:"1.5 min", sent:215, openRate:71, successRate:74, groups:["Engineering","Operations"],    channels:["Email","ULIP App"],         status:"Active", created:"Mar 20", lastSent:"May 10" },
  { id:3, title:"LOTO Procedure – Step by Step",         topic:"Safety", duration:"3 min",   sent:480, openRate:88, successRate:91, groups:["All Depts"],                   channels:["WhatsApp","Email"],         status:"Active", created:"Feb 08", lastSent:"May 20" },
  { id:4, title:"Reading a Control Chart (SPC Basics)",  topic:"Quality",duration:"2 min",   sent:140, openRate:62, successRate:67, groups:["TQM, GSP & SC"],               channels:["Teams"],                    status:"Paused", created:"Jan 30", lastSent:"Apr 12" },
  { id:5, title:"5S in 5 Minutes",                       topic:"TPM",    duration:"5 min",   sent:290, openRate:75, successRate:79, groups:["Operations TSJ","Safety"],     channels:["WhatsApp","Teams","Email"], status:"Active", created:"Jan 12", lastSent:"May 15" },
];

export const TQM_MICRO = {
  skill:"TQM",
  tag:"TPM · Daily Management",
  duration:"2 min",
  title:"The 7 Steps of Autonomous Maintenance",
  summary:"Autonomous Maintenance (AM) is a cornerstone of TPM. It shifts basic maintenance tasks — cleaning, lubrication, inspection, and tightening — to operators. This reduces breakdowns and builds ownership on the shopfloor.",
  keyPoints:[
    "Step 1: Initial cleaning & inspection",
    "Step 2: Eliminate contamination sources",
    "Step 3: Set cleaning & lubrication standards",
    "Step 4: General inspection skills",
    "Step 5: Autonomous inspection",
    "Step 6: Standardise & visualise workplaces",
    "Step 7: Full autonomous management",
  ],
  question:"Which step in Autonomous Maintenance involves operators taking full responsibility for their equipment without supervisor oversight?",
  options:[
    { id:"a", text:"Step 3 – Set Cleaning & Lubrication Standards" },
    { id:"b", text:"Step 5 – Autonomous Inspection" },
    { id:"c", text:"Step 7 – Full Autonomous Management" },
    { id:"d", text:"Step 2 – Eliminate Contamination Sources" },
  ],
  correct:"c",
};
