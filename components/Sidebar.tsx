import React from 'react';
import type { Tutorial, FileSystem } from '../types';
import FileExplorer from './FileExplorer';
import TutorialsList from './TutorialsList';
import { PLUS_ICON } from '../constants';

interface SidebarProps {
  tutorials: Tutorial[];
  onSelectTutorial: (id: string) => void;
  fileSystem: FileSystem | null;
  onOpenFile: (path: string) => void;
  openFilePath: string | null;
  isTutorialActive: boolean;
  onNewFile: () => void;
  isNewFileBlocked: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  tutorials, 
  onSelectTutorial,
  fileSystem,
  onOpenFile,
  openFilePath,
  isTutorialActive,
  onNewFile,
  isNewFileBlocked,
}) => {
  return (
    <aside className="w-64 bg-slate-900/70 flex flex-col border-r border-slate-700">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">
          {isTutorialActive ? 'File Explorer' : 'Tutorials'}
        </h2>
        {isTutorialActive && (
          <button
            onClick={onNewFile}
            disabled={isNewFileBlocked}
            title="New File"
            className="p-1 rounded text-slate-400 hover:bg-slate-700 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            {PLUS_ICON}
          </button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto">
        {isTutorialActive && fileSystem ? (
          <FileExplorer 
            fileSystem={fileSystem}
            onOpenFile={onOpenFile}
            openFilePath={openFilePath}
          />
        ) : (
          <TutorialsList tutorials={tutorials} onSelect={onSelectTutorial} />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;