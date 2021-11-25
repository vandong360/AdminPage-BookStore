export const LOCAL_STORAGE_ADMIN_TOKEN = "token";
export const LOCAL_STORAGE_ADMIN_NAME = "adminname";

export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/"
    : "https://bookstore360.herokuapp.com/";
export const API_PRODUCT =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/dashboard/products"
    : "https://bookstore360.herokuapp.com/dashboard/products";
