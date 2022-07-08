import { Link, useNavigate } from "react-router-dom";
import AuthContexts from "../../contexts/authContext";
import * as server from "../../services/server";
import { useContext, useState } from "react";
import "./Register.css";

const Register = () => {
  const navigation = useNavigate();
  const [user, setContext] = useContext(AuthContexts);
  const [err, setError] = useState([]);

  console.log(user);

  const formHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //console.log(formData);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("rePass").trim();
    const ctx = { email, password, rePass };
    const regex = new RegExp(/^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]+$/);
    const match = email.match(regex);
    console.log(match, "match");

    try {
      if (match === null) {
        throw new Error("Invalid email!");
      }
      if (password !== rePass) {
        throw new Error("Password dont match !");
      }
      await server.regUsers(ctx);
      setContext(ctx);
      navigation("/catalog");
    } catch (error) {
      setError(error.message);
      //setError(err);
      e.target.reset();
    }
  };
  return (
    <>
      <article className="art">
        <h1>Sing Up</h1>
        {err.length > 0 ? <h1>{err}</h1> : ""}
      </article>

      <div className="signupSection">
        <div className="info-form">
          <h2>Sign Up Form.</h2>
          <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
          <img
            className="icon"
            src="https://i.pinimg.com/236x/9f/fa/6e/9ffa6ed06be1f65082360d42461c86b7.jpg"
            alt="..."
          ></img>
        </div>
        <form
          action="#"
          method="POST"
          className="signupForm"
          onSubmit={formHandler}
        >
          <ul className="noBullet">
            <li>
              <label htmlFor="email"></label>
              <input
                type="email"
                className="inputFields"
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
                className="inputFields"
                id="password"
                name="password"
                placeholder="Password"
                defaultValue=""
              />
            </li>
            <li>
              <label htmlFor="password"></label>
              <input
                type="password"
                className="inputFields"
                id="rePass"
                name="rePass"
                placeholder="Confirm password"
                defaultValue=""
              />
            </li>
            <li id="center-btn">
              <button
                type="submit"
                id="join-btn"
                name="join"
                alt=""
                defaultValue=""
              >
              
                Register
              </button>
            </li>
            <Link className="link-form" to="/login">
              Login to your account!
            </Link>
          </ul>
        </form>
      </div>
    </>
  );
};
export default Register;
