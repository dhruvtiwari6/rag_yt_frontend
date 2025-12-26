import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 items-center justify-center">
        <Sparkles className="text-white w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
        Video RAG Agent
      </h1>
      <p className="text-slate-400 mt-2">
        Enter your video ID to start chatting
      </p>
    </div>
  );
}
