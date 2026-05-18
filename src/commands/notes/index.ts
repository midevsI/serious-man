import type { CliApp } from '../../core/cli';
import { NOTES_FILE } from '../../core/config/constants';
import { LocalStore } from '../../core/storage/local-store';
import { logger } from '../../core/logger/logger';

export function notesCommand(app: CliApp): void {
  app.register({
    name: 'notes',
    description: 'Manage developer notes (placeholder)',
    action: async () => {
      const store = new LocalStore();
      const notes = await store.readJson<string[]>(NOTES_FILE, []);
      logger.info(`Notes placeholder. Notes captured: ${notes.length}`);
    }
  });
}
