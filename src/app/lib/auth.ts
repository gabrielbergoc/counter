import { deleteCookie, getCookie, setCookie } from "cookies-next";
import jwt from "jsonwebtoken";

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

export async function authorize(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Couldn't retrieve JWT_SECRET");
  }

  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secret, {}, function (err, result) {
      if (err || !result || typeof result === "string") {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}
