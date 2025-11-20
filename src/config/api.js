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

    const data = await response.json();

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error retrieving response.";
  }
}

export default runChat;
