export interface AiProvider {
  name: string;
  complete(prompt: string): Promise<string>;
}

export class MockAiProvider implements AiProvider {
  name = 'mock';

  async complete(prompt: string): Promise<string> {
    return `Mock response for: ${prompt}`;
  }
}
