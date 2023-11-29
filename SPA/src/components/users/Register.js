
import { images } from "../../helpers/images";
import AuthForm from "./AuthForm";

const Register = () => {
  return <AuthForm title={"Register"} pic={images[1]} to={"/login"} />;
};
export default Register;
