export const SKILL_MODULES = {
  "Fire Safety": [
    { type:"micro",  icon:"⚡", title:"Fire Triangle & Classes of Fire",  duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Fire Prevention Fundamentals",     duration:"1h 30m", xp:25 },
    { type:"micro",  icon:"⚡", title:"Extinguisher Selection Guide",     duration:"3 min",  xp:5  },
    { type:"assess", icon:"📝", title:"Fire Safety Checkpoint Quiz",      duration:"10 min", xp:50, q:"What type of extinguisher should be used for an electrical fire?", opts:["Water (Class A)","CO₂ / Dry Powder","Foam (Class B)","Sand bucket"], correct:1 },
  ],
  "Emergency Response": [
    { type:"micro",  icon:"⚡", title:"Emergency Alarm Codes at TSN",    duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Emergency Evacuation Procedures",  duration:"45 min", xp:20 },
    { type:"assess", icon:"📝", title:"Emergency Response Quick Check",  duration:"8 min",  xp:30, q:"What is the first action when a fire alarm sounds on the shopfloor?", opts:["Call the supervisor","Continue work and wait for instructions","Evacuate immediately via the nearest exit","Locate the fire extinguisher"], correct:2 },
  ],
  "Process Safety": [
    { type:"micro",  icon:"⚡", title:"Hazard Identification Basics",     duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"HAZOP Study Methodology",          duration:"2h",     xp:40 },
    { type:"course", icon:"📘", title:"Process Safety Management (PSM)", duration:"3h",     xp:60 },
    { type:"assess", icon:"📝", title:"Process Safety Assessment",        duration:"15 min", xp:50, q:"What does HAZOP stand for?", opts:["Hazard & Operability Study","High Accuracy Operations Process","Hazard Assessment & Operations Plan","Health & Operational Protocol"], correct:0 },
  ],
  "LOTO Procedure": [
    { type:"micro",  icon:"⚡", title:"LOTO in 60 Seconds",              duration:"1 min",  xp:5  },
    { type:"course", icon:"📘", title:"Lockout-Tagout Full Procedure",    duration:"1h",     xp:20 },
    { type:"assess", icon:"📝", title:"LOTO Compliance Check",           duration:"10 min", xp:50, q:"How many steps does the standard 6-step LOTO procedure have?", opts:["4","5","6","8"], correct:2 },
  ],
  "PLC Programming": [
    { type:"micro",  icon:"⚡", title:"What is a PLC? 90-sec explainer", duration:"1.5 min",xp:5  },
    { type:"course", icon:"📘", title:"PLC Architecture & I/O Modules",  duration:"2h",     xp:40 },
    { type:"micro",  icon:"⚡", title:"Ladder Logic Basics",             duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Siemens S7-1500 Programming",     duration:"4h",     xp:80 },
    { type:"assess", icon:"📝", title:"PLC Knowledge Check",             duration:"10 min", xp:50, q:"Which PLC programming language uses graphical 'rungs' to represent logic?", opts:["Structured Text","Function Block Diagram","Ladder Diagram","Instruction List"], correct:2 },
  ],
  "Predictive Maintenance": [
    { type:"micro",  icon:"⚡", title:"Vibration Analysis Basics",       duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Predictive vs Preventive Maintenance",duration:"1h 30m",xp:30},
    { type:"project",icon:"🛠",  title:"Analyse Bearing Vibration Data", duration:"3 days", xp:80 },
    { type:"assess", icon:"📝", title:"Predictive Maintenance Quiz",     duration:"10 min", xp:50, q:"Which parameter is most commonly used in vibration-based condition monitoring?", opts:["Temperature","Velocity (mm/s)","Voltage","Pressure"], correct:1 },
  ],
  "Blast Furnace Operations": [
    { type:"micro",  icon:"⚡", title:"BF Iron-making Overview",         duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Blast Furnace Process Control",   duration:"3h",     xp:60 },
    { type:"assess", icon:"📝", title:"BF Operations Assessment",        duration:"10 min", xp:50, q:"What is the primary reducing agent used in a blast furnace?", opts:["Oxygen","Coke","Limestone","Coal dust"], correct:1 },
  ],
  "Industrial IoT": [
    { type:"micro",  icon:"⚡", title:"IIoT vs Traditional SCADA",       duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Industrial IoT Essentials",        duration:"3h 20m", xp:60 },
    { type:"project",icon:"🛠",  title:"Connect a Sensor to Azure IoT",  duration:"1 week", xp:100},
    { type:"assess", icon:"📝", title:"IoT Knowledge Check",             duration:"10 min", xp:50, q:"Which protocol is most commonly used for lightweight IoT device communication?", opts:["HTTP","FTP","MQTT","SOAP"], correct:2 },
  ],
  "Team Management": [
    { type:"micro",  icon:"⚡", title:"Situational Leadership in 3 min",duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Building High-Performance Teams", duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:"Leadership Style Assessment",     duration:"8 min",  xp:30, q:"In Situational Leadership, which style suits a highly skilled but unmotivated employee?", opts:["Directing (S1)","Coaching (S2)","Supporting (S3)","Delegating (S4)"], correct:2 },
  ],
  "Project Management": [
    { type:"micro",  icon:"⚡", title:"5 Phases of Project Management",  duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Project Planning & WBS",          duration:"2h",     xp:40 },
    { type:"assess", icon:"📝", title:"PM Fundamentals Quiz",            duration:"10 min", xp:50, q:"Which document formally authorises a project to begin?", opts:["Project Charter","Scope Statement","WBS","Risk Register"], correct:0 },
  ],
  "Data Analytics": [
    { type:"micro",  icon:"⚡", title:"What is Data Analytics?",         duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Excel for KPI Dashboards",        duration:"2h",     xp:30 },
    { type:"micro",  icon:"⚡", title:"Reading a Control Chart",         duration:"3 min",  xp:5  },
    { type:"course", icon:"📘", title:"Power BI Fundamentals",           duration:"3h",     xp:50 },
    { type:"project",icon:"🛠",  title:"Build a Shift Report Dashboard", duration:"1 week", xp:100},
    { type:"assess", icon:"📝", title:"Analytics Skills Check",         duration:"10 min", xp:50, q:"Which chart type best shows a trend over time?", opts:["Pie Chart","Bar Chart","Line Chart","Histogram"], correct:2 },
  ],
  "Python Basics": [
    { type:"micro",  icon:"⚡", title:"Why Python for Engineers?",        duration:"2 min",  xp:5  },
    { type:"course", icon:"📘", title:"Python Fundamentals for Non-Coders",duration:"3h",   xp:60 },
    { type:"micro",  icon:"⚡", title:"Pandas DataFrames in 3 Minutes",  duration:"3 min",  xp:5  },
    { type:"project",icon:"🛠",  title:"Automate a Monthly Report",       duration:"3 days", xp:80 },
    { type:"assess", icon:"📝", title:"Python Basics Quiz",               duration:"10 min", xp:50, q:"Which Python library is primarily used for data manipulation with DataFrames?", opts:["NumPy","Matplotlib","Pandas","Seaborn"], correct:2 },
  ],
};

export const SKILL_NAMES = [
  "Data Analytics","PLC Programming","Process Safety","Quality Systems","Six Sigma",
  "Lean Manufacturing","Industrial IoT","Blast Furnace Operations","TPM Fundamentals",
  "Python for Engineers","Statistical Process Control","Predictive Maintenance",
  "Leadership & Communication","Project Management","Blockchain Basics",
  "Root Cause Analysis","Hydraulics & Pneumatics","Digital Twins","AI/ML Basics","Supply Chain Analytics",
];

export const SKILL_GAPS = [
  { skill:"Fire Safety",              current:72, required:90, category:"Safety"      },
  { skill:"Emergency Response",       current:55, required:80, category:"Safety"      },
  { skill:"Process Safety",           current:71, required:90, category:"Safety"      },
  { skill:"LOTO Procedure",           current:65, required:85, category:"Safety"      },
  { skill:"PLC Programming",          current:28, required:70, category:"Engineering" },
  { skill:"Predictive Maintenance",   current:55, required:75, category:"Engineering" },
  { skill:"Blast Furnace Operations", current:82, required:90, category:"Engineering" },
  { skill:"Industrial IoT",           current:35, required:65, category:"Engineering" },
  { skill:"Team Management",          current:60, required:75, category:"Leadership"  },
  { skill:"Project Management",       current:55, required:70, category:"Leadership"  },
  { skill:"Data Analytics",           current:42, required:80, category:"Digital"     },
  { skill:"Python Basics",            current:22, required:60, category:"Digital"     },
];

export const LEARNING_MAP = {
  Beginner:    { color:"#18B982", items:["2-min micro: What is {skill}?","Infographic: Key concepts","Video: Introduction to {skill}","Quiz: Basics check (5 Qs)"] },
  Intermediate:{ color:"#0080C7", items:["Course: {skill} Fundamentals (3h)","Case Study + microlearning series","Assessment: 20-question test","Peer discussion forum"] },
  Advanced:    { color:"#F5A623", items:["Full Course: {skill} Deep Dive (8h)","Guided project with manager review","Expert webinar series","Capstone assessment + cert"] },
  Expert:      { color:"#9B59B6", items:["Master Course + certification","Live project with business impact KPIs","SME feedback session (1:1)","Publish learnings to community"] },
};

export const REC_LEARNINGS = [
  { title:"Industrial IoT Essentials",     source:"EdNext",   duration:"3h 20m", match:"94%", tags:["IoT","Technology","Engineering"], summary:"Covers IIoT architecture, sensor integration and real-time data analytics for shopfloor applications. Ideal for engineers in automation-heavy roles." },
  { title:"Root Cause Analysis Methods",   source:"SumTotal", duration:"2h",     match:"91%", tags:["Quality","TQM","Problem Solving"], summary:"Teaches 5-Why, Fishbone and Fault Tree methods using actual Tata Steel incident case studies for practical problem solving." },
  { title:"Six Sigma Yellow Belt Prep",    source:"EdNext",   duration:"4h",     match:"89%", tags:["Six Sigma","Quality","TQM"], summary:"Covers DMAIC methodology, process variation concepts and basic SPC tools to help you qualify for Yellow Belt certification." },
  { title:"MS Excel for Data Reporting",   source:"EdNext",   duration:"1h 45m", match:"88%", tags:["Data","Analytics","Productivity"], summary:"Practical Excel skills for KPI dashboards, pivot tables and automated reports — directly applicable to daily management workflows." },
];

export const POPULAR_MICRO = [
  { title:"What is TPM?",            duration:"2 min", views:"1.2k", tag:"TPM",     color:"#F5A623", type:"video", summary:"Animated explainer covering TPM's 8 pillars and how autonomous maintenance reduces unplanned downtime on the shopfloor." },
  { title:"LOTO in 60 Seconds",      duration:"1 min", views:"980",  tag:"Safety",  color:"#E5484D", type:"video", summary:"Step-by-step visual guide to Lockout-Tagout energy isolation procedure — mandatory for all plant operators before maintenance." },
  { title:"Root Cause Analysis",     duration:"3 min", views:"870",  tag:"Quality", color:"#18B982", type:"text",  summary:"Infographic guide explaining 5-Why methodology using a real blast furnace downtime incident as a worked example." },
  { title:"Bearing Replacement Tip", duration:"2 min", views:"760",  tag:"Maint.",  color:"#9B59B6", type:"video", summary:"Quick video on correct bearing removal and fitting technique to prevent premature equipment failure in rotating machinery." },
  { title:"Kaizen in 2 Minutes",     duration:"2 min", views:"650",  tag:"Lean",    color:"#0080C7", type:"text",  summary:"Illustrated guide to running a Kaizen event: identifying waste, rapid improvement cycles, and sustaining the gains long-term." },
];

export const CALENDAR_EVENTS = [
  { date:"May 09", topic:"Six Sigma Yellow Belt",  mode:"Blended",   location:"Training Centre", desc:"Covers DMAIC methodology, measurement systems analysis and process capability. Leads to Yellow Belt certification." },
  { date:"May 14", topic:"Digital Tools Workshop", mode:"Online",    location:"Virtual",          desc:"Hands-on Power BI, Excel automation and basic Python scripting for daily management reporting across departments." },
  { date:"May 21", topic:"Leadership Bootcamp",    mode:"Classroom", location:"Learning Hub",     desc:"3-day intensive on situational leadership, conflict resolution and building high-performance teams in manufacturing." },
  { date:"May 28", topic:"Hazmat Handling",        mode:"Classroom", location:"Site B",           desc:"Mandatory refresher on hazardous material storage, spill response and PPE requirements per OHSAS 18001." },
  { date:"Jun 03", topic:"Data Analytics Cohort",  mode:"Blended",   location:"Innovation Hub",   desc:"6-week cohort covering statistical analysis, dashboarding and predictive modelling using real Tata Steel datasets." },
];

export const TQM_GOALS = [
  { id:1,  title:"Business Assessment using TBEM",   icon:"🏢", progress:65, items:["Understand TBEM framework","Conduct business assessments","Gap analysis & scoring","Action planning"] },
  { id:2,  title:"Daily Management",                  icon:"📋", progress:80, items:["Visual management tools","Daily review meetings","KPI monitoring","Deviation handling"] },
  { id:3,  title:"Data Analytics",                    icon:"📊", progress:38, items:["Statistical analysis basics","Power BI dashboards","Data storytelling","Predictive models"] },
  { id:4,  title:"Education Excellence Management",   icon:"🎓", progress:55, items:["Competency frameworks","Training needs analysis","Learning ROI measurement","Knowledge transfer"] },
  { id:5,  title:"Employee Involvement Initiatives",  icon:"🤝", progress:70, items:["Kaizen circles","Suggestion systems","Cross-functional teams","Recognition programs"] },
  { id:6,  title:"Knowledge Management",              icon:"🧠", progress:45, items:["Knowledge capture tools","Best practice sharing","Expert directories","Learning communities"] },
  { id:7,  title:"Policy Management",                 icon:"📜", progress:60, items:["Policy deployment","Hoshin Kanri","Target setting","Review cadence"] },
  { id:8,  title:"Quality Assurance",                 icon:"✅", progress:72, items:["SPC & control charts","Inspection protocols","Non-conformance mgmt","Root cause analysis"] },
  { id:9,  title:"Supply Chain Management",           icon:"🔗", progress:50, items:["Supplier evaluation","Inventory optimization","Demand forecasting","Lead time reduction"] },
  { id:10, title:"Theory of Constraints (CCPM)",      icon:"⛓", progress:30, items:["Identify constraints","CCPM scheduling","Buffer management","Throughput accounting"] },
  { id:11, title:"TPM",                               icon:"⚙", progress:85, items:["5S fundamentals","Autonomous maintenance","Planned maintenance","OEE measurement"] },
  { id:12, title:"TQM",                               icon:"🎯", progress:68, items:["TQM principles","Process excellence","Customer focus","Continuous improvement"] },
];

export const SOE_CERTS = [
  { name:"School of Analytics",   level:"Gold",     emoji:"📊", color:"#F5A623", date:"Jan 2024" },
  { name:"School of Blockchain",  level:"Silver",   emoji:"⛓",  color:"#8A94A6", date:"Oct 2023" },
  { name:"School of TQM",         level:"Platinum", emoji:"🏆", color:"#9B59B6", date:"Mar 2024" },
  { name:"School of Maintenance", level:"Gold",     emoji:"🔧", color:"#F5A623", date:"Dec 2023" },
];
