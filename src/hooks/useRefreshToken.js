import axios from "../api/axios";
import decodeToken from "../utils/decodeToken";
import useAuth from "./useAuth";

//GET NEW ACCESSTOKEN FORM BACKEND/refresh
//WITH REFRESH TOKEN IN COOKI
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    //withCredentials: true, ZNACI SALJI COOKIE jwr=refreshtoken
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      const accessToken = response?.data?.accessToken;

      const { username, roles } = decodeToken(accessToken);

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
