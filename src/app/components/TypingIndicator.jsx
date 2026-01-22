"use client";

/**
 * TypingIndicator
 * - Shown while agent response is streaming
 * - Visual feedback for loading state
 */

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm animate-pulse">
        Agent is typing…
      </div>
    </div>
  );
}
