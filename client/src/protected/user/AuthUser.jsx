import { Navigate } from "react-router-dom";
import store from "../../redux/store";
import { setLogin } from "../../redux/userSlice";

export default function AuthUser({ children }) {
  const token = localStorage.getItem("userToken");

  if (token) {
    store.dispatch(
      setLogin({
        userToken: token,
      })
    );
    return <Navigate to={"/"} />;
  }

  return children;
}
