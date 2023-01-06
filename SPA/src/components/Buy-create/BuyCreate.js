import { useNavigate, useParams } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";
import * as requests from "../../services/server";
import { useState, useEffect, useContext } from "react";

import styles from "../Create/Create.module.css";

import { Errors } from "../Erorrs/Errors";
import { ctxValidation } from "../../helpers/Form-Validate";
import { createOrder } from "../../services/owner";

const Buy = () => {
  const navigation = useNavigate();
  const { user } = useContext(AuthContexts);
  const [errors, setErrors] = useState({});

  const [serverError, setServerErr] = useState([]);
  const [value, setValue] = useState({});

  let { id } = useParams();
  useEffect(() => {
    requests.getData(id).then((result) => {
      if (result) {
        setValue({
          title: result.title,
          author: result.author,
          email: "",
          address: "",
          courier: "",
          number: "",
          payment: "cash-delivery",
          price: result.price,
        });
      }
    });
  }, [id]);

  const changeHendler = (e) => {
    setValue((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const minLength = (e, length) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: value[e.target.name].length < length,
    }));
  };
  const isNumber = (e) => {
    let number = Number(e.target.value);

    setErrors((state) => ({
      ...state,
      [e.target.name]: number <= 0,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const { title, author, email, address, courier, number, payment, price } =
      value;

    const ctx = {
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      address: address.trim(),
      courier: courier.toLowerCase().trim(),
      number: Number(number),
      price: Number(price),
      payment,
    };

    try {
      ctxValidation(ctx);

      await createOrder(ctx, user.accessToken);
      navigation("/my-orders");
    } catch (err) {
      setServerErr(err.message);
      console.log(err.message, "err.mesasa");
    }
  };

  return (
    <>
      <article className={styles["art"]}>
        <h1>You can order comics which we don't have in our catalog</h1>
      </article>
      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <div className={styles["title"]}>
            <h2>Order your comics book!</h2>
          </div>
          <div className={styles["image-box"]}>
            <i
              className={styles["icon ion-ios-ionic-outline"]}
              aria-hidden="true"
            ></i>
            <img
              className={styles["icon"]}
              src="https://keithroysdon.files.wordpress.com/2012/10/clark-kent-reporter.jpg?w=625"
              alt="LOGO"
            ></img>
          </div>
        </div>
        <form
          method="POST"
          className={styles["signupForm"]}
          onSubmit={formHandler}
        >
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="text">
                <i className="fa-sharp fa-solid fa-t"></i> Title
              </label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="title"
                placeholder="Title: Batman"
                value={value.title || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 3)}
              />
              {errors.title && (
                <p className={styles["error-form"]}>
                  Title should be at least 3 characters long!
                </p>
              )}
            </li>

            <li>
              <label htmlFor="text">
                {" "}
                <i className="fa-solid fa-font"></i> Author
              </label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="author"
                placeholder="Author: Bob Kane"
                value={value.author || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 3)}
              />
              {errors.author && (
                <p className={styles["error-form"]}>
                  Author should be at least 3 characters long!
                </p>
              )}
            </li>

            <li>
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i> Email
              </label>
              <input
                type="email"
                className={styles["inputFields"]}
                name="email"
                placeholder="Email: ivan@abv.bg"
                value={value.email || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 8)}
              />
              {errors.email && (
                <p className={styles["error-form"]}>
                  Email is not valid - valid email red@abv.bg!
                </p>
              )}
            </li>

            <li>
              <label htmlFor="text">
                <i className="fa-solid fa-font"></i> Address
              </label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="address"
                placeholder="Address: Town and Street "
                value={value.address || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 10)}
              />
              {errors.address && (
                <p className={styles["error-form"]}>
                  Address should be at least 10 characters long!
                </p>
              )}
            </li>

            <li>
              <label htmlFor="text">
                <i className="fa-solid fa-truck"></i> Courier
              </label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="courier"
                placeholder="Courier service: Econt, Speedy "
                value={value.courier || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 4)}
              />
              {errors.courier && (
                <p className={styles["error-form"]}>
                  Courier should be at least 4 characters long!
                </p>
              )}
            </li>

            <li>
              <label htmlFor="number">
                <i className="fa-solid fa-arrow-up-1-9"></i> Number
              </label>
              <input
                type="number"
                className={styles["inputFields"]}
                name="number"
                placeholder="Number: 1, 2, 3 "
                value={value.number || ""}
                onChange={changeHendler}
                onBlur={isNumber}
              />
              {errors.number && (
                <p className={styles["error-form"]}>
                  Number should be biger then 0!
                </p>
              )}
            </li>
            <li>
              <select
                name="payment"
                className={styles["payment"]}
                value={value.payment || ""}
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
      {serverError.length > 0 && <Errors error={serverError}></Errors>}
    </>
  );
};

export default Buy;
