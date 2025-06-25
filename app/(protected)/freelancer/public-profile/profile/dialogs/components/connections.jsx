'use client';

import { Check } from 'lucide-react';

const Connections = ({ items }) => {
  const renderItem = (item, index) => (
    <div key={index} className="flex items-center space-x-4 mb-6">
      <div
        className={`rounded-full h-[32px] w-[32px] p-2 ${
          item?.is_completed
            ? 'bg-blue-500 text-white'
            : 'bg-background border border-foreground text-blue-600'
        }`}
        variant={item?.is_completed ? 'primary' : 'outline'}
      >
        {item?.is_completed && <Check size={18} />}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">{item?.name}</div>
        <span className="text-xs font-normal text-secondary-foreground leading-3">
          {item?.completion_text}
        </span>
      </div>
    </div>
  );

  return <div className="">{items.map(renderItem)}</div>;
};

export { Connections };
