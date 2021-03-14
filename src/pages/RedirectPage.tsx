import React from "react";
import { useHistory, useLocation } from "react-router";
import jwtService from "../api/jwt.service";
import { getParamValues } from "../utils/services";

const RedirectPage = () => {
  const history = useHistory();
  const { hash } = useLocation();

  React.useEffect(() => {
    const getAccessTokenFromUrl = async () => {
      try {
        const { access_token, expires_in } = getParamValues(hash);
        const expiryTime = new Date().getTime() + expires_in * 1000;

        jwtService.storeItem(access_token, "token");
        jwtService.storeItem(expiryTime, "expiry");

        history.push("/welcome");
      } catch (error) {
        history.push("/");
      }
    };

    getAccessTokenFromUrl();
  }, []);
  return <div>Redirecting...</div>;
};

export default RedirectPage;
