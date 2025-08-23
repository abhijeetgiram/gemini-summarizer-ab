"use client";
import { useState } from "react";
import { fetchSummary } from "../lib/fetchSummary";

export default function Summarizer() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSummarize = async () => {
    setErrorMsg("");
    setSummary("");

    if (!inputText.trim()) {
      setErrorMsg("Please paste some text first.");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchSummary(inputText);
      setSummary(result);
    } catch (e) {
      setErrorMsg(e.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">AI Text Summarizer</h1>

      <div className="relative">
        <textarea
          className="w-full h-64 p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2"
          placeholder="Paste a long block of text here…"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="absolute bottom-2 right-3 text-xs text-gray-500">
          {inputText.length} chars
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white shadow hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Summarizing…" : "Summarize"}
        </button>
        <button
          onClick={() => {
            setInputText("");
            setSummary("");
            setErrorMsg("");
          }}
          className="px-5 py-2 rounded-xl border shadow bg-white hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg border bg-red-50">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {summary && (
        <div className="mt-6 p-4 rounded-xl border bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="leading-7 whitespace-pre-line">{summary}</p>
        </div>
      )}
    </div>
  );
}
