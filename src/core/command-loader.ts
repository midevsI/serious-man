import type { CliApp } from './cli';
import { initCommand } from '../commands/init';
import { contextCommand } from '../commands/context';
import { promptCommand } from '../commands/prompt';
import { notesCommand } from '../commands/notes';
import { compressCommand } from '../commands/compress';
import { doctorCommand } from '../commands/doctor';

const commands = [initCommand, contextCommand, promptCommand, notesCommand, compressCommand, doctorCommand] as const;

export function registerCommands(app: CliApp): void {
  for (const register of commands) {
    register(app);
  }
}
