'use client';

const PostVedio = ({ video, title }) => {
  const videoIdMatch = video.match(
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/,
  );
  const videoId = videoIdMatch[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="p-7.5 py-5">
      <h4 className="text-base font-semibold leading-none tracking-tight mb-5">
        {title}
      </h4>
      <iframe
        className="bg-accent w-full aspect-video rounded-xl min-h-[400px]"
        src={embedUrl}
      ></iframe>
    </div>
  );
};

export { PostVedio };
