import jwt_decode from "jwt-decode";

const decodeToken = (accessToken) => {
  console.log("form decodetoken, accesstoken:", accessToken)
  let username = "";
  let roles = [];

  let decoded = accessToken ? jwt_decode(accessToken) : undefined;
  console.log("form decodetoken, decoded:", decoded)
  if (decoded) {
    roles = JSON.parse(decoded?.sub)?.UserInfo?.roles;
    username = JSON.parse(decoded?.sub)?.UserInfo?.username;
  }

  return { username, roles };
};

export default decodeToken;
