import api2 from "./api2";

const addPamyent = async (data) => {
    try {
      const response = await api2.post(`payment/add`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };

  const PaymentService = {addPamyent};
  export default PaymentService;