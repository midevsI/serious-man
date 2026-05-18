const color = {
  cyan: (text: string): string => `\x1b[36m${text}\x1b[0m`,
  green: (text: string): string => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string): string => `\x1b[33m${text}\x1b[0m`,
  red: (text: string): string => `\x1b[31m${text}\x1b[0m`
};

export const logger = {
  info: (message: string): void => console.log(color.cyan('ℹ'), message),
  success: (message: string): void => console.log(color.green('✔'), message),
  warn: (message: string): void => console.warn(color.yellow('⚠'), message),
  error: (message: string): void => console.error(color.red('✖'), message)
};
