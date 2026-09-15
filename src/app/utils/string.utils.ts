export function toTitleCase(str: string | null | undefined): string {
  if (!str || !str.trim()) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s|-|\/)\S/g, (match) => match.toUpperCase());
}
