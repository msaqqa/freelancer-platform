'use client';

import { cn } from '@/lib/utils';

const ScrollspyMenu = ({ items, setActiveSection, activeSection }) => {
  const buildAnchor = (item, index, indent = false) => {
    const isActive = activeSection === item.target;
    return (
      <div
        key={index}
        data-scrollspy-anchor={item.target}
        onClick={() => setActiveSection(item.target)}
        className={cn(
          'cursor-pointer flex items-center rounded-lg ps-2.5 pe-2.5 py-1.5 border border-transparent text-accent-foreground hover:text-primary',
          isActive && 'bg-accent text-primary font-medium',
          indent ? 'gap-3.5' : 'gap-1.5',
        )}
      >
        <span
          className={cn(
            'flex w-1.5 relative before:absolute start-px rtl:-start-[5px] before:top-0 before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4 before:bg-transparent',
            isActive && 'before:bg-primary',
          )}
        ></span>
        {item.title}
      </div>
    );
  };

  const buildSubAnchors = (items) => {
    return items.map((item, index) => {
      return buildAnchor(item, index, true);
    });
  };

  const renderChildren = (items) => {
    return items.map((item, index) => {
      if (item.children) {
        return (
          <div key={index} className="flex flex-col">
            <div className="ps-6 pe-2.5 py-2.5 text-sm font-semibold text-mono">
              {item.title}
            </div>
            <div className="flex flex-col">
              {buildSubAnchors(item.children)}
            </div>
          </div>
        );
      } else {
        return buildAnchor(item, index);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-3 grow relative before:absolute before:start-[11px] before:top-0 before:bottom-0 before:border-s before:border-border text-sm">
      {renderChildren(items)}
    </div>
  );
};

export { ScrollspyMenu };
