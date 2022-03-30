const fetcher = async (genre, token) => {
  try {
    const res = await fetch(genre, {
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
