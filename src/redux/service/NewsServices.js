import api1 from "./api1";
import api2 from "./api2";

const getAllNews = async (page, size) => {
  try {
    const response = await api1.get(`/news/getAll?page=${page}&size=${size}`);
    console.log(response.data)
    return response.data;

  } catch (error) {
    // Handle the error here
    console.error("Error in addBook:", error);
    throw error;
  }
};
const addNews = async (data) => {
  try {
    const response = await api2.post(`/news/add`,data);
    return response.data;

  } catch (error) {
    // Handle the error here
    console.error("Error in addBook:", error);
    throw error;
  }
};
const updateNews = async (id,data) => {
  try {
    const response = await api2.put(`/news/update?id=${id}`,data);
    return response.data;

  } catch (error) {
    // Handle the error here
    console.error("Error in addBook:", error);
    throw error;
  }
};
const deleteNews = async (id) => {
  try {
    const response = await api2.delete(`/news/delete?id=${id}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in addBook:", error);
    throw error;
  }
};

const NewsServises = {getAllNews,addNews,updateNews,deleteNews};

export default NewsServises;
