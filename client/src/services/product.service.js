import axios from "axios";
import { API_PRODUCT } from "./constants";

const getAllProduct = async () => {
  try {
    const response = await axios.get(API_PRODUCT + '/');
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const createProduct = async (
data
) => {
  try {
    const response = await axios.post(API_PRODUCT + "/post", data);
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: "Tên sản phẩm đã tồn tại!" };
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(API_PRODUCT +`/${id}`);
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const updateProduct = async (id, values) => {
  try {
    const response = await axios.put(API_PRODUCT + `/update/${id}`, values);
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const delProduct = async (id) => {
  try {
    const response = await axios.delete(API_PRODUCT + `/delete/${id}`);
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const getAllByCategory = async (category) => {
  try {
    const response = await axios.get(API_PRODUCT + `?category=[${category}]`);
    return response.data;
  } catch (error) {
    if (error.data) return error.data;
    else return { success: false, message: error.message };
  }
};

const ProductService = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  delProduct,
  getAllByCategory,
};

export default ProductService;
