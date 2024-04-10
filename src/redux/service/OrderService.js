import api2 from "./api2";

const getAllOrder = async (page, size) => {
    try {
      const response = await api2.get(`order/current?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  const newOrder = async (data) => {
    try {
      const response = await api2.post(`order/new-order`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  
  
  const OrderService = {getAllOrder,newOrder};
  
  export default OrderService;