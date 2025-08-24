export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body || {};

    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiurl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="
    const endpoint = apiurl + process.env.GEMINI_API_KEY;

    const payload = {
      contents: [
        {
          parts: [
            {
              text:
                "Summarize the following text into 4-5 concise lines. " +
                "Keep it factual, clear, and non-repetitive:\n\n" +
                text,
            },
          ],
        },
      ],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: `Gemini error: ${errText}` }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    // console.log("----------------------------");
    // console.log("Full Gemini API Response:", JSON.stringify(data, null, 2));
    // console.log("----------------------------");
    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary available.";

    // Return both summary & usageMetadata
    return new Response(JSON.stringify({ 
      summary, 
      usageMetadata: data?.usageMetadata || null, 
    }), 
      { status: 200, headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return new Response(JSON.stringify({ error: "Failed to summarize" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
