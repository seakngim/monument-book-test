import api1 from "./api1";
import api2 from "./api2";

const getAllCart = async (page,size) => {
  try {
    const response = await api2.get(`cart/byCurrentUser?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};
const AddCart = async (data) => {
  try {
    const response = await api2.post(`cart/add`,data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};
const delCart = async (data) => {
  console.log(data,"datadata")
  try {
    const response = await api2.post(`cart/delete`,data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};
const CartService = {delCart,AddCart,getAllCart};

export default CartService;
