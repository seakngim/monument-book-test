import api2 from "./api2";

const getAllCreditCard = async () => {
    try {
      const response = await api2.get(`/card/all`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAllBook:", error);
      throw error; // You can rethrow the error if you want it to propagate to the calling code
    }
  };
  const getCreditCardById = async (id) => {
    try {
      const response = await api2.get(`/card/getById?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error( error);
      throw error; // You can rethrow the error if you want it to propagate to the calling code
    }
  };
  const updateCreditCardById = async (id,data) => {
    console.log(data);
    try {
      const response = await api2.put(`/card/update-card?id=${id}`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error( error);
      throw error; // You can rethrow the error if you want it to propagate to the calling code
    }
  };
  const deletCreditCardById = async (id) => {
    try {
      const response = await api2.delete(`/card/delete-card?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error( error);
      throw error; // You can rethrow the error if you want it to propagate to the calling code
    }
  };
  const addCreditCard = async (data) => {
   
    try {
      const response = await api2.post(`/card/add`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error( error);
      throw error; // You can rethrow the error if you want it to propagate to the calling code
    }
  };
  const CreditCardService = {addCreditCard,deletCreditCardById,getAllCreditCard,getCreditCardById,updateCreditCardById};

export default CreditCardService;