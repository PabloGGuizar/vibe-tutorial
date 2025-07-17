
import React from 'react';
import type { Tutorial } from '../types';

interface TutorialsListProps {
  tutorials: Tutorial[];
  onSelect: (id: string) => void;
}

const TutorialsList: React.FC<TutorialsListProps> = ({ tutorials, onSelect }) => {
  return (
    <div className="p-2">
      <ul>
        {tutorials.map(tutorial => (
          <li key={tutorial.id} className="mb-2">
            <button 
              onClick={() => onSelect(tutorial.id)}
              className="w-full text-left p-3 bg-slate-800 hover:bg-sky-500/20 rounded-md transition-colors duration-200"
            >
              <h3 className="font-bold text-white">{tutorial.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{tutorial.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorialsList;
