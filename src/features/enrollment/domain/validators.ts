export function isValidCedula(value: string): boolean {
  if (!/^\d{10}$/.test(value)) return false;
  const province = Number(value.slice(0, 2));
  if (!((province >= 1 && province <= 24) || province === 30)) return false;
  if (Number(value[2]) >= 6) return false;

  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const sum = coefficients.reduce((acc, coefficient, index) => {
    const product = coefficient * Number(value[index]);
    return acc + (product > 9 ? product - 9 : product);
  }, 0);
  return (10 - (sum % 10)) % 10 === Number(value[9]);
}

/** Returns "+5939XXXXXXXX" or null when the input is not an Ecuadorian mobile number. */
export function normalizeEcuadorMobile(input: string): string | null {
  const digits = input.replace(/[\s\-()]/g, "").replace(/^\+/, "");
  if (!/^\d+$/.test(digits)) return null;

  let national: string;
  if (digits.startsWith("593")) national = digits.slice(3);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else national = digits;

  return /^9\d{8}$/.test(national) ? `+593${national}` : null;
}

export function isValidEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

export function isValidRuc(value: string): boolean {
  return /^[0-9]{10}001$/.test(value);
}

export function isValidPassport(value: string): boolean {
  return /^[0-9A-Za-z]{5,20}$/.test(value);
}

export type DetectedFileType = { mime: string; ext: string };

const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
  bytes.length >= offset + signature.length && signature.every((byte, i) => bytes[offset + i] === byte);

const ascii = (text: string) => Array.from(text).map((char) => char.charCodeAt(0));

/** Detects the real file type from magic bytes; never trust the declared MIME type or extension. */
export function detectFileType(bytes: Uint8Array): DetectedFileType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return { mime: "image/jpeg", ext: "jpg" };
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { mime: "image/png", ext: "png" };
  if (startsWith(bytes, ascii("RIFF")) && startsWith(bytes, ascii("WEBP"), 8)) return { mime: "image/webp", ext: "webp" };
  if (startsWith(bytes, ascii("%PDF-"))) return { mime: "application/pdf", ext: "pdf" };
  return null;
}
