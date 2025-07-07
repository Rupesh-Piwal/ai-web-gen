export function Hero() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/50 bg-clip-text text-transparent">
        What can I help you{" "}
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          build?
        </span>
      </h1>
      <p className="text-xl bg-gradient-to-r from-[#FDFDFD] to-[#B7B9BE]/60 bg-clip-text text-transparent max-w-2xl mx-auto leading-relaxed">
        Describe your vision and watch as AI transforms your ideas into
        beautiful, functional websites in seconds.
      </p>
    </div>
  );
}
