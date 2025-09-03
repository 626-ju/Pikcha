/** JSON POST 요청 공통 처리 */
export const postJson = async <T>(
  url: string,
  body: unknown,
): Promise<{ ok: boolean; data: T | null; rawText: string }> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const rawText = await response.text();

  let data: T | null = null;
  try {
    data = rawText ? (JSON.parse(rawText) as T) : null;
  } catch {
    data = null;
  }
  return { ok: response.ok, data, rawText };
};
