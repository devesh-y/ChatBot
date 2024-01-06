# ChatBot

## Description
The ChatBot project is a real-time chat application that leverages the OpenAI API for engaging conversations. Users can interact with an AI bot, and the chat history is seamlessly saved to MongoDB. The application features a dynamic user interface built with React, Shadcn UI, and Tailwind CSS. Additionally, it supports text-to-speech for AI responses and speech-to-text for user input.

## Features
- **OpenAI Integration:** Utilizes the OpenAI API for natural language processing and dynamic conversations.
- **MongoDB Integration:** Stores chat history in MongoDB for easy retrieval and analysis.
- **Real-time Communication:** Implements a socket connection for instant updates and a smooth user experience.
- **React Frontend:** Built with React, providing a modern and responsive user interface.
- **Shadcn UI and Tailwind CSS:** Enhances the UI with Shadcn UI components and Tailwind CSS for styling.
- **Text-to-Speech:** Converts AI responses to audio for an interactive and accessible experience.
- **Speech-to-Text:** Allows users to ask questions via speech input for seamless interaction.

## Getting Started
1. Clone the repository: `git clone https://github.com/devesh-y/ChatBot.git`
2. Install dependencies:
   - For the client: `cd frontend && npm install`
   - For the server: `cd backend && npm install`
3. Create .env file in both frontend and backend folder
    - frontend
        - VITE_BACKEND=
        - VITE_SALT=
    - backend
        - DB_USERNAME=
        - DB_PASSWORD=
        - USER_DB=
        - PORT=
        - WEBSITE=
        - API_KEY=
4. Run the application:
   - For the client: `cd frontend && npm run dev`
   - For the server: `cd backend && npm run dev`

## Dependencies
- React
- Shadcn UI
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Socket.io
- OpenAI API


## Acknowledgments
- OpenAI for providing the powerful natural language processing capabilities.
- The open-source community for the libraries and tools that make this project possible.

Feel free to explore, contribute, and enjoy chatting with the AI bot!