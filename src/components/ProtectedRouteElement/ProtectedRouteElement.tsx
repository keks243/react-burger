import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCookie } from "../../coockie";

interface ProtectedRouteElementProps {
  onlyUnAuth?: boolean;
  onlyReset?: boolean;
  children: React.ReactNode;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  onlyUnAuth,
  onlyReset,
  children,
}) => {
  const location = useLocation();
  const isAuthChecked = true; 
  const accessToken = getCookie("token");
  const navigate = useNavigate();

  const puth = useSelector((state:any) => state.usersInfo.lastPuth);
  useEffect(() => {
    console.log(puth);
  }, [puth]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (onlyUnAuth && accessToken) {
    const { from } = location.state as { from: { pathname: string } } || {
      from: { pathname: "/" },
    };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyReset && puth !== "/forgot") {
    return <Navigate to="/forgot" />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
