import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getAppRoot } from '../config/constants';

export class LocalStore {
  constructor(private readonly baseDir = process.cwd()) {}

  private pathFor(fileName: string): string {
    return join(getAppRoot(this.baseDir), fileName);
  }

  async readJson<T>(fileName: string, fallback: T): Promise<T> {
    try {
      const raw = await readFile(this.pathFor(fileName), 'utf-8');
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  async writeJson<T>(fileName: string, value: T): Promise<void> {
    await mkdir(getAppRoot(this.baseDir), { recursive: true });
    await writeFile(this.pathFor(fileName), JSON.stringify(value, null, 2));
  }
}
