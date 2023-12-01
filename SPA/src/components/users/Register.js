
import { images } from "../../helpers/images";
import AuthForm from "./authForm";

const Register = () => {
  return <AuthForm title={"Register"} pic={images[1]} to={"/login"} />;
};
export default Register;
