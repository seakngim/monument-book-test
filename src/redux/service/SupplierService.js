import api1 from "./api1";
import api2 from "./api2";

const getAllSupplier = async () => {
    try {
      const response = await api1.get(`/supplier/all`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  const addSupplier = async (data) => {
    try {
      const response = await api2.post(`/supplier/add`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  const deleteSupplier = async (id) => {
    try {
      const response = await api2.delete(`/supplier/deleted?id=${id}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  
  const SupplierService = {getAllSupplier,addSupplier,deleteSupplier};
  
  export default SupplierService;