roll no - 223086

# 🌦️ Weather Agent Chat Interface

A responsive, modern chat interface built with **Next.js** that allows users to interact with a weather agent via a streaming API.

This project was developed as part of a **Frontend Engineer Assignment**, focusing on UI/UX quality, real-time interactions, and clean state management.

---

## 🚀 Live Features

### Core Chat Functionality
- Display conversation history
- User messages on the right, agent responses on the left
- Auto-scroll to latest message
- Streaming agent responses
- Loading indicators & typing indicator
- Keyboard shortcut (Enter to send)
- Disabled input during API calls
- Error handling for failed API requests

### UI / UX Enhancements
- Responsive design (mobile, tablet, desktop)
- Dark / Light theme toggle
- Message timestamps
- Distinct styling for user vs agent messages
- Smooth CSS transitions
- Message search functionality
- Export chat history
- Clear chat & New Chat support

### Advanced / Bonus Features
- Multiple message threads
- Message reactions (👍 / 👎)
- Weather-themed UI
- Clean, modern layout using Tailwind CSS

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks & Context
- **API:** Streaming Weather Agent API
- **Build Tooling:** Next.js + Turbopack

---
URL - https://weather-agent-chat-six.vercel.app/

## 📁 Project Structure

```txt
src/app
├── api/               # API routes
├── components/        # UI components
│   ├── ChatContainer.jsx
│   ├── ChatInput.jsx
│   ├── MessageBubble.jsx
│   ├── SearchBar.jsx
│   ├── ThemeToggle.jsx
│   └── TypingIndicator.jsx
├── context/
│   └── ThemeContext.jsx
├── globals.css
├── layout.js
└── page.js



