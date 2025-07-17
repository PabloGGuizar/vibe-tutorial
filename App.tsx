import React, { useState, useCallback, useEffect } from 'react';
import { getTutorials, getTutorialById } from './services/simulationService';
import type { Tutorial, FileSystem, TerminalLine } from './types';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import Terminal from './components/Terminal';
import NewFileDialog from './components/NewFileDialog';

const App: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [fileSystem, setFileSystem] = useState<FileSystem | null>(null);
  const [openFilePath, setOpenFilePath] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isCreatingFile, setIsCreatingFile] = useState<boolean>(false);
  const [newFileError, setNewFileError] = useState<string | null>(null);

  const tutorials = getTutorials();

  const resetState = () => {
    setActiveTutorial(null);
    setCurrentStepIndex(0);
    setFileSystem(null);
    setOpenFilePath(null);
    setTerminalLines([]);
    setIsCompleted(false);
    setIsCreatingFile(false);
    setNewFileError(null);
  };
  
  const handleSelectTutorial = (tutorialId: string) => {
    const tutorial = getTutorialById(tutorialId);
    if (tutorial) {
      resetState();
      setActiveTutorial(tutorial);
      setFileSystem(tutorial.initialFileSystem);
      setTerminalLines([{type: 'output', text: `Iniciando tutorial: ${tutorial.title}`}])
    }
  };

  const advanceStep = useCallback(() => {
    if (activeTutorial) {
      if (currentStepIndex < activeTutorial.steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else {
        setIsCompleted(true);
        setTerminalLines(prev => [...prev, { type: 'output', text: '¡Bien hecho! Has dominado una nueva habilidad para trabajar con código de IA. ✨' }]);
      }
    }
  }, [activeTutorial, currentStepIndex]);
  
  useEffect(() => {
    if (activeTutorial && activeTutorial.steps[currentStepIndex]?.type === 'info') {
      advanceStep();
    }
  }, [currentStepIndex, activeTutorial, advanceStep]);


  const handleTerminalCommand = (command: string) => {
    if (!activeTutorial || isCompleted) return;

    const newLines: TerminalLine[] = [...terminalLines, { type: 'command', text: command }];
    const step = activeTutorial.steps[currentStepIndex];

    if (step.type === 'command' && command.trim() === step.command) {
      const output = step.getOutput(command);
      if (output) {
        newLines.push({ type: 'output', text: output });
      }
      setFileSystem(step.updateFileSystem(fileSystem!));
      advanceStep();
    } else if (step.type !== 'command') {
        newLines.push({ type: 'error', text: `Error: Se esperaba una acción en la UI, no un comando.` });
    } else {
      newLines.push({ type: 'error', text: `Error: Comando incorrecto. Se esperaba: \`${step.command}\`` });
    }
    setTerminalLines(newLines);
  };

  const handleSaveFile = (path: string, content: string) => {
    if (!activeTutorial || !fileSystem || isCompleted) return;

    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    let node: any = newFileSystem;
    const pathParts = path.split('/');
    for (let i = 0; i < pathParts.length - 1; i++) {
        node = node.children[pathParts[i]];
    }
    node.children[pathParts[pathParts.length - 1]].content = content;
    setFileSystem(newFileSystem);

    const step = activeTutorial.steps[currentStepIndex];
    if (step.type === 'edit' && path === step.filePath) {
      const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();
      if (normalize(content) === normalize(step.expectedContent || '')) {
         const output = step.getOutput();
         setTerminalLines(prev => [...prev, {type: 'output', text: output}]);
         setFileSystem(step.updateFileSystem(newFileSystem));
         advanceStep();
      } else {
        setTerminalLines(prev => [...prev, { type: 'error', text: 'El contenido no coincide con el esperado. Revisa las instrucciones e inténtalo de nuevo.' }]);
      }
    }
  };

  const handleOpenFile = (path: string) => {
    setOpenFilePath(path);
  };
  
  const handleNewFile = () => {
    if (!activeTutorial || isCompleted || !fileSystem) return;

    const step = activeTutorial.steps[currentStepIndex];
    if (step.type !== 'create-file') {
        setTerminalLines(prev => [...prev, {type: 'error', text: 'Error: No se puede crear un archivo en este paso.'}]);
        return;
    }
    setIsCreatingFile(true);
    setNewFileError(null);
  };

  const handleConfirmNewFile = (fileName: string) => {
      if (!activeTutorial || !fileSystem) return;

      const step = activeTutorial.steps[currentStepIndex];
      
      if (fileName !== step.filePath) {
          setNewFileError(`Error: Nombre de archivo incorrecto. Se esperaba: \`${step.filePath}\``);
          return;
      }
  
      if (fileSystem.children[fileName]) {
          setNewFileError(`Error: El archivo "${fileName}" ya existe.`);
          return;
      }
    
      const newFileSystem = step.updateFileSystem(fileSystem);
      setFileSystem(newFileSystem);

      const output = step.getOutput(fileName);
      setTerminalLines(prev => [...prev, { type: 'output', text: output }]);
      
      setOpenFilePath(fileName);
      setIsCreatingFile(false);
      setNewFileError(null);
      advanceStep();
  };

  const handleCancelNewFile = () => {
      setIsCreatingFile(false);
      setNewFileError(null);
  };

  const currentStep = activeTutorial ? activeTutorial.steps[currentStepIndex] : null;
  
  const getTerminalPlaceholder = () => {
    if (!activeTutorial || isCompleted) return "Tutorial finalizado.";
    if (currentStep?.type === 'edit') return "Acción requerida en el editor...";
    if (currentStep?.type === 'create-file') return "Acción requerida en el explorador de archivos...";
    if (currentStep?.type === 'command') return "Escribe tu comando aquí...";
    return "Procesando...";
  }

  return (
    <div className="h-screen w-screen flex flex-col font-mono bg-slate-800">
       <header className="bg-slate-900 text-white p-3 flex items-center justify-between border-b border-slate-700">
        <h1 className="text-xl font-bold text-sky-400">Asistente de Código IA</h1>
        {activeTutorial && (
          <button 
            onClick={resetState}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Finalizar Tutorial
          </button>
        )}
      </header>
      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          tutorials={tutorials} 
          onSelectTutorial={handleSelectTutorial}
          fileSystem={fileSystem}
          onOpenFile={handleOpenFile}
          openFilePath={openFilePath}
          isTutorialActive={!!activeTutorial}
          onNewFile={handleNewFile}
          isNewFileBlocked={!activeTutorial || isCompleted || currentStep?.type !== 'create-file'}
        />
        <div className="flex-grow flex flex-col">
            <MainPanel
              activeTutorial={activeTutorial}
              currentStep={currentStep}
              isCompleted={isCompleted}
              fileSystem={fileSystem}
              openFilePath={openFilePath}
              onSaveFile={handleSaveFile}
            />
            <Terminal 
              lines={terminalLines} 
              onCommand={handleTerminalCommand}
              isBlocked={!activeTutorial || isCompleted || (currentStep?.type !== 'command')}
              placeholder={getTerminalPlaceholder()}
            />
        </div>
      </div>
      <NewFileDialog
        isOpen={isCreatingFile}
        onConfirm={handleConfirmNewFile}
        onCancel={handleCancelNewFile}
        error={newFileError}
      />
    </div>
  );
};

export default App;