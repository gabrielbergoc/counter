export function isAuthenticated() {
  return !!getToken();
}

export function getToken() {
  return localStorage.getItem("token");
}
