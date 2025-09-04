import React, { useContext, useState } from "react";
import "./Sidebar.css";
import {assets} from "../../assets/assets";
import { Context } from "../../Context/Context";
const Sidebar = () => {
    const[active,setActive] =useState(false);
    const{onSent,prevPrompts,setRecentPrompts,newChat}=useContext(Context);

    const loadPormpt=async(prompt)=>{

        await setRecentPrompts(prompt);
        await onSent(prompt);
    }
    return (
        <div className="sidebar">
            <div className="top">
                <img className="menu" onClick={()=>setActive(prev=>!prev)} src={assets.menu_icon} alt="logo"/>

                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {active?<p> New chat</p>:null}
                </div>
                <br></br>
                
                <hr color="grey" ></hr>
                {active?
                <div className="recent">
                    <p className="title">Recent chats</p>
                    {prevPrompts.map((item,index)=>{
                        return (
                                <div onClick={()=>loadPormpt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.slice(0,18)} ...</p> 
                                </div>
                        )
                    })}
                    
                </div>:null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {active?<p>Help</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {active?<p>History</p>:null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {active?<p>Setting</p>:null}
                </div>

            </div>
        </div>
    );
}
export default Sidebar;