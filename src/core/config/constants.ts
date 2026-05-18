import { join } from 'node:path';

export const APP_NAME = 'serious-man';
export const APP_DIR = '.serious-man';
export const CONFIG_FILE = 'config.json';
export const NOTES_FILE = 'notes.json';
export const PROMPTS_FILE = 'prompts.json';

export function getAppRoot(baseDir = process.cwd()): string {
  return join(baseDir, APP_DIR);
}
