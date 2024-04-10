import axios from "../api/axios";
import useAuth from "./useAuth";

//HOOK KOJI BRISE LOKALNI KONTEST
const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
