import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const Redirect = ({ children, disabled = false }) => {
  const allowedRoutes = ["/login", "/register"];

  const user = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (disabled) return;

    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    if (!user && !allowedRoutes.includes(location.pathname)) navigate("/login");
    // eslint-disable-next-line
  }, [user, firstLoad, location]);

  return <>{children}</>;
};

export default Redirect;
