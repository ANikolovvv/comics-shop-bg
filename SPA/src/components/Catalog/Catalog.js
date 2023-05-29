import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";
import * as requests from "../../services/server";

import Paginate from "./Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Catalog.module.css";
import { Search } from "./Search/Search";

const Catalog = ({ comics }) => {
  const { user } = useContext(AuthContexts);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (comics !== undefined) {
      setCurrentItems(comics);
      setCurrentData(true);
    }
  }, [comics]);

  const searchHendler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = Object.fromEntries(formData);
    const { minPrice, maxPrice, minYear, maxYear, author } = search;

    try {
      if ((minPrice < 1 && minPrice !== "") || minPrice > 50) {
        throw new Error("The price should not be less 1 and bigger then 50!");
      }
      if ((maxPrice > 50 && maxPrice !== "") || maxPrice < 1) {
        throw new Error(
          "The price should not be more then 50 and smoller then 1!"
        );
      }
      if ((minYear > 1941 && minYear !== "") || minYear > 2005) {
        throw new Error("The year must be after 1940 and before 2006!");
      }
      if ((maxYear > 2005 && maxYear !== "") || maxYear < 1941) {
        throw new Error("The year must be before 2006 and after 1941!");
      }
      const collection = currentItems.filter((item) => {
        return (
          (minPrice === "" || item.price >= minPrice) &&
          (maxPrice === "" || item.price <= maxPrice) &&
          (minYear === "" || item.year >= minYear) &&
          (maxYear === "" || item.year <= maxYear) &&
          (author === "" || item.author === author)
        );
      });
      console.log(collection);
      e.target.reset();
    } catch (error) {
      setSearchError(error.message);
    }
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>Catalog</h1>
      </article>
      <div className={styles["container"]}>
        {currentdata === false && <Spinner />}
        {/* {user.email && <Search onSubmit={searchHendler}></Search>} */}
        <Search
          onSubmit={searchHendler}
          comics={currentItems}
          error={searchError}
        />

        {currentItems.length > 0 && (
          <div className="cards">
            <Paginate data={currentItems}></Paginate>
          </div>
        )}
        {currentItems.length === 0 && currentdata === true && user.email && (
          <div className={styles["link"]}>
            <h1>Make your first order !</h1>
            {user.email ? (
              <Link to={"/create"} className={styles["click"]}>
                Click here!
              </Link>
            ) : (
              <Link to={"/login"} className={styles["click"]}>
                Click to login !
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Catalog;
