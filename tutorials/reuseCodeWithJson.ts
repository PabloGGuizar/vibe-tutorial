import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

const initialHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Quiz de IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Quiz Generado por IA</h1>
  <div id="quiz-container">
    <h2>¿Cuál es la capital de Francia?</h2>
    <button>París</button>
    <button>Londres</button>
    <button>Berlín</button>
  </div>
  <script src="script.js"></script>
</body>
</html>`;

const initialCss = `body {
  font-family: sans-serif;
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 2em;
}
#quiz-container {
  background-color: #34495e;
  padding: 2em;
  border-radius: 8px;
  display: inline-block;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  font-size: 1em;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}`;

const initialJs = `// La lógica del quiz está directamente ligada al HTML por ahora.
console.log("Script del quiz cargado.");
`;

export const reuseCodeWithJsonTutorial: Tutorial = {
    id: 'reuse-code-with-json',
    title: 'Reutilizar Código de IA con Datos JSON',
    description: 'Aprende a separar los datos de la lógica en el código de la IA para hacerlo más flexible y reutilizable.',
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
        instruction: 'Tu asistente de IA creó este quiz, pero las preguntas están escritas directamente en el HTML. Esto no es práctico si queremos añadir más preguntas. Vamos a separar los datos (preguntas) de la presentación (HTML). Primero, crea un archivo para nuestros datos: `quiz.json`.',
        type: 'create-file',
        filePath: 'quiz.json',
        getOutput: (fileName) => `Archivo de datos '${fileName}' creado. Ahora vamos a llenarlo.`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['quiz.json'] = { type: 'file', content: '' };
            return newFs;
        },
      },
      {
        instruction: 'JSON es un formato ideal para guardar datos. Abre `quiz.json` y pega esta estructura que contiene nuestras preguntas. Fíjate en el formato: es una lista de objetos, donde cada objeto es una pregunta con sus opciones y la respuesta correcta. Guarda el archivo.',
        type: 'edit',
        filePath: 'quiz.json',
        expectedContent: `[
  {
    "question": "¿Cuál es la capital de Francia?",
    "options": ["París", "Londres", "Berlín"],
    "answer": "París"
  },
  {
    "question": "¿Cuánto es 2 + 2?",
    "options": ["3", "4", "5"],
    "answer": "4"
  }
]`,
        getOutput: () => 'Datos del quiz guardados en quiz.json. ¡Excelente!',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Ahora, modifica `index.html` para que solo contenga el "esqueleto". Elimina el contenido de `#quiz-container`, ya que lo generaremos con JavaScript. Guarda los cambios.',
        type: 'edit',
        filePath: 'index.html',
        expectedContent: `<!DOCTYPE html>
<html>
<head>
  <title>Quiz de IA</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Quiz Generado por IA</h1>
  <div id="quiz-container"></div>
  <script src="script.js"></script>
</body>
</html>`,
        getOutput: () => 'HTML limpiado. Ahora el contenedor está listo para ser llenado dinámicamente.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Aquí viene la magia. Abre `script.js` y reemplaza su contenido con este código. Este script cargará el archivo `quiz.json`, leerá la primera pregunta y construirá el HTML correspondiente. Guárdalo para ver el resultado.',
        type: 'edit',
        filePath: 'script.js',
        expectedContent: `async function loadQuiz() {
  const response = await fetch('quiz.json');
  const questions = await response.json();
  const quizContainer = document.getElementById('quiz-container');

  const question = questions[0];
  let html = \`<h2>\${question.question}</h2>\`;
  question.options.forEach(option => {
    html += \`<button>\${option}</button>\`;
  });

  quizContainer.innerHTML = html;
}

loadQuiz();`,
        getOutput: () => '¡Script actualizado! Ahora lee los datos desde el JSON.',
        updateFileSystem: (fs) => fs,
      },
      {
          instruction: '¡Felicidades! Has desacoplado los datos de la lógica. Ahora puedes editar `quiz.json` para cambiar o añadir preguntas sin tocar una sola línea de HTML o JavaScript. Esta es una de las prácticas más importantes en el desarrollo de software.',
          type: 'info',
          getOutput: () => '',
          updateFileSystem: (fs) => fs,
      }
    ],
};