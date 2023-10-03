import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  setActiveLink: (link: string) => void;
}

const SideBar: React.FC<SidebarProps> = ({ setActiveLink }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/options#" onClick={() => setActiveLink("options")}>
            Options
          </a>
        </li>
        <li>
          <a href="/settings#" onClick={() => setActiveLink("Settings")}>
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
