import { createContext, useState } from "react";
import runChat from "../config/api";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [regenerating, setRegenerating] = useState(false);

  const onSent = async (prompt = input) => {
    if (!prompt.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResults(true);

    setRecentPrompts(prompt);
    setPrevPrompts((prev) => [...prev, prompt]);

    let response = await runChat(prompt);

    if (!response) {
      setLoading(false);
      setResultData("<b>Error:</b> Unable to get response.");
      return;
    }

    // Advanced cleaning response logic for better formatting
    let cleaned = response
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // code blocks
      .replace(/`([^`]+)`/g, '<code>$1</code>')                    // inline code
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")                     // bold text
      .replace(/\n\n/g, "<br><br>")                               // double new lines
      .replace(/\n/g, "<br>")                                     // single new lines
      .replace(/^\* (.+)/gm, "<li>$1</li>")                      // bullet points
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");                 // wrap <li> in <ul>

    setLoading(false);

    // Smooth Word-by-Word Streaming
    const words = cleaned.split(" ");
    let index = 0;

    const stream = setInterval(() => {
      setResultData((prev) => {
        if (index < words.length) {
          const nextWord = words[index] + " ";
          index++;
          return prev + nextWord;
        } else {
          clearInterval(stream);
          setRegenerating(false);
          return prev;
        }
      });
    }, 20);
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
    setInput("");
    setResultData("");
  };

  const contextValue = {
    onSent,
    prevPrompts,
    recentPrompts,
    setRecentPrompts,
    showResults,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    regenerating,
    setRegenerating,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
