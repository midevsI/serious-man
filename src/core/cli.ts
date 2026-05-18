export type CommandAction = () => Promise<void> | void;

export interface CommandDefinition {
  name: string;
  description: string;
  action: CommandAction;
}

export class CliApp {
  private readonly commands = new Map<string, CommandDefinition>();

  constructor(
    private readonly name: string,
    private readonly description: string,
    private readonly version: string
  ) {}

  register(command: CommandDefinition): void {
    this.commands.set(command.name, command);
  }

  async run(argv: string[]): Promise<void> {
    const arg = argv[2];

    if (!arg || arg === '--help' || arg === '-h') {
      this.printHelp();
      return;
    }

    if (arg === '--version' || arg === '-V') {
      console.log(this.version);
      return;
    }

    const command = this.commands.get(arg);
    if (!command) {
      throw new Error(`Unknown command: ${arg}`);
    }

    await command.action();
  }

  private printHelp(): void {
    console.log(`${this.name} - ${this.description}`);
    console.log('');
    console.log('Usage: sm <command>');
    console.log('');
    console.log('Commands:');

    for (const command of this.commands.values()) {
      console.log(`  ${command.name.padEnd(10)} ${command.description}`);
    }
  }
}
