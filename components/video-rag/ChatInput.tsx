import { Send } from "lucide-react";

export default function ChatInput({ query, setQuery, loading, onSubmit }: any) {
  return (
    <div className="p-4 border-t border-slate-800 flex gap-3">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
        placeholder="Ask a question..."
        className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-white"
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-cyan-600 p-3 rounded-xl"
      >
        <Send className="text-white" />
      </button>
    </div>
  );
}
