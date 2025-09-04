
import { createContext,useState } from "react";
import runChat from "../config/api";

export const Context = createContext();

const ContextProvider = (props) => {
    const[input, setInput] =useState("");
    const[recentPrompts,setRecentPrompts]=useState("");
    const[prevPrompts,setPrevPrompts]=useState([]);
    const[showResults,setShowResults]=useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");

  const delayPara = (index, nextWord) => {
  setTimeout(function () {
    setResultData((prev) => prev + nextWord);
  }, 30 * index); // speed of typing
};


  const newChat=()=>{
    setLoading(false);
    setShowResults(false);

  }


const onSent = async (prompt = input) => {
  if (!prompt.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResults(true);
    let response="";
    if(prompt!==undefined){
      response=await runChat(prompt);
      setRecentPrompts(prompt);
    }
    else{
      setPrevPrompts((prev) => [...prev,input]);
      setRecentPrompts(input);
      response=await runChat(input);
    }

    // 🔹 Bold formatting (**word** → <b>word</b>)
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // 🔹 Line breaks
    newResponse = newResponse.replace(/\n/g, "<br>");

    // 🔹 Bullet points (* → • ...)
    newResponse = newResponse.replace(/\* (.+)/g, "• $1");

    // 🔹 Animate word by word
    let words = newResponse.split(" ");
    words.forEach((word, i) => {
      delayPara(i, word + " ");
    });

    setLoading(false);
    setInput("");

};



  // Example call
  const contextValue={ 
    onSent,
    prevPrompts,
    setPrevPrompts,
    recentPrompts,
    setRecentPrompts,
    showResults,
    setShowResults,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    newChat
 };
  
  

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
