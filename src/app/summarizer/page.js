"use client";

import { useState } from "react";
import { fetchSummary } from "@/lib/fetchSummary";

export default function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState(null);

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");
    setUsage(null);

    try {
      const result = await fetchSummary(inputText);
      setSummary(result.summary);
      setUsage(result.usageMetadata);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
    setError("");
    setUsage(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Gemini Summarizer</h1>

      <div className="relative">
          <textarea
            className="w-full h-64 p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2"
            placeholder="Paste a long block of text here…"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {/* Character count bottom-right */}
          <div className="absolute bottom-2 right-3 text-xs text-gray-500">
            {inputText.length} chars
          </div>
        </div>

      <div className="flex gap-3">
        <button
          onClick={handleSummarize}
          disabled={loading || !inputText?.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </button>

        <button
          onClick={handleClear}
          className="px-5 py-2 rounded-xl border shadow bg-white hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {summary && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-semibold mb-2">Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {usage && (
        <div className="p-4 border rounded-lg bg-gray-100">
          <h2 className="font-semibold mb-2">Usage Metadata</h2>
          <ul className="text-sm space-y-1">
            <li>Prompt Tokens: {usage.promptTokenCount}</li>
            <li>Candidate Tokens: {usage.candidatesTokenCount}</li>
            <li>Total Tokens: {usage.totalTokenCount}</li>
            {/* <li>Model Version: {usage.modelVersion}</li> */}
            <li>Model Version: gemini-1.5-flash-latest</li>
          </ul>
        </div>
      )}
    </div>
  );
}
