import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const ghPagesTutorial: Tutorial = {
    id: 'gh-pages',
    title: 'Desplegar una App React de IA',
    description: 'La IA construyó una app React. Tu misión: publicarla en la web para que todos la vean.',
    initialFileSystem: {
        type: 'directory',
        children: {
            'package.json': {
                type: 'file',
                content: `{
  "name": "ia-react-app",
  "version": "0.1.0",
  "dependencies": { "react": "^18.0.0", "react-dom": "^18.0.0" },
  "scripts": { "start": "react-scripts start", "build": "react-scripts build" }
}`
            },
            'src': {
                type: 'directory',
                children: { 'App.js': { type: 'file', content: 'function App() { return <h1>Hola desde la IA en React</h1>; }' } }
            }
        }
    },
    steps: [
        {
            instruction: 'Tenemos nuestra aplicación React generada por IA. Para desplegarla en GitHub Pages, usaremos una herramienta llamada `gh-pages`. Primero, instálala como una dependencia de desarrollo con `npm`.',
            type: 'command',
            command: 'npm install gh-pages --save-dev',
            getOutput: () => 'agregado 1 paquete, y auditado 2 paquetes en 5s\n¡gh-pages instalado!',
            updateFileSystem: (fs) => fs,
        },
        {
            instruction: 'Ahora debemos configurar `package.json` para el despliegue. Necesitamos añadir la URL donde vivirá la app (`homepage`) y dos scripts: `predeploy` (que construye la app) y `deploy` (que la publica). Abre `package.json` y modifícalo como en el ejemplo.',
            type: 'edit',
            filePath: 'package.json',
            expectedContent: `{
  "name": "ia-react-app",
  "version": "0.1.0",
  "homepage": "https://usuario.github.io/ia-react-app",
  "dependencies": { "react": "^18.0.0", "react-dom": "^18.0.0" },
  "scripts": { "start": "react-scripts start", "build": "react-scripts build", "predeploy": "npm run build", "deploy": "gh-pages -d build" }
}`,
            getOutput: () => 'package.json actualizado para el despliegue.',
            updateFileSystem: (fs) => {
              const newFs = cloneFileSystem(fs);
              const packageJson = newFs.children['package.json'];
              if (packageJson && packageJson.type === 'file') {
                packageJson.content = `{
  "name": "ia-react-app",
  "version": "0.1.0",
  "homepage": "https://usuario.github.io/ia-react-app",
  "dependencies": { "react": "^18.0.0", "react-dom": "^18.0.0" },
  "scripts": { "start": "react-scripts start", "build": "react-scripts build", "predeploy": "npm run build", "deploy": "gh-pages -d build" }
}`;
              }
              return newFs;
            }
        },
        {
            instruction: 'Con todo configurado, solo necesitamos ejecutar un comando. `npm run deploy` activará automáticamente el script `predeploy` para construir la app y luego el script `deploy` para publicarla. Escríbelo en la terminal.',
            type: 'command',
            command: 'npm run deploy',
            getOutput: (cmd) => `> ia-react-app@0.1.0 predeploy /project\n> npm run build\n\n> ia-react-app@0.1.0 build /project\n> react-scripts build\n\nCreando una compilación de producción optimizada...\nCompilado exitosamente.\n\n> ia-react-app@0.1.0 deploy /project\n> gh-pages -d build\n\nPublicado`,
            updateFileSystem: (fs) => {
                const newFs = cloneFileSystem(fs);
                newFs.children['build'] = { type: 'directory', children: {
                    'index.html': { type: 'file', content: '...'},
                } };
                return newFs;
            }
        },
        {
            instruction: '¡Lo has hecho! Has desplegado una aplicación de React en la web. Ahora cualquiera puede visitarla. Has completado un ciclo de desarrollo completo: desde el código de la IA hasta un producto en vivo.',
            type: 'info',
            getOutput: () => '',
            updateFileSystem: (fs) => fs,
        }
    ]
};