import { useState, useEffect } from "react";
import C from "./theme";
import { NAV_ITEMS } from "./data/navItems";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TDAChatbot from "./components/TDAChatbot";
import MicrolearningPopup from "./components/MicrolearningPopup";

import LoginPage from "./pages/LoginPage";
import ULIPLitePage from "./pages/ULIPLitePage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GoalsPage from "./pages/GoalsPage";
import GigsPage from "./pages/GigsPage";
import MentorsPage from "./pages/MentorsPage";
import JobsPage from "./pages/JobsPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import ProgramDirector from "./pages/ProgramDirector";
import MethodologyPage from "./pages/MethodologyPage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function ULIP() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contractorLoggedIn, setContractorLoggedIn] = useState(false);
  const VALID_IDS = NAV_ITEMS.map(n => n.id);
  const hashPage = window.location.hash.slice(1);
  const [active, setActive] = useState(VALID_IDS.includes(hashPage) ? hashPage : "home");

  const navigate = (id) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };
  const [showMicro, setShowMicro] = useState(false);
  const [notifications, setNotifications] = useState([
    { icon:"⚡", text:"Daily Microlearning ready: Autonomous Maintenance", time:"Now",     u:true,  action:"micro" },
    { icon:"📚", text:"New course assigned: PLC Level 2",                  time:"10m ago", u:true  },
    { icon:"🏅", text:"You earned Gold badge in Analytics",                time:"1h ago",  u:true  },
    { icon:"📣", text:"AURA Circles Phase 1 kick-off now",                 time:"3h ago",  u:true  },
    { icon:"🔔", text:"Safety cert expiring in 18 days",                   time:"1d ago",  u:false },
  ]);

  const addNotification = (notif) => setNotifications(p => [notif, ...p]);

  const handleNotifClick = (n) => {
    if (n.action === "micro") setShowMicro(true);
  };

  const handleXPEarned = () => {
    addNotification({ icon:"🏆", text:"+5 XP earned in TQM · Autonomous Maintenance", time:"Just now", u:true });
  };

  useEffect(() => {
    if (loggedIn) {
      const t = setTimeout(() => setShowMicro(true), 15000);
      return () => clearTimeout(t);
    }
  }, [loggedIn]);

  if (contractorLoggedIn) return <ULIPLitePage onLogout={() => setContractorLoggedIn(false)} />;
  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} onContractorLogin={() => setContractorLoggedIn(true)} />;

  const renderPage = () => {
    switch (active) {
      case "home":        return <HomePage />;
      case "profile":     return <ProfilePage />;
      case "goals":       return <GoalsPage />;
      case "gigs":        return <GigsPage />;
      case "mentors":     return <MentorsPage />;
      case "jobs":        return <JobsPage />;
      case "communities": return <CommunitiesPage />;
      case "director":    return <ProgramDirector />;
      case "methodology": return <MethodologyPage />;
      default:            return <PlaceholderPage label={NAV_ITEMS.find(n => n.id === active)?.label || active} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.blue4}; border-radius: 3px; }
        select, input, textarea, button { font-family: 'DM Sans', sans-serif; }
        a { text-decoration: none; }
      `}</style>
      <div style={{ display: "flex", height: "100vh", background: C.bg }}>
        <Sidebar active={active} setActive={navigate} />
        <main style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          <TopBar notifications={notifications} onNotifClick={handleNotifClick} />
          {renderPage()}
        </main>
      </div>
      <TDAChatbot />
      {showMicro && <MicrolearningPopup onClose={() => setShowMicro(false)} onXPEarned={handleXPEarned} />}
    </>
  );
}
