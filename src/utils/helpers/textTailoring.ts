function textTailoring(text: string, maxChar: number): string {
  const textStr = text ?? '';
  return textStr.length > maxChar ? textStr.slice(0, maxChar - 1).concat('...') : text;
}

export default textTailoring;
