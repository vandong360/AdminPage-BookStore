import axios from "axios";
import { API_URL, LOCAL_STORAGE_ADMIN_TOKEN, LOCAL_STORAGE_ADMIN_NAME } from './constants'

const register = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "auth/admin/register", {username, password });

    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_ADMIN_TOKEN, response.data.accessToken);
      localStorage.setItem(LOCAL_STORAGE_ADMIN_NAME, response.data.username);
    return response.data;

  } catch (error) {
    if (error.response.data) return error.response.data;
    else return { success: false, message: error.message }; 
  }
}

//async - await converted
const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "auth/admin/login", { username, password });
    
    if (response.data.success)
      localStorage.setItem(LOCAL_STORAGE_ADMIN_TOKEN, response.data.accessToken);
      localStorage.setItem(LOCAL_STORAGE_ADMIN_NAME, response.data.username);
    return response.data;
    
  } catch (error) {
    if (error.response.data) return error.response.data
    else return{ success: false, message: error.message}
  }
}

const logout = (userToken, username) => {
  localStorage.removeItem(userToken);
  localStorage.removeItem(username);
}

const authService = {
  register,
  login,
  logout
}

export default authService