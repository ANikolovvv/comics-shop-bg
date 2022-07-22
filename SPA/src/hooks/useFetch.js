import { useEffect, useState } from "react";

const useFetch = (url, defautValue) => {
  const [data, setData] = useState(defautValue);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result !== undefined) {
          setData(result);
        }
      });
  }, [url]);
  return [data];
};
export default useFetch;
