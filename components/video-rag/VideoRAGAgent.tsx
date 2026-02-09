"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import VideoInputStage from "./VideoInputStage";
import ChatStage from "./ChatStage";

export default function VideoRAGAgent() {
  const [stage, setStage] = useState<"video-input" | "chat">("video-input");
  const [videoId, setVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleVideoSubmit = async () => {
    if (!videoId.trim() || loading) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
  "https://apiragyt.dhruv-tiwari.me/ingest",
  { video_id: videoId },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      if (data.status === "success") {
        setMessages([
          {
            role: "system",
            content:
              "Video processed successfully! You can now ask questions about the video.",
            timestamp: new Date().toISOString(),
          },
        ]);
        setStage("chat");
      }
    } catch (e) {
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async () => {
    if (!query.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    setMessages((p) => [...p, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/query`,
        { query: userMessage.content, k: 4 }
      );

      setMessages((p) => [
        ...p,
        {
          role: "ai",
          content: data.context || data.message,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((p) => [
        ...p,
        {
          role: "error",
          content: "Error getting response",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStage("video-input");
    setVideoId("");
    setMessages([]);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {stage === "video-input" ? (
          <VideoInputStage
            videoId={videoId}
            setVideoId={setVideoId}
            loading={loading}
            onSubmit={handleVideoSubmit}
          />
        ) : (
          <ChatStage
            videoId={videoId}
            messages={messages}
            query={query}
            setQuery={setQuery}
            loading={loading}
            onSubmit={handleQuerySubmit}
            onReset={handleReset}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>
    </div>
  );
}
