const fetcher = async (url, token) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', token }),
      credentials: 'same-origin',
    });
    return res.json();
  } catch (error) {
    console.error('Error', error);
    return error;
  }
};
export default fetcher;
