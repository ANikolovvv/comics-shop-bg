import { useState, useEffect, useContext } from "react";
import { AuthContexts } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import * as requests from "../../services/owner";

import { MyCard } from "./MyCard/MyCard";
import { Spinner } from "../Spinner/Spinner";

import styles from "./MyOrder.module.css";
import { deleteOrder } from "../../services/owner";

export const MyOrder = () => {
  const { user } = useContext(AuthContexts);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let data = await requests.getMyData(user._id);

        if (data !== undefined) {
          setCurrentData(true);
          if (data.history) {
            setCurrentItems(data.history);
          } else {
            setCurrentItems(data);
          }
          console.log(data.history, "data");
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [user._id]);

  const deleteHandller = async (item) => {
    const id = item._id;

    try {
      await deleteOrder(id, user.accessToken);
      let updateMyData = currentItems.filter((x) => x._id !== id);
      setCurrentItems(updateMyData);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h1 className={styles["art"]}>My orders</h1>
      {currentdata === false && <Spinner />}
      <div className={styles["article"]}>
        {currentItems.length > 0 &&
          currentdata === true &&
          currentItems.map((x) => (
            <MyCard
              key={x._id}
              data={x}
              onClick={() => deleteHandller(x)}
            ></MyCard>
          ))}

        {currentItems.length === 0 && currentdata === true && (
          <div className={styles["link"]}>
            <h1>Make your first order</h1>
            <Link to={"/create"} className={styles["click"]}>
              Click here!
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
