import ReactMarkdown from "react-markdown";

export default function MessageBubble({ message }: any) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[80%] ${
          isUser ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
        }`}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="my-1">{children}</p>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-black/20 px-1 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-black/20 p-2 rounded overflow-x-auto my-2">
                {children}
              </pre>
            ),
            ul: ({ children }) => <ul className="list-disc list-inside my-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside my-1">{children}</ol>,
            li: ({ children }) => <li className="my-0.5">{children}</li>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
