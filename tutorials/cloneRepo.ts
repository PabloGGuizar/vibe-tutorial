import type { Tutorial } from '../types';
import { cloneFileSystem } from '../utils';

export const cloneRepoTutorial: Tutorial = {
    id: 'clone-repo',
    title: 'Clonar un Repositorio de GitHub',
    description: 'Aprende a descargar (clonar) un proyecto existente desde GitHub para empezar a trabajar en él.',
    initialFileSystem: {
      type: 'directory',
      children: {},
    },
    steps: [
      {
        instruction: 'Un colega (o tu yo del futuro) ha subido un proyecto a GitHub. Para trabajar en él, primero necesitas una copia local. Esto se hace con `git clone`, seguido de la URL del repositorio.',
        type: 'command',
        command: 'git clone https://github.com/ia-dev/proyecto-clonado.git',
        getOutput: (command) => `Clonando en 'proyecto-clonado'...
remoto: Enumerando objetos: 3, hecho.
remoto: Contando objetos: 100% (3/3), hecho.
remoto: Comprimiendo objetos: 100% (2/2), hecho.
remoto: Total 3 (delta 0), reusado 3 (delta 0), pack-reusado 0
Desempaquetando objetos: 100% (3/3), hecho.
¡Repositorio clonado!`,
        updateFileSystem: (fs) => {
            const newFs = cloneFileSystem(fs);
            newFs.children['proyecto-clonado'] = { 
                type: 'directory', 
                children: {
                    '.git': { type: 'directory', children: {} },
                    'README.md': { type: 'file', content: '# Proyecto Clonado\n\nEste es un proyecto de ejemplo subido a GitHub.' }
                } 
            };
            return newFs;
        },
      },
      {
          instruction: '¡Perfecto! Has descargado el proyecto. Ahora tienes una carpeta `proyecto-clonado` con todo el código y su historial de Git. Este es el punto de partida para colaborar en la mayoría de los proyectos.',
          type: 'info',
          getOutput: () => '',
          updateFileSystem: (fs) => fs,
      }
    ],
};