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

    // Clean response formatting
    let cleaned = response
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // bold
      .replace(/\n/g, "<br>")                // new lines
      .replace(/\* (.+)/g, "• $1");          // bullet points

    setLoading(false);

    // Word-by-word streaming
    const words = cleaned.split(" ");
    let index = 0;

    const stream = setInterval(() => {
      if (index < words.length) {
        setResultData((prev) => prev + words[index] + " ");
        index++;
      } else {
        clearInterval(stream);
        setRegenerating(false);
      }
    }, 25);
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
