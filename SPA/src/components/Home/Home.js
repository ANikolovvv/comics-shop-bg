import { useEffect, useState } from "react";

import * as requests from "../../services/server";
import "../Home/Home.css";
import { Spinner } from "../Spinner/Spinner";
import { Top } from "./TopFive";
//import { Top } from "./TopFive";

function Home() {
  const [comics, setGames] = useState([]);
  const [count, setCount] = useState(0);

  //let monthRaiting=top.slice(0,5);

  console.log(comics, " top reiting");

  // let id = "62b82a5505e28156da0e2270";
  //   requests.getData(id).then((res)=>{
  //     console.log(res,'dataaaaaa')
  //  });//get data work

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
      <article className="art">
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
