import { useEffect, useState } from "react";

const useFetch = ( defautValue) => {
  const url="https://test-server-rest-api.herokuapp.com/api/" ||
  `http://localhost:3030/api`;
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
