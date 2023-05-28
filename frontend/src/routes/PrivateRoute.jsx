import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isUserPresent = useSelector((state) => state.authReducer.isAuth);
  if (!isUserPresent)
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname, name: "sahnwaz" }}
        replace
      />
    );
  return children;
};

export default PrivateRoute;
