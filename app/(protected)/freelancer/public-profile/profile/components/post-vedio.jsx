'use client';

import { Card } from '@/components/ui/card';

const PostVedio = ({ video }) => {
  return (
    <Card>
      <div className="p-7.5 pb-5">
        <iframe
          className="w-full aspect-video rounded-xl min-h-[400px]"
          src={video}
        ></iframe>
      </div>
    </Card>
  );
};

export { PostVedio };
