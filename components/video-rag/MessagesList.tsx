import { Loader2 } from "lucide-react";
import MessageBubble from "./MessageBubble";

export default function MessagesList({ messages, loading, refEl }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((m: any, i: number) => (
        <MessageBubble key={i} message={m} />
      ))}
      {loading && <Loader2 className="animate-spin text-cyan-400" />}
      <div ref={refEl} />
    </div>
  );
}
