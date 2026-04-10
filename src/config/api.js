// api.js
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";

async function runChat(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return "⚠️ API Quota Exceeded: Your free tier limit has been reached. Please wait a moment or check your Google AI Studio quota.";
      }
      return `⚠️ API Error (${response.status}): Unable to get response from AI.`;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Connection Error: Unable to reach the AI service. Please check your internet or API key.";
  }
}

export default runChat;
