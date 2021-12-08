import axios from "axios";
import { API_URL } from "./constants";

const getAllOrder = async () => {
  try {
    const response = await axios.get(API_URL + "dashboard/orders/");
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const changeStatus = async (id, status) => {
  try {
    const response = await axios.put(API_URL + `dashboard/orders/${id}`, {status});
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const getOneOrder = async (id) => {
  try {
    const response = await axios.get(API_URL + `dashboard/orders/${id}`); 
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const OrderService = {
  getAllOrder,
  changeStatus,
  getOneOrder,
};

export default OrderService;
