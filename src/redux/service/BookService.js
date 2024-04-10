import api1 from "./api1";
import api2 from "./api2";

const getAllBook = async (page,size) => {
  try {
    const response = await api1.get(`/book/all?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getAllBook:", error);
    throw error; // You can rethrow the error if you want it to propagate to the calling code
  }
};

// const addBook = async (data) => {
//   try {
//     const response = await api1.post(`/book/add`, data);
//     return response.data;
//   } catch (error) {
//     // Handle the error here
//     console.error("Error in addBook:", error);
//     throw error;
//   }
// };

const getBestSelling = async (page,size) => {
  try {
    const response = await api1.get(`/book/get-best-sell?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    // Handle the error here
    console.error("Error in getBookSelling:", error);
    throw error;
  }
};
const getBookOfTheWeek = async (page,size) => {
    try {
      const response = await api1.get(`/book/get-book-of-the-week?page=${page}&size=${size}`);  
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in newarrival:", error);
      throw error;
    }
  };
  const getNeweArrival = async (page,size) => {
    try {
      const response = await api1.get(`/book/get-new-arrival?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in newarrival:", error);
      throw error;
    }
  };

  const AddBestOfTheWeek = async (data) => {
    try {
      const response = await api2.post(`/book/add-book-of-the-week`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };

  const AddBestSelling= async (data) => {
    try {
      const response = await api2.post(`/book/add-best-sell`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const AddNewArrival= async (data) => {
    try {
      const response = await api2.post(`/book/add-new-arrival`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };

 const deletBestOfTheWeek = async (data) => {
    try {
      const response = await api2.post(`/book/delete-book-of-the-week`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const deletBestSelling = async (data) => {
    try {
      const response = await api2.post(`/book/delete-best-sell`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const deletNewArrival = async (data) => {
    try {
      const response = await api2.post(`/book/delete-new-arrival`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const addbook = async (data) => {
    try {
      const response = await api2.post(`/book/add`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const Purchasebook = async (data) => {
    try {
      const response = await api2.post(`/book/addPurchase`, data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in add error:", error);
      throw error;
    }
  };
  const getBookById = async (id) => {
    try {
      const response = await api1.get(`/book/getById?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const PurchaseCheckout = async (data) => {
    try {
      const response = await api2.post(`/book/PurchaseCheckout`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const getPurchase = async (page, size) => {
    try {
      const response = await api2.get(`/book/getAllPurchase?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const delPurchase = async (id) => {
    try {
      const response = await api2.delete(`/book/deletePurchase?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const getPurchaseById = async (id) => {
    try {
      const response = await api2.get(`/book/getPurchaseById?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const updatePurchase = async (id,bookId,data) => {
    try {
      const response = await api2.put(`/book/updatePurchase?id=${id}&book_id=${bookId}`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const delProduct = async (id) => {
    try {
      const response = await api2.delete(`/book/deleteById?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
  const editeBook = async (id,data) => {
    try {
      const response = await api2.put(`/book/update?id=${id}`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getBookSelling:", error);
      throw error;
    }
  };
const BookService = {editeBook,delProduct,updatePurchase,getPurchaseById,delPurchase,getPurchase,PurchaseCheckout,getBookById, Purchasebook,addbook,getAllBook, getBestSelling ,getBookOfTheWeek,getNeweArrival,AddBestOfTheWeek,AddBestSelling,AddNewArrival, deletBestOfTheWeek,deletBestSelling,deletNewArrival};
export default BookService;
