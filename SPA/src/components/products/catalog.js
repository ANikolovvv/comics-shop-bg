import { useState, useEffect } from "react";
import styles from "./catalog.module.scss";

import Paginate from "./paginate";

import { filteredData } from "../../helpers/filter";
import Search from "./search/search";
import Spinner from "../../elements/spinner";
import Page from "../../elements/page";

const Catalog = ({ comics }) => {
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

    if (!searchData) {
      data = filteredData(currentItems, search, selectedAuthors);
      setSearch(true);
      setSelectedAuthors([]);
    } else {
      data = filteredData(comics, search, selectedAuthors);
    }
    setCurrentItems(data);
  };
  return (
    <Page className={styles["calalog__page"]}>
      <Search
        onSubmit={searchHendler}
        comics={comics}
        error={searchError}
        updateParentState={updateParentState}
        setSearch={setSearch}
        authors={setSelectedAuthors}
        selectedAuthors={selectedAuthors}
      />

      {currentItems.length !== 0 && <Paginate data={currentItems} />}
    </Page>
  );
};

export default Catalog;
