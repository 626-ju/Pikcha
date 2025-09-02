const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    console.log(JSON.stringify(data, null, 2));
    throw new Error(data.message);
  }

  return data;
};

export default fetcher;
