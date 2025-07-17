
import React from 'react';
import { FileSystemNode, FileSystem } from '../types';
import { FOLDER_ICON, FILE_ICON } from '../constants';

interface FileExplorerProps {
  fileSystem: FileSystem;
  onOpenFile: (path: string) => void;
  openFilePath: string | null;
}

const Node: React.FC<{name: string, node: FileSystemNode, path: string, onOpenFile: (path: string) => void, openFilePath: string | null}> = ({ name, node, path, onOpenFile, openFilePath }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (node.type === 'directory') {
    return (
      <div className="my-1">
        <div 
          className="flex items-center cursor-pointer p-1 rounded hover:bg-slate-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {FOLDER_ICON}
          <span className="text-white">{name}</span>
        </div>
        {isOpen && (
          <div className="pl-4 border-l border-slate-600 ml-2">
            {Object.entries(node.children).sort(([a], [b]) => a.localeCompare(b)).map(([childName, childNode]) => (
              <Node 
                key={childName} 
                name={childName} 
                node={childNode}
                path={`${path}/${childName}`}
                onOpenFile={onOpenFile}
                openFilePath={openFilePath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = path === openFilePath;
  return (
    <div 
      className={`flex items-center cursor-pointer p-1 rounded ${isSelected ? 'bg-sky-500/30' : 'hover:bg-slate-700'}`}
      onClick={() => onOpenFile(path)}
    >
      {FILE_ICON}
      <span>{name}</span>
    </div>
  );
};


const FileExplorer: React.FC<FileExplorerProps> = ({ fileSystem, onOpenFile, openFilePath }) => {
  return (
    <div className="p-2 text-sm">
        {Object.entries(fileSystem.children).sort(([a], [b]) => a.localeCompare(b)).map(([name, node]) => (
            <Node key={name} name={name} node={node} path={name} onOpenFile={onOpenFile} openFilePath={openFilePath}/>
        ))}
    </div>
  );
};

export default FileExplorer;
