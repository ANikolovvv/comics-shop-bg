import styles from "./Li.module.css";

const Li = ({
  children,
  type,
  name,
  value,
  message,
  minLength,
  onChange,
  icon,
  isNumber,
}) => {
  
  return (
    <li className={styles["box__li"]}>
      <label htmlFor={type}>
        <i className={icon}></i> {children}
      </label>
      <input
        type={type}
        className={styles["inputFields"]}
        name={name}
        placeholder={children}
        value={value}
        onChange={onChange}
        onBlur={isNumber ? isNumber : (e) => minLength(e, message[2])}
      />
      {message[0] && <p className={styles["error-form"]}>{message[1]}</p>}
    </li>
  );
};
export default Li;
