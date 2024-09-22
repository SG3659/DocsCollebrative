import apiClient from "../config/axiosconfig";
import toast from "react-hot-toast";

const forgotPasswordApi = async (formData) => {
  try {
    const response = await apiClient.post(
      "/api/auth/requestPasswordReset",
      formData
    );
    if (response) {
      toast.success("Email Sent Successfully Please Check Your Email");
      localStorage.setItem("email", formData.email);
      return true;
    }
  } catch (error) {
    console.log("Something went wrong", error);
    return false;
  }
};

export default forgotPasswordApi;
