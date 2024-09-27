import apiClient from "../config/axiosconfig";

const getUserApi = async (dispatch, setUser) => {
  try {
    const response = await apiClient.post(
      "/api/auth/get-user-info-by-id",
      { token: localStorage.getItem("token") },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      console.log(response.data.data);
      dispatch(setUser(response.data.data));
    }
  } catch (error) {
    console.error("something went wrong ", error);
    return false;
  }
};

export default getUserApi;
