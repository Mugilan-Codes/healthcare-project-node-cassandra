import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const fetchUrl = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data];
};

export { useFetch };
