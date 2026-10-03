// Browser-only: shrinks receipt photos before upload so they fit the 2 MB limit.
const MAX_SIDE = 1600;

export class ImageDecodeError extends Error {}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/** Scales the longest side to <= 1600px and re-encodes as WebP (JPEG when WebP is unsupported). */
export async function compressImage(file: File): Promise<File> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new ImageDecodeError("decode failed");
  }

  try {
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new ImageDecodeError("no canvas context");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    let blob = await canvasToBlob(canvas, "image/webp", 0.8);
    if (!blob || blob.type !== "image/webp") blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
    if (!blob) throw new ImageDecodeError("encode failed");

    const ext = blob.type === "image/webp" ? "webp" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "") || "comprobante";
    return new File([blob], `${baseName}.${ext}`, { type: blob.type });
  } finally {
    bitmap.close();
  }
}
