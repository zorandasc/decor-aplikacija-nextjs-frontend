import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import useLogout from "../hooks/useLogout";

//atach interceptor for axios request i response
const useAxiosPrivate = (location) => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest?.sent) {
          //access token expired or invalid
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh(); //get new access token
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          } catch (error) {
            //REFRESH TOKEN JE ONAJ DUZI OD 1D
            //refresh token expired or invalid
            if (error?.response?.status === 403) {
              const message =
                "Sesija istekla. Molimo Vas logujte se ponovo. 😇";
              let err = { ...error, message };
              await logout();
              navigate("/login", {
                state: { from: location },
                replace: true,
              });
              return Promise.reject(err);
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
