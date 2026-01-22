/**
 * exportChat
 * - Exports chat history as a .txt file
 */

export function exportChat(messages) {
  const content = messages
    .map(
      (msg) =>
        `[${new Date(msg.timestamp).toLocaleString()}] ${
          msg.role.toUpperCase()
        }: ${msg.text}`
    )
    .join("\n\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "chat-history.txt";
  a.click();

  URL.revokeObjectURL(url);
}
