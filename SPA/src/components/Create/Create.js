import { useNavigate } from "react-router-dom";
import { AuthContexts } from "../../contexts/authContext";
import { useState, useContext } from "react";

import { ctxValidation } from "../../helpers/form-validate";
import { createOrder } from "../../services/owner";

import { useEffect } from "react";
import { images } from "../../helpers/images";
import Form from "../Form/Form";

const Create = () => {
  const navigation = useNavigate();
  const { user } = useContext(AuthContexts);
  const [errors, setErrors] = useState({});
  const [serverError, setServerErr] = useState([]);

  const [value, setValue] = useState({
    title: "",
    author: "",
    email: "",
    address: "",
    courier: "",
    number: "",
    payment: "cash-delivery",
  });

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
    console.log(e.target.name, length);
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

  const formHandler = async (e) => {
    e.preventDefault();
    const { title, author, email, address, courier, number, payment } = value;

    const ctx = {
      title: title.trim(),
      author: author.trim(),
      email: email.trim(),
      address: address.trim(),
      courier: courier.trim(),
      number: Number(number),
      payment,
    };

    try {
      ctxValidation(ctx);
      await createOrder(ctx, user.accessToken);

      navigation("/my-orders");
    } catch (err) {
      setServerErr(err.message);
    }
  };

  return (
    <Form
      title={"Create"}
      pic={images[0]}
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

export default Create;
