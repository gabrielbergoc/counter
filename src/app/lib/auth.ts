import { deleteCookie, getCookie, setCookie } from "cookies-next";

export function isAuthenticated(args?: any) {
  return !!getToken(args);
}

export function getToken(args?: any) {
  return getCookie("accessToken", args)?.toString();
}

export function setToken(token: string, args?: any) {
  setCookie("accessToken", token, args);
}

export function removeToken(args?: any) {
  deleteCookie("accessToken", args);
}
