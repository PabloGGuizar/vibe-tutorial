import React, { useState, useEffect } from 'react';

interface NewFileDialogProps {
  isOpen: boolean;
  onConfirm: (fileName: string) => void;
  onCancel: () => void;
  error: string | null;
}

const NewFileDialog: React.FC<NewFileDialogProps> = ({ isOpen, onConfirm, onCancel, error }) => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFileName('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileName.trim()) {
      onConfirm(fileName.trim());
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm border border-slate-700">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-white mb-4">Crear Nuevo Archivo</h2>
          <p className="text-slate-400 mb-4">Introduce el nombre del archivo:</p>
          <div>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              autoFocus
              className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="p. ej. index.html"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-500 transition-colors"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFileDialog;
