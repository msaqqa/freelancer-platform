'use client';

import { useEffect, useRef } from 'react';
import {
  Bold,
  Code,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Lightweight contentEditable editor (no external dependency). Stores HTML and
// reports it through onChange. Kept uncontrolled internally to avoid caret jumps.
const run = (command, value) => document.execCommand(command, false, value);

const ToolbarButton = ({ icon: Icon, label, onClick }) => (
  <button
    type="button"
    title={label}
    // onMouseDown (not onClick) so the editor keeps its selection.
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="flex items-center justify-center size-7 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
  >
    <Icon className="size-4" />
  </button>
);

const Divider = () => <span className="w-px h-5 bg-border mx-1" />;

export function RichTextEditor({ value, onChange, placeholder }) {
  const ref = useRef(null);

  // Sync external value in only when the editor isn't being typed into.
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.innerHTML !== (value || '')) {
      el.innerHTML = value || '';
    }
  }, [value]);

  const emit = () => onChange?.(ref.current?.innerHTML ?? '');

  const exec = (command, val) => {
    run(command, val);
    emit();
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) exec('createLink', url);
  };

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input px-2 py-1.5">
        <ToolbarButton icon={Bold} label="Bold" onClick={() => exec('bold')} />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          onClick={() => exec('italic')}
        />
        <ToolbarButton
          icon={Underline}
          label="Underline"
          onClick={() => exec('underline')}
        />
        <ToolbarButton
          icon={Strikethrough}
          label="Strikethrough"
          onClick={() => exec('strikeThrough')}
        />
        <Divider />
        <ToolbarButton
          icon={Code}
          label="Code"
          onClick={() => exec('formatBlock', 'pre')}
        />
        <Divider />
        <ToolbarButton
          icon={List}
          label="Bullet list"
          onClick={() => exec('insertUnorderedList')}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered list"
          onClick={() => exec('insertOrderedList')}
        />
        <ToolbarButton
          icon={Quote}
          label="Quote"
          onClick={() => exec('formatBlock', 'blockquote')}
        />
        <Divider />
        <ToolbarButton icon={Link2} label="Link" onClick={addLink} />
        <ToolbarButton
          icon={Minus}
          label="Divider"
          onClick={() => exec('insertHorizontalRule')}
        />
        <Divider />
        <ToolbarButton icon={Undo2} label="Undo" onClick={() => exec('undo')} />
        <ToolbarButton icon={Redo2} label="Redo" onClick={() => exec('redo')} />
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        data-placeholder={placeholder}
        className={cn(
          'min-h-[220px] px-4 py-3 text-sm text-foreground focus:outline-none',
          'prose-sm max-w-none [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ps-5 [&_ol]:ps-5',
          '[&:empty:before]:content-[attr(data-placeholder)] [&:empty:before]:text-muted-foreground',
        )}
      />
    </div>
  );
}
