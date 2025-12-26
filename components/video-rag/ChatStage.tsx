import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

export default function ChatStage(props: any) {
  return (
    <div className="bg-slate-900/50 rounded-3xl flex flex-col h-[700px]">
      <ChatHeader videoId={props.videoId} onReset={props.onReset} />
      <MessagesList
        messages={props.messages}
        loading={props.loading}
        refEl={props.messagesEndRef}
      />
      <ChatInput
        query={props.query}
        setQuery={props.setQuery}
        loading={props.loading}
        onSubmit={props.onSubmit}
      />
    </div>
  );
}
