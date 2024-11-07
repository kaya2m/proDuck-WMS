import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = ({ logOut }) => {
  let location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        logOut();
      }
    }
  }, [location, logOut]);

  return null;
};

export default AuthVerify;
