import React, { useEffect, useState,useContext } from "react";
import "./Main.css";
import {assets} from "../../assets/assets";
import { Context } from "../../Context/Context";
const Main = () => {
    const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const {onSent,setInput,input,recentPrompts,showResults,loading,resultData}=useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>ChatJi;</p>
                <img src="https://img.icons8.com/ios-filled/50/000000/user.png" alt="" />

            </div>
            <div className="main-container">
                {!showResults?<>
                <div className="main-content">
                    
                    <p>Welcome to Chatly;</p>
                    <p>Ask me anything...</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p> "Explain quantum computing in simple terms" --- Example</p>
                        <img src={assets.compass_icon}></img>
                    </div>
                    <div className="card">
                        <p>  "Got any creative ideas for a 10 year old’s birthday?"</p>
                        <img src={assets.bulb_icon}></img>
                    </div>
                    <div className="card">
                        <p>     "How do I make an HTTP request in Javascript?"  </p>
                        <img src={assets.code_icon}></img>
                    </div>
                </div></>
                : <div className="result">
                    <div className="result-title">
                        <img src={assets.tom} alt="" />
                        <p>{recentPrompts}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.jerry} alt="" />
                        
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
                    }
                
                <div className="main-bottom">
                    <div className="search">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Type your message here..."/>
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery" />
                            <img src={assets.mic_icon} alt="Mic" />
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <div className="Footer">
                        <p> {time.toLocaleTimeString()} Made by - Manav</p>
                    </div>
                </div>
            </div>
        </div>
    );
}   
export default Main;