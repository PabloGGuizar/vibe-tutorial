import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const refactorHtmlTutorial: Tutorial = {
    id: 'refactor-html',
    title: 'Refactorizar Código de IA',
    description: 'La IA es rápida, pero no siempre ordenada. Aprende a limpiar y organizar el código que genera.',
    initialFileSystem: {
      type: 'directory',
      children: {
        'index.html': {
          type: 'file',
          content: `<!DOCTYPE html>
<html>
<head>
  <title>Sitio de IA</title>
  <style>
    body { font-family: sans-serif; background-color: #282c34; color: white; }
    h1 { color: #61dafb; }
  </style>
</head>
<body>
  <h1>¡Generado por IA!</h1>
  <button onclick="showMessage()">Púlsame</button>
  <script>
    function showMessage() {
      alert('¡Hola desde el script de la IA!');
    }
  </script>
</body>
</html>`
        }
      }
    },
    steps: [
       {
        instruction: 'Nuestro asistente de IA generó este archivo HTML. Funciona, pero mezcla la estructura (HTML), el estilo (CSS) y la lógica (JavaScript) en un solo lugar. Esto dificulta el mantenimiento. Vamos a "refactorizarlo", es decir, a ordenarlo. Primero, crea un archivo para los estilos llamado `style.css` usando el botón `+`.',
        type: 'create-file',
        filePath: 'style.css',
        getOutput: (fileName) => `Archivo de estilos creado: ${fileName}`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['style.css'] = { type: 'file', content: '' };
            return newFs;
        },
      },
      {
        instruction: 'Ahora, un archivo para la lógica de la página. Usa el botón `+` de nuevo para crear un archivo llamado `script.js`.',
        type: 'create-file',
        filePath: 'script.js',
        getOutput: (fileName) => `Archivo de script creado: ${fileName}`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['script.js'] = { type: 'file', content: '' };
            return newFs;
        },
      },
      {
        instruction: 'Abre `index.html`. Corta todo el código que está DENTRO de las etiquetas `<style>`. Luego, pega ese código en tu nuevo archivo `style.css` y guárdalo.',
        type: 'edit',
        filePath: 'style.css',
        expectedContent: `body { font-family: sans-serif; background-color: #282c34; color: white; }
h1 { color: #61dafb; }`,
        getOutput: () => 'Estilos de la IA movidos a style.css.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Ahora haz lo mismo con el JavaScript. En `index.html`, corta el código DENTRO de las etiquetas `<script>`. Pégalo en `script.js` y guarda el archivo.',
        type: 'edit',
        filePath: 'script.js',
        expectedContent: `function showMessage() {
  alert('¡Hola desde el script de la IA!');
}`,
        getOutput: () => 'Lógica de la IA movida a script.js.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Nuestro `index.html` ahora está más limpio, pero no sabe dónde encontrar los estilos y el script. Debemos enlazarlos. Modifica `index.html` para eliminar las etiquetas `<style>` y `<script>` vacías y añade las etiquetas `<link>` y `<script src="...">` como en el ejemplo. Luego, guarda.',
        type: 'edit',
        filePath: 'index.html',
        expectedContent: `<!DOCTYPE html>
<html>
<head>
  <title>Sitio de IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>¡Generado por IA!</h1>
  <button onclick="showMessage()">Púlsame</button>
  <script src="script.js"></script>
</body>
</html>`,
        getOutput: () => 'index.html actualizado y enlazado. ¡Código refactorizado!',
        updateFileSystem: (fs) => fs,
      },
      {
          instruction: '¡Felicidades! Has refactorizado con éxito el código de la IA. Ahora tu proyecto está organizado, es más legible y fácil de ampliar. Esta es una habilidad crucial para un desarrollador.',
          type: 'info',
          getOutput: () => '',
          updateFileSystem: (fs) => fs,
      }
    ]
};