import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const { onSent, prevPrompts, setRecentPrompts, newChat } = useContext(Context);

  const [isOpen, setIsOpen] = useState(true); // desktop collapse mode
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  // Detect mobile screen
  const isMobile = window.innerWidth <= 768;

  // Toggle sidebar depending on device
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileVisible((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSent(prompt);

    if (isMobile) setIsMobileVisible(false);
  };

  return (
    <div
      className={`sidebar 
      ${isOpen ? "expanded" : "collapsed"} 
      ${isMobileVisible ? "mobile-open" : ""}`}
    >
      <div className="top">

        {/* Menu button */}
        <img
          className="menu"
          src={assets.menu_icon}
          alt="menu"
          onClick={toggleSidebar}
        />

        {/* New Chat */}
        <div
          className="new-chat"
          onClick={() => {
            newChat();
            if (isMobile) setIsMobileVisible(false);
          }}
        >
          <img src={assets.plus_icon} alt="plus" />
          {isOpen && <p>New Chat</p>}
        </div>
        <br></br>

        <hr />

        {/* Recent */}
        {isOpen && (
          <div className="recent">
            <p className="title">Recent Chats</p>

            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)}
                >
                  <img src={assets.message_icon} alt="msg" />
                  <p>{item.slice(0, 20)}...</p>
                </div>
              ))
            ) : (
              <p className="no-history">No recent chats</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="help" />
          {isOpen && <p>Help</p>}
        </div>

        <div className="bottom-item">
          <img src={assets.history_icon} alt="history" />
          {isOpen && <p>History</p>}
        </div>

        <div className="bottom-item">
          <img src={assets.setting_icon} alt="settings" />
          {isOpen && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
