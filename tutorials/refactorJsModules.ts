import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

const initialHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Quiz Modular de IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Quiz Modular Generado por IA</h1>
  <div id="quiz-container"></div>
  <script src="script.js"></script>
</body>
</html>`;

const initialCss = `body { font-family: sans-serif; background-color: #1e293b; color: #cbd5e1; text-align: center; padding: 2em; }
#quiz-container { background-color: #334155; padding: 2em; border-radius: 8px; display: inline-block; min-width: 300px; }
h2 { color: #93c5fd; }
button { display: block; width: 100%; padding: 10px; margin-top: 10px; border: none; border-radius: 5px; background-color: #38bdf8; color: white; font-size: 1em; cursor: pointer; }
button:hover { background-color: #0ea5e9; }`;

const initialJs = `const questions = [
  {
    question: "¿Qué palabra clave exporta código de un módulo?",
    options: ["export", "import", "require"],
    answer: "export"
  },
  {
    question: "¿Qué atributo HTML habilita los módulos?",
    options: ["type='module'", "mode='script'", "module='true'"],
    answer: "type='module'"
  }
];

function displayQuestion(index) {
  const quizContainer = document.getElementById('quiz-container');
  const question = questions[index];
  let html = \`<h2>\${question.question}</h2>\`;
  question.options.forEach(option => {
    html += \`<button>\${option}</button>\`;
  });
  quizContainer.innerHTML = html;
}

displayQuestion(0);
`;

export const refactorJsModulesTutorial: Tutorial = {
    id: 'refactor-js-modules',
    title: 'Refactorizar JavaScript en Módulos',
    description: 'Aprende a dividir un script grande en módulos pequeños y reutilizables usando import/export.',
    initialFileSystem: {
      type: 'directory',
      children: {
        'index.html': { type: 'file', content: initialHtml },
        'style.css': { type: 'file', content: initialCss },
        'script.js': { type: 'file', content: initialJs },
      }
    },
    steps: [
      {
        instruction: 'Este script mezcla datos y lógica. Vamos a separarlos en módulos. Primero, crea un archivo para los datos del quiz: `quizData.js`.',
        type: 'create-file',
        filePath: 'quizData.js',
        getOutput: (fileName) => `Archivo de datos '${fileName}' creado.`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['quizData.js'] = { type: 'file', content: '' };
            return newFs;
        },
      },
      {
        instruction: 'Ahora, corta el array `questions` de `script.js` y pégalo en `quizData.js`. Añade la palabra clave `export` para que otros archivos puedan importarlo. Guarda el archivo.',
        type: 'edit',
        filePath: 'quizData.js',
        expectedContent: `export const questions = [
  {
    question: "¿Qué palabra clave exporta código de un módulo?",
    options: ["export", "import", "require"],
    answer: "export"
  },
  {
    question: "¿Qué atributo HTML habilita los módulos?",
    options: ["type='module'", "mode='script'", "module='true'"],
    answer: "type='module'"
  }
];`,
        getOutput: () => 'Datos del quiz exportados. ¡Primer módulo listo!',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'A continuación, separa la lógica de la interfaz. Crea un nuevo archivo llamado `ui.js`.',
        type: 'create-file',
        filePath: 'ui.js',
        getOutput: (fileName) => `Módulo de UI '${fileName}' creado.`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['ui.js'] = { type: 'file', content: '' };
            return newFs;
        },
      },
       {
        instruction: 'Corta la función `displayQuestion` de `script.js` y pégala en `ui.js`. De nuevo, usa `export` para que sea accesible. Guarda los cambios.',
        type: 'edit',
        filePath: 'ui.js',
        expectedContent: `export function displayQuestion(index, questions) {
  const quizContainer = document.getElementById('quiz-container');
  const question = questions[index];
  let html = \`<h2>\${question.question}</h2>\`;
  question.options.forEach(option => {
    html += \`<button>\${option}</button>\`;
  });
  quizContainer.innerHTML = html;
}`,
        getOutput: () => 'Lógica de la UI exportada. ¡Excelente separación!',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Ahora, `script.js` actuará como el "director de orquesta". Reemplaza su contenido para que importe los datos y la lógica de los otros módulos, y luego los use. Guarda el archivo.',
        type: 'edit',
        filePath: 'script.js',
        expectedContent: `import { questions } from './quizData.js';
import { displayQuestion } from './ui.js';

displayQuestion(0, questions);`,
        getOutput: () => 'Script principal actualizado para usar módulos.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Casi hemos terminado. Por defecto, el navegador no trata los scripts como módulos. Debemos indicárselo. Abre `index.html` y añade `type="module"` a la etiqueta `<script>`.',
        type: 'edit',
        filePath: 'index.html',
        expectedContent: `<!DOCTYPE html>
<html>
<head>
  <title>Quiz Modular de IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Quiz Modular Generado por IA</h1>
  <div id="quiz-container"></div>
  <script type="module" src="script.js"></script>
</body>
</html>`,
        getOutput: () => 'HTML actualizado. ¡Los módulos ahora funcionarán en el navegador!',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: '¡Felicidades! Has refactorizado con éxito un script en módulos. Esta técnica es esencial para construir aplicaciones web complejas y mantenibles.',
        type: 'info',
        getOutput: () => '',
        updateFileSystem: (fs) => fs,
      },
    ],
};