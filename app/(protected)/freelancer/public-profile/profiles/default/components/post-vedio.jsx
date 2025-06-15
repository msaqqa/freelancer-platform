'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Comments, Heading, Likes, Saves, Tabs } from '../post';

const PostVedio = () => {
  const [activeTab, setActiveTab] = useState('likes');

  const comments = [
    {
      avatar: '300-3.png',
      author: 'Mr. Anderson',
      date: '1 Day ago',
      text: 'Long before you sit dow to put digital pen to paper you need to make sure you have to sit down and write. I’ll show you how to write a great blog post in five simple steps that people will actually want to read. Ready?',
    },
    {
      avatar: '300-15.png',
      author: 'Mrs. Anderson',
      date: '1 Day ago',
      text: 'Long before you sit dow to put digital pen to paper.',
    },
  ];

  return (
    <Card>
      <div className="p-7.5 pb-5">
        <iframe
          className="w-full aspect-video rounded-xl min-h-[400px]"
          src="https://www.youtube.com/embed/2uWJpnuCMKQ?si=6-ohuJieU2Fg3pDr"
        ></iframe>
      </div>
    </Card>
  );
};

export { PostVedio };
