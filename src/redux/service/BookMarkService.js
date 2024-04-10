import api2 from "./api2";

const getAllBookmark = async (page, size) => {
    try {
      const response = await api2.get(`bookmarks/byCurrentUser?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in :", error);
      throw error;
    }
  };
  const AddBookmark = async (id) => {
    try {
      const response = await api2.post(`bookmarks/add`,id);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in :", error);
      throw error;
    }
  };
  const delBookmark = async (id) => {
    try {
      const response = await api2.delete(`bookmarks/delete?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in :", error);
      throw error;
    }
  };
  
  
  const BookmarkService = {delBookmark,getAllBookmark,AddBookmark};
  
  export default BookmarkService;