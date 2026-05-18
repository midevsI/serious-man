const bold = (text: string): string => `\x1b[1m${text}\x1b[0m`;
const magenta = (text: string): string => `\x1b[35m${text}\x1b[0m`;
const dim = (text: string): string => `\x1b[2m${text}\x1b[0m`;

export const format = {
  heading: (text: string): string => bold(magenta(text)),
  muted: (text: string): string => dim(text)
};
