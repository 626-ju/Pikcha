const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    const errMsg = JSON.stringify(data, null, 2);
    console.log(errMsg);

    const flattenErrMsg = flattenError(data).message;
    throw new Error(flattenErrMsg);
  }

  return data;
};

export default fetcher;

const flattenError = (data: Record<string, unknown>) => {
  let topMessage = '';

  if (typeof data.message === 'string') {
    topMessage = data.message;
  }

  function recurse(current: object) {
    for (const val of Object.values(current)) {
      if (val && typeof val === 'object') {
        if ('message' in val && typeof val.message === 'string') {
          topMessage = val.message;
        }
        recurse(val);
      }
    }
  }

  recurse(data);
  return { message: topMessage };
};
