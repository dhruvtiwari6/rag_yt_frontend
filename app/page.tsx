// "use client";

import VideoRAGAgent from "@/components/video-rag/VideoRAGAgent";

// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import {
//   Send,
//   Sparkles,
//   Video,
//   ArrowRight,
//   Loader2,
// } from "lucide-react";

// /* ===============================
//    MAIN COMPONENT
// ================================ */
// export default function VideoRAGAgent() {
//   const [stage, setStage] = useState<"video-input" | "chat">("video-input");
//   const [videoId, setVideoId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   /* ===============================
//      INGEST VIDEO
//   ================================ */
//   const handleVideoSubmit = async () => {
//     if (!videoId.trim() || loading) return;
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         "https://ragytbackend-production-37b6.up.railway.app/ingest",
//         { video_id: videoId }
//       );

//       if (data.status === "success") {
//         setMessages([
//           {
//             role: "system",
//             content:
//               "Video processed successfully! You can now ask questions about the video.",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//         setStage("chat");
//       } else {
//         alert(data.message || "Failed to process video.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===============================
//      ASK QUESTION
//   ================================ */
//   const handleQuerySubmit = async () => {
//     if (!query.trim() || loading) return;

//     const userMessage = {
//       role: "user",
//       content: query,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setQuery("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         "https://ragytbackend-production-37b6.up.railway.app/query",
//         {
//           query: userMessage.content,
//           k: 4,
//         }
//       );

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "ai",
//           content: data.context || data.message || "No response received.",
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "error",
//           content: "Error getting response. Please try again.",
//           timestamp: new Date().toISOString(),
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setStage("video-input");
//     setVideoId("");
//     setMessages([]);
//     setQuery("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl">
//         {stage === "video-input" ? (
//           <VideoInputStage
//             videoId={videoId}
//             setVideoId={setVideoId}
//             loading={loading}
//             onSubmit={handleVideoSubmit}
//           />
//         ) : (
//           <ChatStage
//             videoId={videoId}
//             messages={messages}
//             query={query}
//             setQuery={setQuery}
//             loading={loading}
//             onSubmit={handleQuerySubmit}
//             onReset={handleReset}
//             messagesEndRef={messagesEndRef}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// /* ===============================
//    VIDEO INPUT STAGE
// ================================ */
// function VideoInputStage({
//   videoId,
//   setVideoId,
//   loading,
//   onSubmit,
// }: any) {
//   return (
//     <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800/50 shadow-2xl overflow-hidden">
//       <div className="p-12">
//         <Header />
//         <InputForm
//           videoId={videoId}
//           setVideoId={setVideoId}
//           loading={loading}
//           onSubmit={onSubmit}
//         />
//       </div>
//     </div>
//   );
// }

// function Header() {
//   return (
//     <div className="text-center mb-12">
//       <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
//         <Sparkles className="w-10 h-10 text-white" />
//       </div>
//       <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
//         Video RAG Agent
//       </h1>
//       <p className="text-slate-400 text-lg">
//         Enter your video ID to start chatting with AI
//       </p>
//     </div>
//   );
// }

// function InputForm({ videoId, setVideoId, loading, onSubmit }: any) {
//   return (
//     <div className="space-y-6">
//       <div className="relative">
//         <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
//         <input
//           value={videoId}
//           onChange={(e) => setVideoId(e.target.value)}
//           placeholder="Enter video ID..."
//           disabled={loading}
//           className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white"
//         />
//       </div>

//       <button
//         onClick={onSubmit}
//         disabled={loading || !videoId.trim()}
//         className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3"
//       >
//         {loading ? (
//           <>
//             <Loader2 className="w-5 h-5 animate-spin" />
//             Processing video...
//           </>
//         ) : (
//           <>
//             Continue
//             <ArrowRight className="w-5 h-5" />
//           </>
//         )}
//       </button>
//     </div>
//   );
// }

// /* ===============================
//    CHAT STAGE
// ================================ */
// function ChatStage({
//   videoId,
//   messages,
//   query,
//   setQuery,
//   loading,
//   onSubmit,
//   onReset,
//   messagesEndRef,
// }: any) {
//   return (
//     <div className="bg-slate-900/50 rounded-3xl flex flex-col h-[700px]">
//       <ChatHeader videoId={videoId} onReset={onReset} />
//       <MessagesList messages={messages} loading={loading} refEl={messagesEndRef} />
//       <ChatInput
//         query={query}
//         setQuery={setQuery}
//         loading={loading}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// }

// function ChatHeader({ videoId, onReset }: any) {
//   return (
//     <div className="p-6 border-b border-slate-800 flex justify-between">
//       <div>
//         <h2 className="text-white font-bold">Video RAG Agent</h2>
//         <p className="text-slate-400 text-sm">Video ID: {videoId}</p>
//       </div>
//       <button onClick={onReset} className="text-slate-300">
//         Change Video
//       </button>
//     </div>
//   );
// }

// function MessagesList({ messages, loading, refEl }: any) {
//   return (
//     <div className="flex-1 overflow-y-auto p-6 space-y-4">
//       {messages.map((msg: any, i: number) => (
//         <MessageBubble key={i} message={msg} />
//       ))}
//       {loading && <Loader2 className="animate-spin text-cyan-400" />}
//       <div ref={refEl} />
//     </div>
//   );
// }

// function MessageBubble({ message }: any) {
//   const isUser = message.role === "user";
//   return (
//     <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
//       <div
//         className={`px-4 py-2 rounded-xl max-w-[80%] ${
//           isUser
//             ? "bg-cyan-600 text-white"
//             : "bg-slate-800 text-slate-200"
//         }`}
//       >
//         {message.content}
//       </div>
//     </div>
//   );
// }

// function ChatInput({ query, setQuery, loading, onSubmit }: any) {
//   return (
//     <div className="p-4 border-t border-slate-800 flex gap-3">
//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Ask a question..."
//         disabled={loading}
//         className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-white"
//       />
//       <button
//         onClick={onSubmit}
//         disabled={loading}
//         className="bg-cyan-600 p-3 rounded-xl"
//       >
//         <Send className="text-white" />
//       </button>
//     </div>
//   );
// }


export default function App() {
  return(
    <VideoRAGAgent />
  )
}
