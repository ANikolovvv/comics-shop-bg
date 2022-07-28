import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContexts } from "../../contexts/AuthContext";
import * as requests from "../../services/server";

import Paginate from "./Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Catalog.module.css";
import { Search } from "./Search/Search";

const Catalog = ({ comics }) => {
  const { user } = useContext(AuthContexts);

  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);

  useEffect(() => {
    if (comics !== undefined) {
      setCurrentItems(comics);
      setCurrentData(true);
    }
  }, [comics]);
   console.log(user,'sere')


  const searchHendler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = Object.fromEntries(formData);

    try {
      let result = await requests.searchData(search);

      if (result !== undefined) {
        setCurrentData(true);
        if (result.length > 0) {
          setCurrentItems(result);
        } else {
          setCurrentItems([]);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
    e.target.reset();
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>Catalog</h1>
      </article>
      {currentdata === false && <Spinner />}
      <Search onSubmit={searchHendler}></Search>
      {currentItems.length > 0 && (
        <section className="">
          <Paginate data={currentItems}></Paginate>
        </section>
      )}
      {currentItems.length === 0 && currentdata === true && (
        <div className={styles["link"]}>
          <h1>Make your first order</h1>
          {user.email  ? (
            <Link to={"/create"} className={styles["click"]}>
              Click here!
            </Link>
          ):
           (
            <Link to={"/login"} className={styles["click"]}>
              Click to login !
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Catalog;
