import { useNavigate, useParams } from "react-router-dom";
import * as requests from "../../services/server";
import { useState, useEffect } from "react";

import styles from "./Edit.module.css";

export const Edit = () => {
  const [comic, setComic] = useState({});
  let { id } = useParams();
  useEffect(() => {
    requests.getOwnerData(id).then((result) => {
      console.log(result, "result");
      setComic(result);
    });
  }, [id]);

  const navigation = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const title = formData.get("title").trim();
    const author = formData.get("author").trim();
    const email = formData.get("email").trim();
    const address = formData.get("address").trim();
    const courier = formData.get("courier").trim();
    const number = Number(formData.get("number"));
    const payment = formData.get("payment").trim();
    const ctx = { title, author, email, address, courier, number, payment };

    try {
      let token = JSON.parse(localStorage.getItem("user"));
      console.log(ctx.title, token);
      await requests.updateOrder(ctx, comic._id, token.accessToken);
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
                defaultValue={comic.title}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="author"
                placeholder="Author: Bob Kane"
                defaultValue={comic.author}
              />
            </li>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                name="email"
                placeholder="Email: ivan@abv.bg"
                defaultValue={comic.email}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="address"
                placeholder="Address: Town and Street "
                defaultValue={comic.address}
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="courier"
                placeholder="Courier service: Econt, Speedy "
                defaultValue={comic.courier}
              />
            </li>
            <li>
              <label htmlFor="number"></label>
              <input
                type="number"
                className={styles["inputFields"]}
                name="number"
                placeholder="Number: 1, 2, 3 "
                defaultValue={comic.number}
              />
            </li>

            <select name="payment" className={styles["payment"]}>
              <option value="cash-delivery">Cash on Delivery</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
            </select>
            <li>
              <button
                className={styles["btn"]}
                type="submit"
                name="join"
                alt=""
                defaultValue="Submit"
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
