import { Navigate } from "react-router-dom";

const ProtectedRouteElement = (props) => {
  if (props.dataLoaded) {
    return props.isLoggedIn ? props.element : <Navigate to='/' replace />;
  }
};

export default ProtectedRouteElement;
