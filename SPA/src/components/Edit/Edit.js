import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContexts } from "../../contexts/authContext";

import { ctxValidation } from "../../helpers/form-validate";
import { getOwnerData, updateOrder } from "../../services/owner";
import { images } from "../../helpers/images";

import { getData } from "../../services/server";
import Form from "../Form/Form";


const Edit = ({ title, name }) => {
  const { user } = useContext(AuthContexts);
  const [comics, setComics] = useState({});
  const [value, setValue] = useState({});
  const [errors, setErrors] = useState({});
  const [serverError, setServerErr] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    let currentRequest;
    if (name === "buy") {
      currentRequest = getData(id);
    } else {
      currentRequest = getOwnerData(id);
    }
    currentRequest.then((result) => {
      setComics(result);
      setValue({
        title: result.title || "",
        author: result.author || "",
        email: result.email || "",
        address: result.address || "",
        courier: result.courier || "",
        number: result.number || "",
        payment: result.payment || "",
      });
    });
  }, [id, name]);

  useEffect(() => {
    if (serverError.length > 0) {
      const timer = setTimeout(() => {
        setServerErr([]);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [serverError]);

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

  const isNumber = (e) => {
    let number = Number(e.target.value);

    setErrors((state) => ({
      ...state,
      [e.target.name]: number <= 0,
    }));
  };

  const navigation = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    const { title, author, email, address, courier, number, payment } = value;
    console.log(title, author, email, address, courier, number, payment);
    const ctx = {
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      address: address.trim(),
      courier: courier.toLowerCase().trim(),
      number: Number(number),
      payment,
    };

    try {
      ctxValidation(ctx);
      await updateOrder(ctx, comics._id, user.accessToken);

      navigation("/my-orders");
    } catch (err) {
      console.log(err);
      setServerErr(err.message);
    }
  };
  return (
    <Form
    title={title}
    pic={images[1]}
    formHandler={formHandler}
    changeHendler={changeHendler}
    minLength={minLength}
    value={value}
    errors={errors}
    serverError={serverError}
    isNumber={isNumber}
  />
  );
};
export default Edit;
