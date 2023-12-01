import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import logo from "../../logo.svg";
import styles from "./header.module.scss";
import Navigation from "./navigation";

import NavBar from "./navBar";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const navigationHandler = () => {
    setToggle(!toggle);
  };

  return (
    <header>
      <nav className={styles["container"]}>
        <div className={styles["logo"]}>
          <img src={logo} className={styles["logo__img"]} alt="LOGO"></img>
        </div>

        <div className={styles["nav__small"]} onClick={navigationHandler}>
          {toggle ? (
            <div className={styles["small"]}>
              <AiOutlineClose size={25}  className={styles["icon"]} />
              <Navigation />
            </div>
          ) : (
            <div className={styles["small"]}>
              <AiOutlineMenu size={25}  className={styles["icon"]}/>
            </div>
          )}
        </div>
        <NavBar className={"box__ul"} classNameLinkBox={"box__link"} />
      </nav>
    </header>
  );
};
export default Header;
