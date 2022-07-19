import { Link, useNavigate } from "react-router-dom";
import AuthContexts from "../../contexts/authContext";
import * as server from "../../services/server";
import { useContext, useState } from "react";
import styles from "./Register.module.css";
import { errorWrapeer, matchEmail } from "../../helpers/Form-Validate";
import { Errors } from "../Erorrs/Errors";

const Register = () => {
  const navigation = useNavigate();
  const [user, setContext] = useContext(AuthContexts);
  const [errors, setErrors] = useState({});
  const [userErr, setUserErr] = useState([]);
  const [names, setNames] = useState({
    email: "",
    password: "",
    rePass: "",
  });
  console.log(user, "user");
  console.log(errors, "errr");
  const changeHendler = (e) => {
    setNames((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const minLength = (e, length) => {
    setErrors((state) => ({
      ...state,
      [e.target.name]: names[e.target.name].length < length,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const { email, password, rePass } = names;

    let ctx = { email, password, rePass };
    try {
      let match = matchEmail(ctx.email);

      if (match === null) {
        throw new Error(
          "Email must includes @ and . ()=> valid email (asd@sds.bg)"
        );
      }
      errorWrapeer(ctx);
      await server.regUsers(ctx);
      setContext(ctx);
      navigation("/catalog");
    } catch (error) {
      console.log(error.message, "error");
      setUserErr(error.message);

      e.target.reset();
    }
  };
  return (
    <>
      <article className={styles["art"]}>
        <h1>Sing Up</h1>
      </article>

      <div className={styles["signupSection"]}>
        <div className={styles["info-form"]}>
          <h2>Sign Up Form.</h2>
          <i
            className={styles["icon ion-ios-ionic-outline"]}
            aria-hidden="true"
          ></i>
          <img
            className={styles["icon"]}
            src="https://i.pinimg.com/236x/9f/fa/6e/9ffa6ed06be1f65082360d42461c86b7.jpg"
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
                value={names.email}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 8)}
              />
              {errors.email && (
                <p className={styles["error-form"]}>
                  Email should be at least 8 characters long!
                </p>
              )}
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="password"
                name="password"
                placeholder="Password"
                value={names.password}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 4)}
              />
              {errors.password && (
                <p className={styles["error-form"]}>
                  Password should be at least 4 characters long!
                </p>
              )}
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                className={styles["inputFields"]}
                id="rePass"
                name="rePass"
                placeholder="Confirm password"
                value={names.rePass}
                onChange={changeHendler}
                onBlur={(e) => minLength(e, 4)}
              />
              {errors.rePass && (
                <p className={styles["error-form"]}>
                  Confirm-pass should be at least 4 characters long!
                </p>
              )}
            </li>
            <li id="center-btn">
              <button
                type="submit"
                className={styles["join-btn"]}
                name="join"
                alt=""
              >
                Register
              </button>
            </li>
            <li>
              <h1 className={styles["click"]}>
                Login to your account-
                <Link className={styles["link-form"]} to="/login">
                  click here!
                </Link>
              </h1>
            </li>
          </ul>
        </form>
      </div>
      {userErr.length > 0 && <Errors error={userErr}></Errors>}
    </>
  );
};
export default Register;
