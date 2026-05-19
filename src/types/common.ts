export interface CliContext {
  cwd: string;
  startedAt: Date;
}

export interface PluginManifest {
  name: string;
  version: string;
  description?: string;
  entry: string;
}
