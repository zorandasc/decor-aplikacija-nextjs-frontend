import axios from "../api/axios";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

//GET NEW ACCESSTOKEN FORM BACKEND/refresh
//WITH REFRESH TOKEN IN COOKI
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(
        "from useRefreshToken,response?.data?.accessToken: ",
        response?.data?.accessToken
      );
      const accessToken = response?.data?.accessToken;

      const decoded = accessToken ? jwt_decode(accessToken) : undefined;

      let username = "";
      let roles = [];
      if (decoded) {
        roles = JSON.parse(decoded.sub)?.UserInfo?.roles;
        username = JSON.parse(decoded.sub)?.UserInfo?.username;
      }

      return {
        ...prev,
        username,
        roles,
        accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
