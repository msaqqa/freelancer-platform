'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';

const Connections = () => {
  const [items, setItems] = useState([
    {
      name: 'Summary',
      desc: 'Tell us more about your skills, work experience, and what makes you stand out. (+10%)',
      connected: true,
    },
    {
      name: 'Skills',
      desc: 'Select key skills to help us recommend the right projects. (+10%)',
      connected: false,
    },
    {
      name: 'Employment History',
      desc: 'List your previous jobs, roles, or freelance projects. (+10%)',
      connected: false,
    },
    {
      name: 'Languages',
      desc: 'dd the languages you speak and your level. (+10%)',
      connected: true,
    },
    {
      name: 'Portfolio',
      desc: 'Showcase work samples, case studies, or project links. (+10%)',
      connected: false,
    },
    {
      name: 'Social',
      desc: 'Connect your social profiles like LinkedIn, GitHub, or Behance.(+5%)',
      connected: true,
    },
  ]);

  const renderItem = (item, index) => (
    <div key={index} className="flex items-center space-x-4 mb-6">
      <div
        className={`rounded-full p-2 ${
          item.connected
            ? 'bg-blue-500 text-white'
            : 'bg-blue-50 border border-blue-300 text-blue-600'
        }`}
        variant={item.connected ? 'primary' : 'outline'}
      >
        {item.connected ? <Check size={16} /> : <Plus size={16} />}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{item.name}</div>
        <span className="text-xs font-normal text-secondary-foreground leading-3">
          {item.desc}
        </span>
      </div>
    </div>
  );

  return <div className="">{items.map(renderItem)}</div>;
};

export { Connections };
