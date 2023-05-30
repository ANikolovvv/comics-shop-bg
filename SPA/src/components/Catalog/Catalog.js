import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";

import Paginate from "./Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Catalog.module.css";
import { Search } from "./Search/Search";
import { Filter } from "../../helpers/Filter";

const Catalog = ({ comics }) => {
  const { user } = useContext(AuthContexts);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchData, setSearch] = useState(false);

  const updateParentState = (newValue) => {
    setCurrentItems(newValue);
  };

  useEffect(() => {
    if (comics !== undefined) {
      setCurrentItems(comics);
      setCurrentData(true);
      setSearch(false);
    }
  }, [comics]);

  const searchHendler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = Object.fromEntries(formData);
    const { minPrice, maxPrice, minYear, maxYear, author } = search;

    try {
      if (
        (minPrice < 1 && minPrice !== "") ||
        (minPrice > 50 && minPrice !== "")
      ) {
        throw new Error("The price should not be less 1 and bigger then 50!");
      }
      if (
        (maxPrice > 50 && maxPrice !== "") ||
        (maxPrice < 1 && maxPrice !== "")
      ) {
        throw new Error(
          "The price should not be more then 50 and smoller then 1!"
        );
      }
      if (
        (minYear < 1941 && minYear !== "") ||
        (minYear > 2005 && minYear !== "")
      ) {
        throw new Error("The year must be after 1940 and before 2006!");
      }
      if (
        (maxYear > 2005 && maxYear !== "") ||
        (maxYear < 1941 && maxYear !== "")
      ) {
        throw new Error("The year must be before 2006 and after 1941!");
      }
      let data = [];
      if (!searchData) {
        data = Filter(currentItems, search);
        setSearch(true);
      } else {
        data = Filter(comics, search);
      }
      console.log(data,'zsdsffsdfsdfsdsfdsdf')
      
      setCurrentItems(data);
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
          comics={comics}
          error={searchError}
          updateParentState={updateParentState}
          setSearch={setSearch}
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
