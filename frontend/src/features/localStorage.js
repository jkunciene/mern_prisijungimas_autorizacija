const USER = "user";

export function setUser(user) {
  return localStorage.setItem(USER, JSON.stringify(user));
}

export function removeUser() {
  return localStorage.removeItem(USER);
}

export function getUser() {
  return JSON.parse(localStorage.getItem(USER));
}
