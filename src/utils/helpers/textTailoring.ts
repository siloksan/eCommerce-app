function textTailoring(text: string, maxChar: number): string {
  return text.length > maxChar ? text.slice(0, maxChar - 1).concat('...') : text;
}

export default textTailoring;
