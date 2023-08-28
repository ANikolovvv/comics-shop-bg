import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";

import Paginate from "./Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";

import styles from "./Catalog.module.css";
import { Search } from "./Search/Search";
import { filteredData } from "../../helpers/filter";

const Catalog = ({ comics }) => {
  const { user } = useContext(AuthContexts);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);

  const [searchError, setSearchError] = useState("");
  const [searchData, setSearch] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  let data = [];

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

  useEffect(() => {
    if (searchError.length > 0) {
      const timer = setTimeout(() => {
        setSearchError("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchError]);

  const searchHendler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = Object.fromEntries(formData);

    try {
      if (!searchData) {
        data = filteredData(currentItems, search, selectedAuthors);
        setSearch(true);
        setSelectedAuthors([]);
      } else {
        data = filteredData(comics, search, selectedAuthors);
      }
      setCurrentItems(data);
    } catch (error) {
      setSearchError(error.message);
    }
  };
  return (
    <div className={styles["box"]}>
      <div className={styles["box__title"]}>
        <h1>Catalog</h1>
      </div>
      {comics.length === 0 && <Spinner />}
      <div className={styles["div_error"]}>
        {searchError && (
          <span className={styles.span_error}>{searchError}</span>
        )}
      </div>
      <Search
        onSubmit={searchHendler}
        comics={comics}
        error={searchError}
        updateParentState={updateParentState}
        setSearch={setSearch}
        authors={setSelectedAuthors}
        selectedAuthors={selectedAuthors}
      />
      {comics.length !== 0 && (
        <div className={styles["container"]}>
          {searchData && currentItems.length === 0 && (
            <div className={styles["div_error"]}>
              <span className={styles.span_error}>
                Comics not found with this filters!
              </span>
            </div>
          )}
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
      )}
    </div>
  );
};

export default Catalog;
