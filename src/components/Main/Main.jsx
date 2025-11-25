import React, { useEffect, useState, useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  const {
    onSent,
    setInput,
    input,
    recentPrompts,
    showResults,
    loading,
    resultData,
  } = useContext(Context);

  const [time, setTime] = useState(new Date());
  const scrollRef = useRef(null);

  /* ============================
     LIVE CLOCK
  ============================ */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ============================
     AUTOSCROLL ON NEW RESULT
  ============================ */
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [loading, resultData]);

  /* ============================
     WELCOME CARDS
  ============================ */
  const prompts = [
    {
      text: "“Explain quantum computing in simple terms”",
      icon: assets.compass_icon,
    },
    {
      text: "“Got any creative ideas for a 10-year-old’s birthday?”",
      icon: assets.bulb_icon,
    },
    {
      text: "“How do I make an HTTP request in JavaScript?”",
      icon: assets.code_icon,
    },
  ];

  const WelcomeSection = () => (
    <>
      <div className="main-content">
        <p>Welcome to ChatJi;</p>
        <p>Ask me anything...</p>
      </div>

      <div className="cards">
        {prompts.map((item, idx) => (
          <div key={idx} className="card">
            <p>{item.text}</p>
            <img src={item.icon} alt="Suggestion Icon" />
          </div>
        ))}
      </div>
    </>
  );

  /* ============================
     RESULT DISPLAY
  ============================ */
  const ResultSection = () => (
    <div className="result" ref={scrollRef}>
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
            role="textbox"
            dangerouslySetInnerHTML={{ __html: resultData }}
          ></div>
        )}
      </div>
    </div>
  );

  /* ============================
     SEND MESSAGE HANDLER
  ============================ */
  const handleSend = () => {
    if (!input.trim()) return;
    onSent();
  };

  return (
    <div className="main">
      {/* ============================
          NAVBAR
      ============================ */}
      <div className="nav">
        <p>ChatJi;</p>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/user.png"
          alt="User Avatar"
        />
      </div>

      {/* ============================
          CONTENT WRAPPER
      ============================ */}
      <div className="main-container">
        {!showResults ? <WelcomeSection /> : <ResultSection />}

        {/* ============================
            BOTTOM SEARCH BAR
        ============================ */}
        <div className="main-bottom">
          <div className="search">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              autoFocus
            />

            <div className="search-icons">
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />

              {input && (
                <img
                  onClick={handleSend}
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
