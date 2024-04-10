import api1 from "./api1";
import api2 from "./api2";

const getAllAuthor = async (page,size) => {
  try {
    const response = await api1.get(`/author/all?page=${page}&size=${size}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in addBook:", error);
    throw error;
  }
};
const getAuthorById = async (id) => {
  try{
    const response = await api1.get(`/author/byId?id=${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error in getAuthorById", error);
    throw error;
  }
}
const getfeatureAuthor = async () => {
  try {
    const response = await api1.get(`/author/feature?page=1&size=10`);
    console.log(response)
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const addFeature = async (data) => {
  try {
    const response = await api2.post(`/author/addFeature?id=${data}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const addAuthor = async (data) => {
  try {
    const response = await api2.post(`/author/add`, data);
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
    const response = await api2.put(`/author/update?id=${id}`, data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const delAuthor = async (id,data) => {
  try {
    const response = await api2.put(`/author/update?id=${id}`, data);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAuthor:", error);
    throw error;
  }
};
const AuthorServise = { edit, addAuthor, getAllAuthor, getfeatureAuthor, addFeature , getAuthorById };

export default AuthorServise;
