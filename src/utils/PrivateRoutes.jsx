import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Axios from "./Axios";
import { UserContext } from "./UserContext";

const PrivateRoutes = () => {
  const [contextUser, _] = useContext(UserContext);
  let auth = { token: contextUser.authToken };
  Axios.defaults.headers.common = {
    Authorization: `Bearer ${contextUser.authToken}`,
  };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
