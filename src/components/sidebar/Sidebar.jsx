import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const { onSent, prevPrompts, setRecentPrompts, newChat } =
    useContext(Context);

  const [isOpen, setIsOpen] = useState(true); // Desktop expanded mode
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* ============================
     HANDLE SCREEN RESIZE
  ============================ */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Auto close on mobile resize
      if (mobile) setIsOpen(true);
      if (!mobile) setIsMobileVisible(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ============================
     SIDEBAR TOGGLE
  ============================ */
  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileVisible((prev) => !prev);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  /* ============================
     LOAD OLD PROMPT
  ============================ */
  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSent(prompt);

    // Close sidebar on mobile so UI is clean
    if (isMobile) setIsMobileVisible(false);
  };

  /* ============================
     RENDER
  ============================ */
  return (
    <div
      className={`sidebar 
        ${isOpen ? "expanded" : "collapsed"} 
        ${isMobileVisible ? "mobile-open" : ""}
      `}
    >
      <div className="top">
        {/* Menu Button */}
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Toggle Menu"
          onClick={toggleSidebar}
        />

        {/* New Chat Button */}
        <div
          className="new-chat"
          onClick={() => {
            newChat();
            if (isMobile) setIsMobileVisible(false);
          }}
        >
          <img src={assets.plus_icon} alt="New Chat" />
          {isOpen && <p className="label">New Chat</p>}
        </div>
        <br></br>

        <hr className="divider" />

        {/* Recent Chats */}
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
                  <img src={assets.message_icon} alt="Chat" />
                  <p>{item.slice(0, 22)}...</p>
                </div>
              ))
            ) : (
              <p className="no-history">No recent chats</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.question_icon} alt="Help" />
          {isOpen && <p className="label">Help</p>}
        </div>

        <div className="bottom-item">
          <img src={assets.history_icon} alt="History" />
          {isOpen && <p className="label">History</p>}
        </div>

        <div className="bottom-item">
          <img src={assets.setting_icon} alt="Settings" />
          {isOpen && <p className="label">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
