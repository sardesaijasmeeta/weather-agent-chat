"use client";
import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  return (
    <div className="p-3 flex gap-2 border-t">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend(text) && setText("")}
        disabled={disabled}
        placeholder="Ask about the weather..."
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        disabled={disabled}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}
