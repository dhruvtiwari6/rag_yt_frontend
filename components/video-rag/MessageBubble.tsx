export default function MessageBubble({ message }: any) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[80%] ${
          isUser ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
