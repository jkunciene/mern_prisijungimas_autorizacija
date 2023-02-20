import axios from "./axios";

export async function register(userData) {
  return axios.post("/users", userData);
}

export async function login(userData) {
  return axios.post("/users/login", userData);
}

export async function getUsers() {
  return axios.get("/users/list");
}

export async function createGoal(goalData) {
  return axios.post("/goals", goalData);
}

export async function getGoals() {
  return axios.get("/goals");
}
