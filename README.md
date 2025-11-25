# ChatJi - AI Chatbot

ChatJi is a modern, React-based AI chatbot application powered by Google's Gemini API. It features a sleek interface, real-time typing effects, and chat history management, providing a seamless conversational experience.

## Features

- 🤖 **Powered by Gemini**: Utilizes Google's Gemini 2.0 Flash model for fast and intelligent responses.
- 💬 **Real-time Typing Effect**: Simulates natural conversation flow with word-by-word response streaming.
- 📜 **Chat History**: Keeps track of your recent prompts in a convenient sidebar.
- 📝 **Rich Text Support**: Renders responses with Markdown formatting (bold, lists, code blocks).
- 🎨 **Responsive Design**: Optimized for various screen sizes with a clean, modern UI.
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and production builds.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: CSS, FontAwesome
- **Animations**: Framer Motion
- **AI Integration**: Google Generative AI (Gemini)

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ChatJi
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the root directory and add your Google Gemini API key:

    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

    > **Note:** You can get your API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Usage

1.  Type your query in the input box at the bottom of the screen.
2.  Press **Enter** or click the **Send** icon.
3.  View the AI's response in real-time.
4.  Access previous conversations from the "Recent" tab in the sidebar.

## License

This project is open source and available under the [MIT License](LICENSE).
