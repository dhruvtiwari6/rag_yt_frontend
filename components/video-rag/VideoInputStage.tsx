import Header from "./Header";
import InputForm from "./InputForm";

export default function VideoInputStage({
  videoId,
  setVideoId,
  loading,
  onSubmit,
}: any) {
  return (
    <div className="bg-slate-900/50 rounded-3xl border border-slate-800/50 shadow-2xl">
      <div className="p-12">
        <Header />
        <InputForm
          videoId={videoId}
          setVideoId={setVideoId}
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
