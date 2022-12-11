import { useEffect, useState } from "react";

import styles from "../Home/Home.module.css";
import { Spinner } from "../Spinner/Spinner";
import { Top } from "./TopFive";

function Home({ comic }) {
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (comic !== undefined) {
      const rating = comic.sort(
        (a, b) => b.userLiked.length - a.userLiked.length
      );

      setComics(rating);
    }
  }, [comic]);
  setTimeout(() => {
    if (count < 4) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
    // count is 0 here
  }, 2000);

  return (
    <>
      <article className={styles["art"]}>
        <h1>Welcome to comics-shop.bg</h1>
        <p>Best Comics of 2022 </p>
      </article>
      <div className={styles["container"]}>
        <article className={styles["info"]}>
          {comics.length > 0 ? <Top info={comics[count]}></Top> : <Spinner />}
        </article>
        <div className={styles["home-art"]}>
          <div className={styles["art-info"]}>
            <p>
              comics-shop.bg is an app for buying online comics.Inside the app
              you can find different comics from different countries, and you
              can order a comics which we don't have in the moment.You may
              cancel and update an online order for any reason at any time up to
              the end of the fifth working day, after you place your order.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
