#!/usr/bin/env bun

import { registerCommands } from './core/command-loader';
import { loadEnv } from './core/config/env';
import { logger } from './core/logger/logger';
import { CliApp } from './core/cli';

async function main(): Promise<void> {
  loadEnv();

  const app = new CliApp('Prompt to Claude (PTC)', 'Claude Code workflow CLI', '0.2.0');
  registerCommands(app);

  try {
    await app.run(process.argv);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'Unknown CLI error');
    process.exitCode = 1;
  }
}

void main();
