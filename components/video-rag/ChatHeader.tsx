export default function ChatHeader({ videoId, onReset }: any) {
  return (
    <div className="p-6 border-b border-slate-800 flex justify-between">
      <div>
        <h2 className="text-white font-bold">Video RAG Agent</h2>
        <p className="text-slate-400 text-sm">Video ID: {videoId}</p>
      </div>
      <button onClick={onReset} className="text-slate-300">
        Change Video
      </button>
    </div>
  );
}
