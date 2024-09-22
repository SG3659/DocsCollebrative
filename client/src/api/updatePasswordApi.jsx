import apiClient from "../config/axiosconfig";
import toast from "react-hot-toast";
const updatePasswordApi = async (resetString, userId, formData) => {
  try {
    const response = await apiClient.post(
      `/api/auth/resetPassword/${userId}/${resetString}`,
      formData
    );
    if (response.data.success) {
      toast.success("Password Has Updated Successfully");
      localStorage.clear();
      return true;
    }
  } catch (error) {
    console.error("something went wrong ", error);
    return false;
  }
};

export default updatePasswordApi;
