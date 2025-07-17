export interface FileSystemFile {
  type: 'file';
  content: string;
}

export interface Directory {
  type: 'directory';
  children: { [key: string]: FileSystemFile | Directory };
}

export type FileSystemNode = FileSystemFile | Directory;
export type FileSystem = Directory;

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  text: string;
}

export interface TutorialStep {
  instruction: string;
  type: 'command' | 'edit' | 'info' | 'create-file';
  command?: string;
  filePath?: string;
  expectedContent?: string;
  getOutput: (command?: string) => string;
  updateFileSystem: (fs: FileSystem) => FileSystem;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  initialFileSystem: FileSystem;
  steps: TutorialStep[];
}