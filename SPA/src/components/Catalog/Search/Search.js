import styles from "./Search.module.css";
import { useState, useRef } from "react";

export const Search = ({ onSubmit, comics, error }) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const formRef = useRef(null);

  function resetForm() {
    setPriceMin("");
    setPriceMax("");
    setYearMin("");
    setYearMax("");
    formRef.current.reset();
  }
  return (
    <div className={styles["formBox"]}>
      <form
        ref={formRef}
        action="#"
        method="POST"
        className={styles["searchForm"]}
        name="search"
        onSubmit={onSubmit}
      >
        <div>
          <label>Price Range:</label>
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
        <div>
          <label>Authors:</label>
          <select name="author" className={styles["authors"]}>
            <option key="123%" value="">
              Select an author
            </option>
            {comics.map((comic) => (
              <option key={comic.id} value={comic.author}>
                {comic.author}
              </option>
            ))}
          </select>
          {error.length > 0 && <span>{error}</span>}
        </div>
        <div>
          <label>Year Range:</label>
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
        <button type="submit" value="Submit">
          Search
        </button>
        <button onClick={resetForm}>Clear Filters</button>
      </form>
    </div>
  );
};
