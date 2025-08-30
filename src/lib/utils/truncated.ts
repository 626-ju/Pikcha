export const truncated = (chars: string, maxLength: number) => {
  let truncatedChars = chars;
  if (truncatedChars.length > maxLength) {
    truncatedChars = chars.slice(0, maxLength);
  }

  return truncatedChars;
};
