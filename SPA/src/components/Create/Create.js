import { useNavigate } from "react-router-dom";
import AuthContexts from "../../contexts/authContext";
import * as requests from "../../services/server";
import { useContext } from "react";
import styles from "./Create.module.css";
const Create = () => {
  const navigation = useNavigate();
  const [user, setContext] = useContext(AuthContexts);
  console.log(user, setContext, "create");

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
    //let id = "62b82a5505e28156da0e2270";
    //let result=requests.updateOrder(ctx,id,token) //edit order
    // requests.deleteOrder(id, token); //edit order
    // requests.createOrder(ctx, token).then((result) => {
    //   console.log(result, "create dadaadad");

    // });
  
    try {
      let token = JSON.parse(localStorage.getItem("user"))
      await requests.createOrder(ctx, token.accessToken);
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
          <h2>Order your comics book!</h2>
          <i
            className={styles["icon ion-ios-ionic-outline"]}
            aria-hidden="true"
          ></i>
          <img
            className="icon"
            src="https://www.comicbasics.com/wp-content/uploads/2019/05/Best-DC-Stories.jpg"
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
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="author"
                placeholder="Author: Bob Kane"
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                name="email"
                placeholder="Email: ivan@abv.bg"
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="address"
                placeholder="Address: Town and Street "
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="text"></label>
              <input
                type="text"
                className={styles["inputFields"]}
                name="courier"
                placeholder="Courier service: Econt, Speedy "
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="number"></label>
              <input
                type="number"
                className={styles["inputFields"]}
                name="number"
                placeholder="Number: 1, 2, 3 "
                defaultValue="1"
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
                Order
              </button>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default Create;
