import api1 from "./api1";
import api2 from "./api2";

const getAllCategory = async () => {
  try {
    const response = await api1.get(`/category/all?page=1&size=500`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};
const addCategory = async (data) => {
  try {
    const response = await api2.post(`/category/add`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const edit = async (id,data) => {
  try {
    const response = await api2.put(`/category/update?id=${id}`, data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const getCategoryById = async (id) => {
  try {
    const response = await api1.get(`/category/getById?id=${id}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};
const delCategory = async (id) => {
  try {
    const response = await api2.delete(`/category/delete?id=${id}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};

const CategoryService = {delCategory,getCategoryById,getAllCategory,addCategory,edit};

export default CategoryService;
