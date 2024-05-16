import { setCookie, parseCookies, destroyCookie } from "nookies";

export const storeTokensInCookie = (token) => {
  setCookie(null, "authData", JSON.stringify({ token }), {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const deleteCookie = () => {
  destroyCookie(null, "authData", { path: "/" });
  console.log("Cookie deleted.");
};

export const getToken = () => {
  const cookies = parseCookies();
  // console.log(cookies.authData);
  const authData = cookies.authData ? JSON.parse(cookies.authData) : null;

  return authData ? authData.token : null;
};

export const getUserName = () => {
  const cookies = parseCookies();
  const authData = JSON.parse(cookies.authData);
  const res = authData.token;
  return authData;
};
