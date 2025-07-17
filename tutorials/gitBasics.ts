import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const gitBasicsTutorial: Tutorial = {
    id: 'git-basics',
    title: 'Control de Versiones para Código de IA',
    description: 'Tu asistente de IA escribió el código inicial. Aprende a crear un archivo, pegar el código y usar Git para guardarlo.',
    initialFileSystem: {
      type: 'directory',
      children: {},
    },
    steps: [
      {
        instruction: 'Tu asistente de IA te ha dado un fragmento de código HTML. Para empezar, crea un nuevo archivo llamado `index.html` usando el botón `+` en el explorador de archivos.',
        type: 'create-file',
        filePath: 'index.html',
        getOutput: (fileName) => `Archivo '${fileName}' creado. Ahora, pega el código de la IA.`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['index.html'] = { type: 'file', content: '' };
            return newFs;
        },
      },
      {
        instruction: '¡Genial! Ahora abre `index.html`. Pega el siguiente código que te proporcionó la IA y guarda los cambios para continuar.',
        type: 'edit',
        filePath: 'index.html',
        expectedContent: `<!DOCTYPE html>
<html>
<body>
  <h1>Página Generada por IA</h1>
</body>
</html>`,
        getOutput: () => 'Código de la IA guardado en index.html. ¡Listo para el control de versiones!',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Perfecto. Ahora que tienes tu archivo con el código de la IA, es momento de ponerlo bajo control de versiones con Git. Primero, inicializa un repositorio. Escribe en la terminal:',
        type: 'command',
        command: 'git init',
        getOutput: () => 'Repositorio Git vacío inicializado en /project/.git/',
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['.git'] = { type: 'directory', children: {} };
            return newFs;
        },
      },
      {
        instruction: 'Ahora que Git está activo, debemos decirle qué archivos queremos que rastree. Con `git add .`, le decimos que incluya todos los archivos del directorio actual en la próxima "foto" (commit) que tomemos.',
        type: 'command',
        command: 'git add .',
        getOutput: () => '',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Es hora de tomar la "foto" de nuestro proyecto. Esto se llama hacer un "commit". Cada commit necesita un mensaje que describa qué cambios hicimos. Así registramos que este es el código inicial de la IA.',
        type: 'command',
        command: 'git commit -m "Commit inicial del código de IA"',
        getOutput: () => '[main (root-commit) 1a2b3c4] Commit inicial del código de IA\n 1 archivo cambiado, 5 inserciones(+)',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Para colaborar o tener una copia de seguridad en la nube (como en GitHub), conectamos nuestro repositorio local a uno remoto. Este comando simula esa conexión.',
        type: 'command',
        command: 'git remote add origin https://github.com/usuario/ia-repo.git',
        getOutput: () => '',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Finalmente, subimos nuestros commits al repositorio remoto con `git push`. Esto publica nuestros cambios para que otros (o nosotros mismos desde otra máquina) puedan verlos.',
        type: 'command',
        command: 'git push origin main',
        getOutput: () => 'Enumerando objetos: 3, hecho.\nContando objetos: 100% (3/3), hecho.\nEscribiendo objetos: 100% (3/3), 250 bytes | 250.00 KiB/s, hecho.\nTotal 3 (delta 0), reusado 0 (delta 0)\nTo https://github.com/usuario/ia-repo.git\n * [new branch]      main -> main',
        updateFileSystem: (fs) => fs,
      },
      {
          instruction: '¡Excelente! Ahora sabes cómo tomar el código generado por una IA y ponerlo bajo control de versiones. Este es el primer paso para cualquier proyecto de desarrollo profesional.',
          type: 'info',
          getOutput: () => '',
          updateFileSystem: (fs) => fs,
      }
    ],
};
