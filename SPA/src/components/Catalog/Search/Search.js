import styles from "./Search.module.css";
import { useState, useRef } from "react";
import { AiOutlineDown } from "react-icons/ai";

export const Search = ({
  onSubmit,
  comics,
  updateParentState,
  setSearch,
  authors,
  selectedAuthors,
}) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [toggleSearch, setToggleSearch] = useState("");

  const formRef = useRef(null);
  const newAuthors = [...new Set(comics.map((comic) => comic.author))];

  function resetForm() {
    setPriceMin("");
    setPriceMax("");
    setYearMin("");
    setYearMax("");
    formRef.current.reset();
    updateParentState(comics);
    setSearch(false);
  }
  const handleAuthorChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    authors(selectedValues);
  };

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      <h1 className={styles["open__search"]} onClick={handleToggleSearch}>
        Search <AiOutlineDown size={18} color="blue" />{" "}
      </h1>
      {toggleSearch && (
        <div className={styles["formBox"]}>
          <form
            ref={formRef}
            action="#"
            method="POST"
            className={styles["searchForm"]}
            name="search"
            onSubmit={onSubmit}
          >
            <div className={styles["input__box"]}>
              <label>Price</label>
              <input
                name="minPrice"
                type="number"
                placeholder="Min prices 1$"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <input
                name="maxPrice"
                type="number"
                placeholder="Max price 50$"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
            <div className={styles["input__box"]}>
              <label>Authors:</label>
              <select
                multiple
                name="author"
                className={styles["authors"]}
                value={selectedAuthors}
                onChange={handleAuthorChange}
              >
                {newAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles["input__box"]}>
              <label>Year</label>
              <input
                name="minYear"
                type="number"
                placeholder="Min Year 1941"
                value={yearMin}
                onChange={(e) => setYearMin(e.target.value)}
              />
              <input
                name="maxYear"
                type="number"
                placeholder="Max Year 2005"
                value={yearMax}
                onChange={(e) => setYearMax(e.target.value)}
              />
            </div>
            <div className={styles["btns__box"]}>
              <button type="submit" value="Submit">
                Search
              </button>
              <button onClick={resetForm}>Clear Filters</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
