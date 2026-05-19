import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { CliApp } from '../../core/cli';
import { logger } from '../../core/logger/logger';
import { CONFIG_FILE, getAppRoot } from '../../core/config/constants';

function checkTool(command: string, args: string[]): boolean {
  try {
    const result = Bun.spawnSync([command, ...args], { stdout: 'pipe', stderr: 'pipe' });
    return result.exitCode === 0;
  } catch {
    return false;
  }
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function checkConfigIntegrity(): Promise<boolean> {
  try {
    const configPath = join(getAppRoot(), CONFIG_FILE);
    const raw = await readFile(configPath, 'utf-8');
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return typeof parsed.compressionLevel === 'string';
  } catch {
    return false;
  }
}

function checkRepoState(): boolean {
  return checkTool('git', ['rev-parse', '--is-inside-work-tree']);
}

export function doctorCommand(app: CliApp): void {
  app.register({
    name: 'doctor',
    description: 'Run Prompt to Claude environment diagnostics',
    action: async () => {
      logger.success('PTC diagnostics');

      const checks = [
        ['git', checkTool('git', ['--version'])],
        ['bun', checkTool('bun', ['--version'])],
        ['node', checkTool('node', ['--version'])],
        ['claude', checkTool('claude', ['--version'])],
        ['repo state', checkRepoState()]
      ] as const;

      for (const [name, ok] of checks) {
        if (ok) logger.success(`${name}: ok`);
        else logger.warn(`${name}: missing or invalid`);
      }

      const appRoot = getAppRoot();
      if (await pathExists(appRoot)) logger.success(`.ptc directory: found (${appRoot})`);
      else logger.warn(`.ptc directory: missing (${appRoot}) - run: ptc init`);

      if (await checkConfigIntegrity()) logger.success('configuration integrity: valid');
      else logger.warn('configuration integrity: invalid or missing config.json');
    }
  });
}
