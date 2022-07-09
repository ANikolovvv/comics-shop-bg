import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import * as requests from "../../services/server";
import Paginate from "../Pagination/Paginate";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Catalog.module.css"


const Catalog = () => {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let data = await requests.getAll();
        if (data !== undefined) {
          setCurrentItems(data);
          console.log("reqds2");
        }
      } catch (error) {}
    })();
  }, []);

  let top = currentItems;

  return (
    <>
      <article className={styles["art"]}>
        <h1>Catalog</h1>
      </article>
      {top.length > 0 ? (
        <section className=''>
          <Paginate data={top}></Paginate>
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Catalog;
