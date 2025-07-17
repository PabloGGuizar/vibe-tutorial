import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const pushChangesTutorial: Tutorial = {
    id: 'push-changes',
    title: 'Guardar Cambios en GitHub',
    description: 'Realiza cambios en un proyecto clonado, guárdalos localmente y súbelos de vuelta a GitHub.',
    initialFileSystem: {
      type: 'directory',
      children: {
        '.git': { type: 'directory', children: {} },
        'index.html': { type: 'file', content: '<h1>Página Inicial</h1>' }
      }
    },
    steps: [
      {
        instruction: 'Has clonado un proyecto y ahora quieres hacer una mejora. Abre `index.html` y añade un párrafo descriptivo debajo del título. Guarda los cambios.',
        type: 'edit',
        filePath: 'index.html',
        expectedContent: `<h1>Página Inicial</h1>
<p>¡Bienvenido a nuestro proyecto mejorado!</p>`,
        getOutput: () => 'Archivo modificado. Git ya ha detectado el cambio.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Al igual que antes, debemos añadir los archivos modificados al "área de preparación" (staging) para que Git sepa que queremos incluirlos en nuestro próximo commit. Usa `git add .` para añadir todos los cambios.',
        type: 'command',
        command: 'git add .',
        getOutput: () => 'Cambios añadidos al área de preparación.',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Ahora, guarda estos cambios en el historial local con un "commit". Es importante usar un mensaje claro que describa lo que hiciste.',
        type: 'command',
        command: 'git commit -m "Añade párrafo de bienvenida al index"',
        getOutput: () => '[main 1a2b3c5] Añade párrafo de bienvenida al index\n 1 archivo cambiado, 1 inserción(+)',
        updateFileSystem: (fs) => fs,
      },
      {
        instruction: 'Tus cambios están guardados en tu máquina, pero el repositorio remoto de GitHub aún no los tiene. Usa `git push` para subir tus commits y sincronizar ambos repositorios.',
        type: 'command',
        command: 'git push',
        getOutput: () => `Enumerando objetos: 5, hecho.
Contando objetos: 100% (5/5), hecho.
Escribiendo objetos: 100% (3/3), 300 bytes | 300.00 KiB/s, hecho.
Total 3 (delta 0), reusado 0 (delta 0)
To https://github.com/ia-dev/proyecto-clonado.git
   1a2b3c4..1a2b3c5  main -> main`,
        updateFileSystem: (fs) => fs,
      },
      {
          instruction: '¡Misión cumplida! Has completado el ciclo de trabajo más común en Git: modificar, añadir, confirmar y subir. Ahora tus cambios están seguros en GitHub y disponibles para tus colaboradores.',
          type: 'info',
          getOutput: () => '',
          updateFileSystem: (fs) => fs,
      }
    ],
};