import { useState, useEffect } from "react";
import C from "./theme";
import { NAV_ITEMS } from "./data/navItems";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TDAChatbot from "./components/TDAChatbot";
import MicrolearningPopup from "./components/MicrolearningPopup";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GoalsPage from "./pages/GoalsPage";
import GigsPage from "./pages/GigsPage";
import MentorsPage from "./pages/MentorsPage";
import JobsPage from "./pages/JobsPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import ProgramDirector from "./pages/ProgramDirector";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function ULIP() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("home");
  const [showMicro, setShowMicro] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      const t = setTimeout(() => setShowMicro(true), 15000);
      return () => clearTimeout(t);
    }
  }, [loggedIn]);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

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
        <Sidebar active={active} setActive={setActive} />
        <main style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
          <TopBar />
          {renderPage()}
        </main>
      </div>
      <TDAChatbot />
      {showMicro && <MicrolearningPopup onClose={() => setShowMicro(false)} />}
    </>
  );
}
