import type { FileSystem } from './types';

export const cloneFileSystem = (fs: FileSystem): FileSystem => {
  return JSON.parse(JSON.stringify(fs));
};
