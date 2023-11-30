import styles from "./Form.module.css";
import Li from "../elements/Li";

const Form = ({
  title,
  pic,
  formHandler,
  minLength,
  changeHendler,
  value,
  errors,
  isNumber,
}) => {
  return (
    <div className={styles["form__container"]}>
      <div className={styles["signupSection"]}>
        <div className={styles["image-box"]}>
          <img className={styles["icon"]} src={pic} alt="...pic" />
        </div>

        <form
          method="POST"
          className={styles["signupForm"]}
          onSubmit={formHandler}
        >
          <div className={styles["title"]}>
            <h1>{title}</h1>
          </div>
          <ul className={styles["box__li"]}>
            <Li
              type={"text"}
              name="title"
              value={value.title || ""}
              message={[
                errors.title,
                "Title should be at least 3 characters long!",
                3,
              ]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-sharp fa-solid fa-t"}
            >
              Title
            </Li>

            <Li
              type={"text"}
              name="author"
              value={value.author || ""}
              message={[
                errors.author,
                "Author should be at least 3 characters long!",
                3,
              ]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-solid fa-font"}
            >
              Author
            </Li>
            <Li
              type={"email"}
              name="email"
              value={value.email || ""}
              message={[
                errors.email,
                "Email is not valid - valid email red@abv.bg!",
                8,
              ]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-solid fa-envelope"}
            >
              Email
            </Li>

            <Li
              type={"text"}
              name="address"
              value={value.address || ""}
              message={[
                errors.address,
                "Address should be at least 10 characters long!",
                10,
              ]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-solid fa-font"}
            >
              Address
            </Li>

            <Li
              type={"text"}
              name="courier"
              value={value.courier || ""}
              message={[errors.courier, "Courier should Econt or Speedy!", 4]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-solid fa-truck"}
            >
              Courier
            </Li>

            <Li
              type={"number"}
              name="number"
              value={value.number || ""}
              message={[errors.number, "Number should be biger then 0!"]}
              minLength={minLength}
              onBlur={isNumber}
              onChange={changeHendler}
              icon={"fa-solid fa-arrow-up-1-9"}
              isNumber={isNumber}
            >
              Number
            </Li>

            <li>
              <select
                name="payment"
                className={styles["payment"]}
                value={value.payment}
                onChange={changeHendler}
              >
                <option value="cash-delivery">Cash on Delivery</option>
                <option value="credit-card">Credit Card</option>
                <option value="debit-card">Debit Card</option>
              </select>
            </li>
            <li>
              <button className={styles["btn"]} type="submit">
                Order
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Form;
