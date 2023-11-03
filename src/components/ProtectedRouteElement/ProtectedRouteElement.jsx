import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../../coockie";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({ onlyUnAuth, children, previousPathname }) => {
  const location = useLocation();

  const isAuthChecked = true;
  const accessToken = getCookie("token");
  const navigate = useNavigate();

 

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }
  if (onlyUnAuth && accessToken) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !accessToken) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

//   if(onlyUnAuth){
//     if (previousPathname === "/forgot") {
//         return <Navigate to="/password-reset" />;
//     }else{
//         return <Navigate to="/forgot" />;
//     }
//   }

  return children;
};

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool,
  onlyReset: PropTypes.bool,
  children: PropTypes.element.isRequired,
  previousPathname: PropTypes.string
};

export default ProtectedRouteElement;
