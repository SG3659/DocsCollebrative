import toast from "react-hot-toast";
import apiClient from "../config/axiosconfig";
const loginApi = async (formData) => {
  try {
    if (!formData) {
      toast.error("Required");
      return;
    }
    const response = await apiClient.post("/api/auth/login", formData);
    if (response.data.success) {
      localStorage.setItem("token", response.data.data);
      toast.success(response.data.message);
      return true;
    } else {
      toast.error(response.data.message);
      return false;
    }
  } catch (error) {
    console.log("Something went wrong ", error);
    return false;
  }
};

export default loginApi;
