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
  }, 2000);

  return (
    <div className={styles["page"]}>
      <article className={styles["art"]}>
        <h1>Welcome to comics-shop.bg</h1>
        <h2>Best Comics of 2022 </h2>
      </article>
      {comics.length === 0 && <Spinner />}
      <div className={styles["container"]}>
        <div className={styles["right-page"]}>
          {comics.length > 0 && <Top info={comics[count]} />}
        </div>
        <div className={styles["left-page"]}>
          <div className={styles["art-info"]}>
            <i className="fa-solid fa-book"> comics-shop.bg</i>
            <p>
              "Discover the world of comics with comics-shop.bg – your gateway
              to a diverse collection of online comic books. Immerse yourself in
              a treasure trove of captivating narratives from various countries.
              If you stumble upon a comic that's not currently available, worry
              not – you have the power to request it. We offer the flexibility
              to modify or cancel your online order anytime within the first
              five business days after placing it, ensuring your satisfaction is
              our priority."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
