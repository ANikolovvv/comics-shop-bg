import { images } from "../../helpers/images";
import AuthForm from "./authForm";


const Login = () => {
  return <AuthForm title={"Login"} pic={images[0]} to={"/register"} />;
};
export default Login;
