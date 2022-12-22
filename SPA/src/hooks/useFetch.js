import { useEffect, useState } from "react";

const useFetch = (defautValue) => {
  const url =  'https://comics-shop-bg.onrender.com/api' ||`http://localhost:3030/api` ;
  const [data, setData] = useState(defautValue);

  useEffect(() => {
    setTimeout(()=>{
      fetch(url)
      .then((res) => res.json())
      .then((result) => {
        if (result !== undefined) {
          setData(result);
        }
      });
    },1000)
    
  }, [url]);
  return [data];
};
export default useFetch;
