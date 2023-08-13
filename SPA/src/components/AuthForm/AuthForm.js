import styles from "../AuthForm/AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";

import { Errors } from "../Erorrs/Errors";
import Li from "../UI/Li/Li";
import { useContext, useEffect, useState } from "react";

import { AuthContexts } from "../../contexts/authContext";
import { errorWrapeer, matchEmail } from "../../helpers/form-validate";
import { onLogin, regUsers } from "../../services/server";

const AuthForm = ({ title, to, pic }) => {
  const navigation = useNavigate();
  const isLogin = title.includes("Login");
  console.log(isLogin);
  const { userLogin } = useContext(AuthContexts);
  const [errors, setErrors] = useState({});
  const [userErr, setUserErr] = useState([]);
  const [value, setValue] = useState({
    email: "",
    password: "",
    rePass: "",
  });
  let user;

  useEffect(() => {
    if (userErr.length > 0) {
      const timer = setTimeout(() => {
        setUserErr([]);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [userErr]);

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

  const formHandler = async (e) => {
    e.preventDefault();
    const { email, password, rePass } = value;
    let ctx = { email, password, rePass };
    try {
      let match = matchEmail(ctx.email);

      if (match === null) {
        throw new Error(
          "Email must includes @ and . - valid email (asd@sds.bg)"
        );
      }
      if (!isLogin) {
        user = await regUsers(ctx);
        errorWrapeer(ctx);
      } else {
        user = await onLogin(ctx);
      }

      if (user.message) {
        throw new Error(user.message);
      }

      userLogin(user);
      navigation("/catalog");
    } catch (error) {
      setUserErr(error.message);
      e.target.reset();
    }
  };
  return (
    <div className={styles["signupSection"]}>
      <div className={styles["image-box"]}>
        <img className={styles["icon"]} src={pic} alt="..." />
      </div>
      <form
        action="#"
        method="POST"
        className={styles["signupForm"]}
        onSubmit={formHandler}
      >
        <div className={styles["title"]}>
          <h1>{title}</h1>
        </div>
        <ul className={styles["box__li"]}>
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
            type={"password"}
            name="password"
            value={value.password || ""}
            message={[
              errors.password,
              "Password should be at least 4 characters long!",
              4,
            ]}
            minLength={minLength}
            onChange={changeHendler}
            icon={"fa-solid fa-lock"}
          >
            Password
          </Li>

          {!isLogin && (
            <Li
              type={"password"}
              name="password"
              value={value.rePass || ""}
              message={[
                errors.password,
                "Password should be at least 4 characters long!",
                4,
              ]}
              minLength={minLength}
              onChange={changeHendler}
              icon={"fa-solid fa-lock"}
            >
              Confirm password
            </Li>
          )}
          <div id="center-btn">
            <button
              type="submit"
              className={styles["join-btn"]}
              name="join"
              alt=""
            >
              {title}
            </button>
            <div className={styles["box-h1"]}>
              <h2 className={styles["click"]}>
                {title}
                <Link className={styles["link-form"]} to={to}>
                  click here!
                </Link>
              </h2>
            </div>
          </div>
        </ul>
      </form>
      {userErr.length > 0 && <Errors error={userErr}></Errors>}
    </div>
  );
};
export default AuthForm;
