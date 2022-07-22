import { useNavigate, useParams } from "react-router-dom";
import * as requests from "../../services/server";
import { useState, useEffect } from "react";

import styles from "./Edit.module.css";
import { Errors } from "../Erorrs/Errors";
import { ctxValidation } from "../../helpers/Form-Validate";
import useOwnerApi from "../../hooks/useOwnerApi";

export const Edit = () => {
  const [comics, setComics] = useState({});
  const [value, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const [serverError, setServerErr] = useState([]);
  const [createOrder,deleteOrder, updateOrder] = useOwnerApi();
  console.log(createOrder,deleteOrder);
  let { id } = useParams();
  useEffect(() => {
    requests.getOwnerData(id).then((result) => {
      console.log(result, "result");
      setComics(result);
      setValue({
        title: result.title,
        author: result.author,
        email: result.email,
        address: result.address,
        courier: result.courier,
        number: result.number,
        payment: result.payment,
      });
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

  const navigation = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    const { title, author, email, address, courier, number, payment } = value;

    const ctx = {
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      address: address.trim(),
      courier: courier.toLowerCase().trim(),
      number: Number(number),
      payment,
    };

    try {
      ctxValidation(ctx);
      let token = JSON.parse(localStorage.getItem("user"));

      // await requests.updateOrder(ctx, comics._id, token.accessToken);
      await updateOrder(ctx, comics._id, token.accessToken);
      navigation("/my-orders");
    } catch (err) {
      setServerErr(err.message);
      console.log(err.message);
    }
    console.log(ctx);
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>You can order comics which we don't have in our catalog</h1>
      </article>
      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <h2>Update your comics book!</h2>
          <i
            className={styles["icon ion-ios-ionic-outline"]}
            aria-hidden="true"
          ></i>
          <img
            className="icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-kxUeCxzsDEP-3hk83gJexMBWaajbosf4V5RnFy8W9ytDPHBUlKwoM2MIdmzWoZj2ZZo&usqp=CAU"
            alt="..."
          ></img>
        </div>
        <form
          action="#"
          method="POST"
          className={styles["signupForm"]}
          name="signupform"
          onSubmit={formHandler}
        >
          <ul className={["noBullet"]}>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="title"
                placeholder="Title: Batman"
                value={value.title || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 3)}
              />
            </li>
            {errors.title && (
              <p className={styles["error-form"]}>
                Title should be at least 3 characters long!
              </p>
            )}
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="author"
                placeholder="Author: Bob Kane"
                value={value.author || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 3)}
              />
            </li>
            {errors.author && (
              <p className={styles["error-form"]}>
                Author should be at least 3 characters long!
              </p>
            )}
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                name="email"
                placeholder="Email: ivan@abv.bg"
                value={value.email || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 8)}
              />
            </li>
            {errors.email && (
              <p className={styles["error-form"]}>
                Email is not valid - valid email red@abv.bg!
              </p>
            )}
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="address"
                placeholder="Address: Town and Street "
                value={value.address || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 10)}
              />
            </li>
            {errors.address && (
              <p className={styles["error-form"]}>
                Address should be at least 10 characters long!
              </p>
            )}
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="courier"
                placeholder="Courier service: Econt, Speedy "
                value={value.courier || ""}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 4)}
              />
            </li>
            {errors.courier && (
              <p className={styles["error-form"]}>
                Courier should be at least 4 characters long!
              </p>
            )}
            <li>
              <label htmlFor="number"></label>
              <input
                type="number"
                className={styles["inputFields"]}
                name="number"
                placeholder="Number: 1, 2, 3 "
                value={value.number || ""}
                onChange={changeHendler}
                onBlur={isNumber}
              />
            </li>
            {errors.number && (
              <p className={styles["error-form"]}>
                Number should be biger then 0!
              </p>
            )}

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
            <li>
              <button className={styles["btn"]} type="submit" value="Submit">
                Update your order
              </button>
            </li>
          </ul>
        </form>
      </div>
      {serverError.length > 0 && <Errors error={serverError}></Errors>}
    </>
  );
};
