import { Tutorial } from '../types';
import { gitBasicsTutorial } from '../tutorials/gitBasics';
import { refactorHtmlTutorial } from '../tutorials/refactorHtml';
import { runReactProjectTutorial } from '../tutorials/runReactProject';
import { ghPagesTutorial } from '../tutorials/ghPages';
import { reuseCodeWithJsonTutorial } from '../tutorials/reuseCodeWithJson';
import { cloneRepoTutorial } from '../tutorials/cloneRepo';
import { pushChangesTutorial } from '../tutorials/pushChanges';
import { refactorJsModulesTutorial } from '../tutorials/refactorJsModules';

const TUTORIALS: Tutorial[] = [
  gitBasicsTutorial,
  cloneRepoTutorial,
  pushChangesTutorial,
  refactorHtmlTutorial,
  reuseCodeWithJsonTutorial,
  refactorJsModulesTutorial,
  runReactProjectTutorial,
  ghPagesTutorial,
];

export const getTutorials = (): Tutorial[] => {
  return TUTORIALS;
};

export const getTutorialById = (id: string): Tutorial | undefined => {
  return TUTORIALS.find(t => t.id === id);
};