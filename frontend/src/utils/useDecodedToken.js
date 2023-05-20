import jwt_decode from "jwt-decode";

export default function useDecodedToken() {
  const token = localStorage.getItem("token");
  let decodedToken = null;
  if (token) {
    decodedToken = jwt_decode(token);
  }
  return [decodedToken];
}
