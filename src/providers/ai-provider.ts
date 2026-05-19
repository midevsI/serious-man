export interface AiProvider {
  name: string;
  complete(prompt: string): Promise<string>;
}

export class AnthropicMockProvider implements AiProvider {
  name = 'anthropic';

  async complete(prompt: string): Promise<string> {
    return `Anthropic mock response for Claude workflow prompt: ${prompt}`;
  }
}
