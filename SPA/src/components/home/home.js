import { useEffect, useState } from "react";

import styles from "./home.module.scss";
import TopFive from "./topFive";
import Spinner from "../../elements/spinner";
import Page from "../../elements/page";

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
    <Page className={styles["page"]}>
      <h1 >
        Discover the Best Comics of 2023 at comics-shop.bg
      </h1>
      {comics.length !== 0 ? (
        <TopFive info={comics[count]} />
      ) : (
        <div className={styles["spinner__box"]}>
          <Spinner />
        </div>
      )}

      <div className={styles["art__info"]}>
        <p>
          "Discover the world of comics with comics-shop.bg – your gateway to a
          diverse collection of online comic books. Immerse yourself in a
          treasure trove of captivating narratives from various countries. If
          you stumble upon a comic that's not currently available, worry not –
          you have the power to request it. We offer the flexibility to modify
          or cancel your online order anytime within the first five business
          days after placing it, ensuring your satisfaction is our priority."
        </p>
      </div>
    </Page>
  );
}
export default Home;
