import styles from "./Search.module.css";

export const Search = (search) => {
  return (
    <form
      data-testid="item"
      className={styles["search"]}
      action=""
      method="POST"
      onSubmit={search.onSubmit}
    >
      <input
        className={styles["input"]}
        type="text"
        name="search"
        placeholder="Search comics by author or title."
        
      />
      <button className={styles["btn"]} type="submit">
        Search
      </button>
    </form>
  );
};
