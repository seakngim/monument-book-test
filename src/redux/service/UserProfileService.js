import api2 from "./api2";

const getUserProfile = async () => {
    try {
      const response = await api2.get(`user/currentUser`);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  const UpdateUserProfile = async (data) => {
    try {
      const response = await api2.put(`user/updateCurrentUser`,data);
      return response.data;
    } catch (error) {
      // Handle the error here
      console.error("Error in getAuthor:", error);
      throw error;
    }
  };
  
  const UserProfileService = {UpdateUserProfile,getUserProfile};
  
  export default UserProfileService;