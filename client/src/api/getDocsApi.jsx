import apiClient from "../config/axiosconfig";
import axios from "axios";
const getDocsApi = async (setDocs, search) => {
  try {
    const response = await apiClient.get(
      `/api/docs/getAllDocs?search=${encodeURIComponent(search)}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      console.log(response.data.data);
      setDocs(response.data.data);
    }
    return true;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request Canceled", error.message);
      return;
    }
    console.error("something went wrong ", error);
    return false;
  }
};
export default getDocsApi;
