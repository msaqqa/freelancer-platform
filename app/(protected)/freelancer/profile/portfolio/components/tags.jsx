'use client';

import { Badge } from '@/components/ui/badge';

const Tags = ({ tags }) => {
  const renderItem = (item, index) => {
    return (
      <Badge key={index} variant="secondary">
        {item.label}
      </Badge>
    );
  };

  return (
    <div className="flex flex-wrap gap-2.5 mb-2">
      {tags.map((item, index) => {
        return renderItem(item, index);
      })}
    </div>
  );
};

export { Tags };
