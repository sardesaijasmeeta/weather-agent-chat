export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://api-dev.provue.ai/api/webapp/agent/test-agent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify({
          prompt: body.prompt,
          stream: true,
        }),
      }
    );

    // ✅ If API works, forward real stream
    if (response.ok && response.body) {
      return new Response(response.body, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // 🟡 FALLBACK STREAM (professional handling)
    const fallbackText =
      "Unable to reach weather service right now. This is a streamed fallback response demonstrating real-time UI updates.";

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for (const char of fallbackText) {
          controller.enqueue(encoder.encode(char));
          await new Promise((r) => setTimeout(r, 30));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return new Response("Streaming error", { status: 500 });
  }
}
