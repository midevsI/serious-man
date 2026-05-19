import { join } from 'node:path';

export const APP_NAME = 'prompt-to-claude';
export const APP_DIR = '.ptc';
export const CONFIG_FILE = 'config.json';
export const NOTES_FILE = 'notes.json';
export const MEMORY_FILE = 'memory.json';
export const PROMPTS_FILE = 'prompts.json';

export function getAppRoot(baseDir = process.cwd()): string {
  return join(baseDir, APP_DIR);
}
