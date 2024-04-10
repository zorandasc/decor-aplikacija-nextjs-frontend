import jwt_decode from "jwt-decode";

const decodeToken = (accessToken) => {
  const decoded = accessToken ? jwt_decode(accessToken) : undefined;

  //ovo kada je na backend npm i jesonwebtoken
  //const decode=jwt_decode(accessToken)
  //const roles = decode?.UserInfo?.roles || [];
  //const username = decoded?.UserInfo?.username;

  //a ovo kada je na backend npm i jose
  const roles = decoded ? JSON.parse(decoded?.sub)?.UserInfo?.roles || [] : [];
  const username = decoded
    ? JSON.parse(decoded?.sub)?.UserInfo?.username || ""
    : "";

  return { username, roles };
};

export default decodeToken;
