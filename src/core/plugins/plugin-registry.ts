import type { PluginManifest } from '../../types/common';

export class PluginRegistry {
  private readonly plugins: PluginManifest[] = [];

  register(plugin: PluginManifest): void {
    this.plugins.push(plugin);
  }

  list(): PluginManifest[] {
    return [...this.plugins];
  }
}
