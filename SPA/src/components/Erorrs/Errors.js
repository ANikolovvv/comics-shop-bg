import styles from "./Errors.module.css";

export const Errors = (arr) => {
    const{error}=arr
    console.log(error,'errarr')
  return (
    <>
      <div className={styles["error"]}>
        
        <p className={styles["p-error"]}>{error}</p>
      </div>
    </>
  );
};
