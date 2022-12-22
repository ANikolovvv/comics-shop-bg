import { useEffect, useState } from "react";

const useFetch = (defautValue) => {
  const url =
    "https://comics-shop-bg.onrender.com/api";
  const [data, setData] = useState(defautValue);

  useEffect(() => {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     if (result !== undefined) {
    //       setData(result);
    //     }
    //   });
     const dataFetch=async()=>{
      const data=await(await fetch(url)).json();
      setData(data)
     };
     dataFetch();
  }, [url]);
  return [data];
};
export default useFetch;
