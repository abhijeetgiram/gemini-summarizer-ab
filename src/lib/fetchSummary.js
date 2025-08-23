export async function fetchSummary(text) {
  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server.");
  }

  if (!res.ok) {
    throw new Error(data.error || "Failed to summarize.");
  }

  return {
    summary: data.summary || "No summary returned.",
    usageMetadata: data.usageMetadata || null,
  };
}
