import { Video, ArrowRight, Loader2 } from "lucide-react";

export default function InputForm({
  videoId,
  setVideoId,
  loading,
  onSubmit,
}: any) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter video ID..."
          disabled={loading}
          className="w-full pl-12 py-4 bg-slate-800 rounded-xl text-white"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !videoId.trim()}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl text-white flex justify-center gap-3"
      >
        {loading ? <Loader2 className="animate-spin" /> : <>Continue <ArrowRight /></>}
      </button>
    </div>
  );
}
