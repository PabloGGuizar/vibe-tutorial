import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const runReactProjectTutorial: Tutorial = {
    id: 'run-react-project',
    title: 'Ejecutar un Proyecto React de IA',
    description: 'Un asistente de IA generó una app React. Aprende a instalar sus dependencias y ejecutarla.',
    initialFileSystem: {
        type: 'directory',
        children: {
            'package.json': {
                type: 'file',
                content: `{
  "name": "ia-react-app",
  "version": "0.1.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}`
            },
            'src': {
                type: 'directory',
                children: {
                    'App.js': {
                        type: 'file',
                        content: `import React from 'react';

function App() {
  return (
    <div>
      <h1>App React Generada por IA</h1>
      <p>¡Está funcionando!</p>
    </div>
  );
}

export default App;`
                    },
                    'index.js': {
                        type: 'file',
                        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
                    }
                }
            },
            'public': {
                type: 'directory',
                children: {
                    'index.html': {
                        type: 'file',
                        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App de IA</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
                    }
                }
            }
        }
    },
    steps: [
        {
            instruction: 'Tu asistente de IA ha generado una aplicación React completa. Para ejecutarla, primero necesitamos instalar sus "dependencias" (otras librerías de las que depende). El archivo `package.json` las lista. En la terminal, escribe `npm install` para descargarlas.',
            type: 'command',
            command: 'npm install',
            getOutput: () => 'agregados 50 paquetes, y auditado 51 paquetes en 10s\nnode_modules creados.\n¡Dependencias instaladas!',
            updateFileSystem: (fs) => {
                const newFs = cloneFileSystem(fs);
                newFs.children['node_modules'] = { type: 'directory', children: {} };
                return newFs;
            },
        },
        {
            instruction: '¡Genial! Todas las dependencias están instaladas. Ahora, podemos arrancar el servidor de desarrollo. El comando `npm start` (definido en `package.json`) iniciará la aplicación para que podamos verla. Escríbelo en la terminal.',
            type: 'command',
            command: 'npm start',
            getOutput: () => `> ia-react-app@0.1.0 start /project\n> react-scripts start\n\nCompilado exitosamente!\n\nPuedes ver la app en el navegador.\n\n  Local:            http://localhost:3000\n\nNota: el servidor se recargará si haces cambios.\n`,
            updateFileSystem: (fs) => fs,
        },
        {
            instruction: '¡Lo has conseguido! Has tomado una aplicación React generada por IA, has instalado sus dependencias y la has ejecutado. Este es el flujo de trabajo estándar para iniciar casi cualquier proyecto de desarrollo moderno en JavaScript.',
            type: 'info',
            getOutput: () => '',
            updateFileSystem: (fs) => fs,
        }
    ]
};