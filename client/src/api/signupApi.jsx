import toast from "react-hot-toast";
import apiClient from "../config/axiosconfig";

const signUpApi = async (formData) => {
  try {
    const response = await apiClient.post("/api/auth/register", formData);
    if (response.data.success) {
      toast.success(response.data.message);
      return true;
    } else {
      toast.error(response.data.message);
      return false;
    }
  } catch (error) {
    console.log("Something went wrong", error);
    return false;
  }
};

export default signUpApi;
