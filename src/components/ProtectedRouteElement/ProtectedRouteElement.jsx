import { Navigate, useLocation, useNavigate,  } from "react-router-dom";
import { useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "../../coockie";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({ onlyUnAuth, children, onlyReset }) => {
  const location = useLocation();

  const isAuthChecked = true;
  const accessToken = getCookie("token");
  const navigate = useNavigate();

  const puth = useSelector((state) => state.usersInfo.lastPuth);
  useEffect(() => {
    console.log(puth);
  }, [puth])

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

  if(onlyReset){
    if (puth !== '/forgot') {
        return <Navigate to="/forgot" />;
    }
  }

  return children;
};

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool,
  onlyReset: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
