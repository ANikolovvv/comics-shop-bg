import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import * as requests from "../../services/server";

import { MyCard } from "./MyCard/MyCard";
import { Spinner } from "../Spinner/Spinner";

import styles from "./MyOrder.module.css";
import useOwnerApi from "../../hooks/useOwnerApi";

export const MyOrder = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentdata, setCurrentData] = useState(false);
  const[createOrder,deleteOrder]=useOwnerApi();

  console.log(createOrder,)
  let token = JSON.parse(localStorage.getItem("user")).accessToken;
  // let token = JSON.parse(localStorage.getItem("user"));
  console.log(token, "token");
  useEffect(() => {
    (async () => {
      try {
        let token = JSON.parse(localStorage.getItem("user"));
        let data = await requests.getMyData(token._id);

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
  }, []);

  const deleteHandller = async (item) => {
    const id = item._id;

    let updateMyData = currentItems.filter((x) => x._id !== id);
    console.log("data", updateMyData);
    try {
      //await requests.deleteOrder(id, token);
      await deleteOrder(id,token)
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
