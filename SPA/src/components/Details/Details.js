import { useState, useEffect, useId, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";

import * as requests from "../../services/server";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Details.module.css";

const Details = () => {
  const { user } = useContext(AuthContexts);
  const [comic, setComic] = useState({});
  const [currentdata, setCurrentData] = useState(false);
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);

  let { id } = useParams();
  let key = useId();

  useEffect(() => {
    requests.getData(id).then((result) => {
      if (result !== undefined) {
        setComic(result);
        setCurrentData(true);
        let num = result.userLiked.length;
        if (user !== null) {
          let userLiked = result.userLiked.includes(user._id);
          setRating(num);
          setLike(userLiked);
        }
      }
    });
  }, [id, user]);

  const likeHandler = async (e) => {
    try {
      let like = await requests.addLike(comic._id, user);
      let num = like.userLiked.length;
      setLike(true);
      setComic(like);
      setRating(num);
    } catch (error) {}
  };
  return (
    <div className={styles["details__page"]}>
      {currentdata === false && <Spinner />}

      <div className={styles["container"]}>
        <div className={styles["box-img"]}>
          <img
            src={comic.imageUrl}
            className={styles["container img"]}
            alt={comic.title}
          />
        </div>

        <div className={styles["product-details"]}>
          <h1>{comic.title}</h1>

          <div className={styles["info"]}>
         
            <ul className={styles["ul__box"]}>
              <li key={key}>
                Author: <span> {comic.author}</span>
              </li>
              <li key={`${key}-price`}>
                Price:
                <span> {comic.price}</span>
              </li>
              <li key={`${key}-date`}>
                Release data:
                <span> {comic.year}</span>
              </li>
              <li key={`${key}-raiting`}>
                Rating:
                <span> {rating}</span>
              </li>
            </ul>
          </div>

          <p className={styles["information"]}>{comic.description}</p>
          {user.email ? (
            <div className={styles["btns__box"]}>
              {like === true && <h1>You already like this comics!</h1>}
              <div className={styles["control"]}>
                <Link to={`/catalog`} className={styles["link"]}>
                  Back
                </Link>
                <Link
                  to={`/buy-create/${comic._id}`}
                  className={styles["link"]}
                >
                  Buy
                </Link>
                {like === false && (
                  <button className={styles["link"]} onClick={likeHandler}>
                    Like
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles["control"]}>
              <Link to={`/catalog`} className={styles["link"]}>
                Back
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Details;
