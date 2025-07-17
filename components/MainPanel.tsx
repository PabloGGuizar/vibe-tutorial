import React from 'react';
import type { Tutorial, TutorialStep, FileSystem } from '../types';
import Editor from './Editor';
import InstructionsPanel from './InstructionsPanel';

interface MainPanelProps {
  activeTutorial: Tutorial | null;
  currentStep: TutorialStep | null;
  isCompleted: boolean;
  fileSystem: FileSystem | null;
  openFilePath: string | null;
  onSaveFile: (path: string, content: string) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  activeTutorial,
  currentStep,
  isCompleted,
  fileSystem,
  openFilePath,
  onSaveFile,
}) => {
  const getFileContent = (path: string): string | null => {
    if (!fileSystem) return null;
    const parts = path.split('/');
    let currentNode: any = fileSystem;
    for (const part of parts) {
      if (currentNode && currentNode.children && currentNode.children[part]) {
        currentNode = currentNode.children[part];
      } else {
        return null;
      }
    }
    return currentNode.type === 'file' ? currentNode.content : null;
  };

  const fileContent = openFilePath ? getFileContent(openFilePath) : null;

  return (
    <div className="flex-grow flex flex-col md:flex-row bg-slate-800 overflow-hidden">
      <div className="flex-1 flex flex-col">
        {openFilePath && fileContent !== null ? (
          <Editor
            filePath={openFilePath}
            initialContent={fileContent}
            onSave={onSaveFile}
            isBlocked={isCompleted || currentStep?.type !== 'edit'}
          />
        ) : (
          <div className="p-8 flex items-center justify-center h-full">
             <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-400">Asistente de Código IA</h2>
                <p className="text-slate-500 mt-2">
                    {activeTutorial ? 'Selecciona un archivo generado por la IA para inspeccionarlo o editarlo.' : 'Selecciona un tutorial para aprender a trabajar con código generado por IA.'}
                </p>
             </div>
          </div>
        )}
      </div>
      <InstructionsPanel
        currentStep={currentStep}
        isCompleted={isCompleted}
        tutorialTitle={activeTutorial?.title}
      />
    </div>
  );
};

export default MainPanel;