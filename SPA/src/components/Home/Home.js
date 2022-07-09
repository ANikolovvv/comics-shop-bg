import { useEffect, useState } from "react";

import * as requests from "../../services/server";
import styles from "../Home/Home.module.css";
import { Spinner } from "../Spinner/Spinner";
import { Top } from "./TopFive";
//import { Top } from "./TopFive";

function Home() {
  const [comics, setGames] = useState([]);
  const [count, setCount] = useState(0);

  console.log(comics, " top reiting");


  useEffect(() => {
    requests.getAll().then((result) => {
         if(result !==undefined){
          setGames(result);
         }
     
    });
  }, []);
  setTimeout(() => {
    if(count <4){
     setCount(count+1)
    }else{
     setCount(0)
    }
   // count is 0 here
 }, 2000);

   console.log('work', count)

  return (
    <>
      <article className={styles["art"]}>
        <h1>Welcome to comics-shop.bg</h1>
        <p>Best Comics of 2022 </p>
      </article>
       
      <article >
        {comics.length>0?
        <Top info={comics[count]}></Top>:<Spinner/>}
      </article>
    </>
  );
}
export default Home;
