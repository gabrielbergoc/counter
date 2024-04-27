import jwt from "jsonwebtoken";

export function isAuthenticated() {
  return !!getToken();
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export async function getUserEmail() {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  return new Promise<string>((resolve, reject) => {
    const payload = jwt.decode(token, { json: true });

    if (!payload || !payload.email) {
      reject(new Error("Couldn't decode token"));
      return;
    }

    resolve(payload.email);
  });
}
