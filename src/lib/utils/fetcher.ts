const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) throw new Error(`${res.status}`);

  const data = await res.json();

  return data;
};

export default fetcher;
