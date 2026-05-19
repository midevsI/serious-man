import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CONFIG_FILE, getAppRoot } from './constants';

export interface AppConfig {
  compressionLevel: 'light' | 'balanced' | 'aggressive';
  includeGitDiff: boolean;
  includeDependencies: boolean;
}

const defaultConfig: AppConfig = {
  compressionLevel: 'balanced',
  includeGitDiff: true,
  includeDependencies: true
};

export class ConfigManager {
  private readonly configPath: string;
  private readonly appRoot: string;

  constructor(baseDir = process.cwd()) {
    this.appRoot = getAppRoot(baseDir);
    this.configPath = join(this.appRoot, CONFIG_FILE);
  }

  async load(): Promise<AppConfig> {
    try {
      const raw = await readFile(this.configPath, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<AppConfig>;
      return {
        compressionLevel: parsed.compressionLevel ?? defaultConfig.compressionLevel,
        includeGitDiff: parsed.includeGitDiff ?? defaultConfig.includeGitDiff,
        includeDependencies: parsed.includeDependencies ?? defaultConfig.includeDependencies
      };
    } catch {
      return defaultConfig;
    }
  }

  async save(config: AppConfig): Promise<void> {
    await mkdir(this.appRoot, { recursive: true });
    await writeFile(this.configPath, JSON.stringify(config, null, 2));
  }
}
