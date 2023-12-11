import { useState, useEffect } from "react";
import styles from "./catalog.module.scss";
import { AiOutlineUp } from "react-icons/ai";

import Paginate from "./paginate";
import Search from "./search/search";

import Page from "../../elements/page";
import Spinner from "../../elements/spinner";

const Catalog = ({ comics }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [searchData, setSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);

  useEffect(() => {
    if (comics !== undefined) {
      setCurrentItems(comics);
      setSearch(false);
    }
  }, [comics]);

  const scrollToTop = () => {
    setIsScrollingToTop(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300 && !isScrollingToTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollingToTop]);

  useEffect(() => {
    const handleScrollToTopComplete = () => {
      setIsScrollingToTop(false);
    };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300 && !isScrollingToTop);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollToTopComplete);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollToTopComplete);
    };
  }, [isScrollingToTop]);

  return (
    <Page className={styles["calalog__page"]}>
      <button
        onClick={scrollToTop}
        style={{ display: isVisible ? "flex" : "none" }}
        className={styles["btn__up"]}
      >
        <AiOutlineUp />
      </button>
      <Search
        comics={comics}
        updateParentState={setCurrentItems}
        setSearch={setSearch}
      />
      <div className={styles["cards"]}>
        {currentItems.length !== 0 && <Paginate data={currentItems} />}
        {currentItems.length === 0 && searchData && <h1>No comics found!</h1>}
        {currentItems.length === 0 && !searchData && <Spinner />}
      </div>
    </Page>
  );
};

export default Catalog;
