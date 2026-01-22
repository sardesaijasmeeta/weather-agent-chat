"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import SearchBar from "./SearchBar";
import TypingIndicator from "./TypingIndicator";
import ThemeToggle from "./ThemeToggle";

/**
 * Safe timestamp generator (prevents hydration mismatch)
 */
const getTime = () => {
  if (typeof window === "undefined") return "";
  return new Date().toLocaleTimeString();
};

export default function ChatContainer() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "agent",
      text: "Hi! Ask me about the weather.",
      timestamp: "",
      reactions: [],
    },
  ]);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Set initial greeting timestamp on client (after mount)
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === 1 ? { ...m, timestamp: getTime() } : m
      )
    );
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
  if (!text.trim() || loading) return;

  const userMsg = {
    id: Date.now(),
    role: "user",
    text,
    timestamp: getTime(),
    reactions: [],
  };

  const agentMsg = {
    id: Date.now() + 1,
    role: "agent",
    text: "",
    timestamp: getTime(),
    reactions: [],
  };

  setMessages((p) => [...p, userMsg, agentMsg]);
  setLoading(true);

  try {
    const res = await fetch("/api/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    if (!res.body) throw new Error("No stream");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    let finalText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith("data:")) continue;

        const json = line.replace("data:", "").trim();
        if (!json) continue;

        let parsed;
        try {
          parsed = JSON.parse(json);
        } catch {
          continue;
        }

        // ✅ ONLY show assistant text
        if (parsed.type === "text-delta" && parsed.payload?.text) {
          finalText += parsed.payload.text;

          setMessages((p) =>
            p.map((m) =>
              m.id === agentMsg.id ? { ...m, text: finalText } : m
            )
          );
        }
      }
    }
  } catch {
    setMessages((p) =>
      p.map((m) =>
        m.id === agentMsg.id
          ? { ...m, text: "Unable to fetch weather." }
          : m
      )
    );
  } finally {
    setLoading(false);
  }
};


  const toggleReaction = (id, emoji) => {
    setMessages((p) =>
      p.map((m) =>
        m.id === id
          ? {
              ...m,
              reactions: m.reactions.includes(emoji)
                ? m.reactions.filter((e) => e !== emoji)
                : [...m.reactions, emoji],
            }
          : m
      )
    );
  };

  return (
    <div className="w-full max-w-xl h-[85vh] flex flex-col bg-white dark:bg-slate-800 border rounded-xl shadow">
      {/* Header */}
      {/* Header */}
<div className="p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
  <span className="font-semibold text-gray-900 dark:text-white">
    Weather Agent for PAZAGO 🌤️
  </span>

  <div className="flex items-center gap-3 text-sm">
    <ThemeToggle />

    <button
      onClick={() =>
        setMessages([
          {
            id: Date.now(),
            role: "agent",
            text: "Hi! Ask me about the weather.",
            timestamp: getTime(),
            reactions: [],
          },
        ])
      }
      className="text-blue-500 hover:underline"
    >
      New Chat
    </button>

    <button
      onClick={() => {
        const data = messages
          .map((m) => `[${m.timestamp}] ${m.role}: ${m.text}`)
          .join("\n");

        const blob = new Blob([data], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "chat-history.txt";
        a.click();
        URL.revokeObjectURL(url);
      }}
      className="text-blue-500 hover:underline"
    >
      Export
    </button>

    <button
      onClick={() => setMessages([])}
      className="text-red-500 hover:underline"
    >
      Clear
    </button>
  </div>
</div>


      {/* Search */}
      <SearchBar query={query} setQuery={setQuery} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages
          .filter((m) =>
            m.text.toLowerCase().includes(query.toLowerCase())
          )
          .map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onReact={toggleReaction}
            />
          ))}

        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
