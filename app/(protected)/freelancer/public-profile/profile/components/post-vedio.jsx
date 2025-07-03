'use client';

import { Card } from '@/components/ui/card';

const PostVedio = ({ video }) => {
  const videoIdMatch = video.match(
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/,
  );
  const videoId = videoIdMatch[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <Card>
      <div className="p-7.5 pb-5">
        <iframe
          className="w-full aspect-video rounded-xl min-h-[400px]"
          src={embedUrl}
        ></iframe>
      </div>
    </Card>
  );
};

export { PostVedio };
