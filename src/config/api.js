// api.js
const API_KEY = "AIzaSyC8Jm9_EEbe8K7oFMkzhAkrO8x09vRmunY";

async function runChat(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";

    console.log("Gemini Reply:", reply);
    return reply;
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
}

export default runChat;
