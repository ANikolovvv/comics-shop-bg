import styles from "./Search.module.css";

export const Search = (search) => {
  return (
    <form
      className={styles["search"]}
      action=""
      method="POST"
      onSubmit={search.onSubmit}
    >
      <input
        className={styles["input"]}
        type="search"
        name="search"
        placeholder="Search comics by author or title."
        required
      />
      <button className={styles["btn"]} type="submit">
        Search
      </button>
    </form>
  );
};
