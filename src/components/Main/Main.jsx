import React, { useEffect, useState, useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  const [time, setTime] = useState(new Date());
  const { onSent, setInput, input, recentPrompts, showResults, loading, resultData } =
    useContext(Context);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Render main welcome screen
  const renderWelcomeSection = () => (
    <>
      <div className="main-content">
        <p>Welcome to ChatJi;</p>
        <p>Ask me anything...</p>
      </div>

      <div className="cards">
        <div className="card">
          <p>“Explain quantum computing in simple terms”</p>
          <img src={assets.compass_icon} alt="Compass Icon" />
        </div>

        <div className="card">
          <p>“Got any creative ideas for a 10-year-old’s birthday?”</p>
          <img src={assets.bulb_icon} alt="Bulb Icon" />
        </div>

        <div className="card">
          <p>“How do I make an HTTP request in JavaScript?”</p>
          <img src={assets.code_icon} alt="Code Icon" />
        </div>
      </div>
    </>
  );

  // Render result screen
  const renderResultSection = () => (
    <div className="result">
      <div className="result-title">
        <img src={assets.compass_icon} alt="Prompt Icon" />
        <p>{recentPrompts}</p>
      </div>

      <div className="result-data">
        <img src={assets.code_icon} alt="AI Icon" />

        {loading ? (
          <div className="loader">
            <hr />
            <hr />
            <hr />
          </div>
        ) : (
          <div
            className="response-text"
            dangerouslySetInnerHTML={{ __html: resultData }}
          ></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="main">
      {/* Top Navbar */}
      <div className="nav">
        <p>ChatJi;</p>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/user.png"
          alt="User Avatar"
        />
      </div>

      {/* Main Container */}
      <div className="main-container">
        {!showResults ? renderWelcomeSection() : renderResultSection()}

        {/* Bottom Search Section */}
        <div className="main-bottom">
          <div className="search">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />

            <div className="search-icons">
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="Send"
                  className="send-btn"
                />
              )}
            </div>
          </div>

          <div className="Footer">
            <p>{time.toLocaleTimeString()} • Made by Manav</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
