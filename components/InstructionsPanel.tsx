import React from 'react';
import type { TutorialStep } from '../types';

interface InstructionsPanelProps {
  currentStep: TutorialStep | null;
  isCompleted: boolean;
  tutorialTitle?: string;
}

const InstructionsPanel: React.FC<InstructionsPanelProps> = ({ currentStep, isCompleted, tutorialTitle }) => {
  return (
    <div className="w-full md:w-96 bg-slate-900/50 p-4 overflow-y-auto border-t md:border-t-0 md:border-l border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-600 pb-2">Instrucciones</h3>
      {isCompleted ? (
        <div className="p-4 bg-green-500/20 text-green-300 rounded-md">
            <h4 className="font-bold text-lg">¡Tutorial Completado!</h4>
            <p className="mt-2">¡Bien hecho! Has completado el tutorial "{tutorialTitle}". Ahora puedes finalizarlo y elegir otro de la lista.</p>
        </div>
      ) : currentStep ? (
        <div className="space-y-4">
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            {currentStep.instruction}
          </p>
          {currentStep.type === 'command' && currentStep.command && (
            <div className="p-3 bg-slate-900 rounded-md">
              <p className="text-slate-400 text-sm">Comando a ejecutar:</p>
              <code className="text-sky-400 font-bold">{currentStep.command}</code>
            </div>
          )}
          {currentStep.type === 'edit' && currentStep.expectedContent && (
             <div className="p-3 bg-slate-900 rounded-md">
              <p className="text-slate-400 text-sm">Contenido esperado para <code className='text-amber-400'>{currentStep.filePath}</code>:</p>
              <pre className="text-xs text-slate-300 bg-transparent whitespace-pre-wrap mt-2 max-h-48 overflow-auto">{currentStep.expectedContent}</pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-500">No tutorial selected.</p>
      )}
    </div>
  );
};

export default InstructionsPanel;