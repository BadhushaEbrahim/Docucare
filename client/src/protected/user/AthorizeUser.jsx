import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { setLogin } from "../../redux/userSlice";

export default function AuthorizeUser({ children }) {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return <Navigate to={"/"} />;
  }
  store.dispatch(
    setLogin({
      userToken: token,
    })
  );
  return children;
}
