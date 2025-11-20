/**
 * Detects if the given text contains Arabic characters.
 * @param text - The text to check for Arabic characters
 * @returns true if the text contains Arabic characters, false otherwise
 */
export function isArabic(text: string): boolean {
  if (!text) return false;

  const normalized = text.normalize('NFC');

  const arabicRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  return arabicRegex.test(normalized);
}
