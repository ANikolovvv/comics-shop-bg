import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as requests from "../../services/server";
import Paginate from "./Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Catalog.module.css";
import { Search } from "./Search/Search";

const Catalog = ({comics}) => {
    console.log('ff',comics)
  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let data = await requests.getAll();
        //let data =undefined
        if (data !== undefined) {
   
          setCurrentData(true);
          setCurrentItems(data);
        }
      } catch (error) {}
    })();
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user, "user");
  const searchHendler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = Object.fromEntries(formData);

    try {
      let result = await requests.searchData(search);
      console.log(result, "seeeeee");

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
          {user !== null && (
            <Link to={"/create"} className={styles["click"]}>
              Click here!
            </Link>
          )}
          {user == null && (
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