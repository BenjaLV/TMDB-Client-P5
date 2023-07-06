import { API } from "../api/api";

export const registerRequest = async (email, password) => {
  try {
    const response = await API.post("/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginRequest = async (userData) => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
