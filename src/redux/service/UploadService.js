import api2 from "./api2";
const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await api2.post("/image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response.data",response.data);
  
      // Assuming the image URL is in response.data.data
      return response.data;
    } catch (error) {
      console.error("Error in UploadService:", error);
      throw error;
    }
  };
const UploadService = {upload};

export default UploadService;
