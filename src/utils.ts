export async function wrappedTryCatch<T>(onSuccess: () => T | Promise<T>): Promise<[T | undefined, any]> {
  try {
    return [await onSuccess(), undefined];
  } catch (error) {
    return [undefined, error];
  }
}

export function getCurrentYyyyMmDd(): string {
  const now = new Date();
  const nowYYYY = now.getFullYear().toString();
  const nowMM = (now.getMonth() + 1).toString().padStart(2, "0");
  const nowDD = now.getDate().toString().padStart(2, "0");

  return nowYYYY + nowMM + nowDD;
}
