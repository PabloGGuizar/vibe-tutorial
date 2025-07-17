import React, { useState, useEffect, useRef } from 'react';
import type { TerminalLine } from '../types';

interface TerminalProps {
  lines: TerminalLine[];
  onCommand: (command: string) => void;
  isBlocked: boolean;
  placeholder: string;
}

const Terminal: React.FC<TerminalProps> = ({ lines, onCommand, isBlocked, placeholder }) => {
  const [input, setInput] = useState('');
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim() && !isBlocked) {
        onCommand(input.trim());
        setInput('');
      }
    }
  };

  return (
    <div className="h-64 flex flex-col bg-slate-900 border-t-2 border-slate-700">
      <div className="flex-grow p-4 overflow-y-auto text-sm">
        {lines.map((line, index) => (
          <div key={index} className="flex">
            {line.type === 'command' && (
              <span className="text-sky-400 mr-2 flex-shrink-0">$</span>
            )}
            <p
              className={`whitespace-pre-wrap break-words ${
                line.type === 'error' ? 'text-red-400' : ''
              } ${line.type === 'output' ? 'text-slate-300' : ''}`}
            >
              {line.text}
            </p>
          </div>
        ))}
        <div ref={endOfTerminalRef} />
      </div>
      <div className="flex items-center p-2 bg-slate-800 border-t border-slate-700">
        <span className="text-sky-400 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-white w-full focus:outline-none"
          placeholder={placeholder}
          disabled={isBlocked}
        />
      </div>
    </div>
  );
};

export default Terminal;