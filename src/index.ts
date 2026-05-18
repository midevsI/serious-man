#!/usr/bin/env bun

import { registerCommands } from './core/command-loader';
import { loadEnv } from './core/config/env';
import { logger } from './core/logger/logger';
import { CliApp } from './core/cli';

async function main(): Promise<void> {
  loadEnv();

  const app = new CliApp('serious-man', 'terminal-native developer workflow CLI', '0.1.0');
  registerCommands(app);

  try {
    await app.run(process.argv);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'Unknown CLI error');
    process.exitCode = 1;
  }
}

void main();
