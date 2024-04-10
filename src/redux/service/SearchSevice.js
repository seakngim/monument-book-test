import api1 from "./api1";

const getAllSearch = async (filter) => {
    try {
      const response = await api1.get(`/search/all?filter=${filter}`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  
  const SearchService = {getAllSearch};
  
  export default SearchService;