import { Link, useNavigate } from "react-router-dom";
import { onLogin } from "../../services/server";
import AuthContexts from "../../contexts/authContext";
import { useContext } from "react";
import styles from "../Login/Login.module.css";

const Login = () => {
  const [user, setContext] = useContext(AuthContexts);
  console.log(user);
  const navigation = useNavigate();
  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const ctx = { email, password };
    err(ctx);
    async function err(ctx) {
      try {
        await onLogin(ctx);
        setContext(ctx);
        navigation("/catalog");
      } catch (err) {
        console.log(err);
        console.log(err.message, "err");
        navigation("/login");
      }
    }
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>Sing In</h1>
      </article>

      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <h2>Sign In Form.</h2>
          <i
            className={styles["icon ion-ios-ionic-outline"]}
            aria-hidden="true"
          ></i>
          <img
            className={styles["icon"]}
            src="https://3.bp.blogspot.com/-EYhzbgX3eqA/WNPf3EX0AlI/AAAAAAAAQR4/818HP3L1tYoq0f_pl3foqoqdhX5qHdcswCLcB/s1600/spider-read.jpg"
            alt="..."
          ></img>
        </div>
        <form
          action="#"
          method="POST"
          className={styles["signupForm"]}
          onSubmit={formHandler}
        >
          <ul className={styles["noBullet"]}>
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className={styles["inputFields"]}
                id="email"
                name="email"
                placeholder="Email: batman@red.gmail"
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="password"
                name="password"
                placeholder="Password"
                defaultValue=""
              />
            </li>
            <li id="center-btn">
              <button
                type="submit"
                className={styles["join-btn"]}
                name="join"
                alt=""
                defaultValue=""
              >
                {" "}
                Login
              </button>
            </li>
            <li>
              <h1 className={styles["click"]}>For registration - 
              <Link className={styles["link-form"]} to="/register">
              click here!
              </Link>
              </h1>
             
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};
export default Login;