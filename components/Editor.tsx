
import React, { useState, useEffect } from 'react';

interface EditorProps {
  filePath: string;
  initialContent: string;
  onSave: (path: string, content: string) => void;
  isBlocked: boolean;
}

const Editor: React.FC<EditorProps> = ({ filePath, initialContent, onSave, isBlocked }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [filePath, initialContent]);

  const handleSave = () => {
    onSave(filePath, content);
  };

  return (
    <div className="flex flex-col h-full bg-slate-800">
      <div className="flex justify-between items-center p-2 bg-slate-900 border-b border-slate-700">
        <span className="text-slate-400">{filePath}</span>
        <button
          onClick={handleSave}
          disabled={isBlocked}
          className="bg-sky-600 text-white px-4 py-1 rounded text-sm hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck="false"
        className="flex-grow w-full p-4 bg-slate-800 text-slate-200 resize-none focus:outline-none font-mono text-sm leading-relaxed"
      />
    </div>
  );
};

export default Editor;
