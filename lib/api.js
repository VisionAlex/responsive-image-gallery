const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const getPhotos = async () => {
  const res = await fetch(
    `http://api.pexels.com/v1/search?query=drawings&per_page=15`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const json = await res.json();
  return json.photos;
};
