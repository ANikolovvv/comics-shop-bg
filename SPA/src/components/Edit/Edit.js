import { useNavigate, useParams } from "react-router-dom";
import * as requests from "../../services/server";
import { useState, useEffect } from "react";

import styles from "./Edit.module.css";

export const Edit = () => {
  const [comics, setComics] = useState({});
  const [value, setValue] = useState({});
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

  const navigation = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    const { title, author, email, address, courier, number, payment } = value;

    const ctx = {
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      address: address.trim(),
      courier: courier.trim(),
      number: Number(number),
      payment,
    };

    try {
      let token = JSON.parse(localStorage.getItem("user"));
      console.log(ctx.title, token);
      await requests.updateOrder(ctx, comics._id, token.accessToken);
      navigation("/my-orders");
    } catch (err) {
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
                value={value.title}
                onChange={changeHendler}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="author"
                placeholder="Author: Bob Kane"
                value={value.author}
                onChange={changeHendler}
              />
            </li>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                name="email"
                placeholder="Email: ivan@abv.bg"
                value={value.email}
                onChange={changeHendler}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="address"
                placeholder="Address: Town and Street "
                value={value.address}
                onChange={changeHendler}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="courier"
                placeholder="Courier service: Econt, Speedy "
                value={value.courier}
                onChange={changeHendler}
              />
            </li>
            <li>
              <label htmlFor="number"></label>
              <input
                type="number"
                className={styles["inputFields"]}
                name="number"
                placeholder="Number: 1, 2, 3 "
                value={value.number}
                onChange={changeHendler}
              />
            </li>

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
            <li>
              <button
                className={styles["btn"]}
                type="submit"
              >
                Update your order
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};
