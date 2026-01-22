export default function MessageBubble({ message, onReact }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        <div>{message.text}</div>
        <div className="text-[10px] opacity-70 mt-1">
          {message.timestamp}
        </div>
        <div className="flex gap-2 mt-1 text-xs">
          <button onClick={() => onReact(message.id, "👍")}>👍</button>
          <button onClick={() => onReact(message.id, "👎")}>👎</button>
        </div>
      </div>
    </div>
  );
}
