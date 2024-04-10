import axios from "../api/axios";
import useAuth from "./useAuth";
import decodeToken from "../utils/decodeToken";

//GET NEW ACCESSTOKEN FORM BACKEND/refresh
//WITH REFRESH TOKEN IN COOKI
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      const accessToken = response?.data?.accessToken;

      const { roles, username } = decodeToken(accessToken);
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
