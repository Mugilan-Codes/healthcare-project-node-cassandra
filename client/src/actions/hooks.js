import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    };

    fetchUrl();
  }, [url]);

  return [data];
};

export { useFetch };
