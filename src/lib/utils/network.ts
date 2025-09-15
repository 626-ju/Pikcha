/** JSON POST 요청 공통 처리 */
export const postJson = async <T>(
  url: string,
  body: unknown,
): Promise<{ ok: boolean; data: T | null; rawText: string }> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'manual', // 302 응답을 그대로 받기 위함 (기본 follow면 자동 이동)
  });

  const rawText = await response.text();

  // 200~299 + 302까지는 정상으로 간주
  const ok = response.ok || response.status === 302;

  let data: T | null = null;
  try {
    data = rawText ? (JSON.parse(rawText) as T) : null;
  } catch {
    data = null;
  }

  return { ok, data, rawText };
};
