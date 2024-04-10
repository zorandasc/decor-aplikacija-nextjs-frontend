import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//HOOK KOJI VRACA SVE IZ CONTEKSTA
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
