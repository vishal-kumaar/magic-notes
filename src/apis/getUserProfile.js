import axios from "axios";

const getUserProfile = async (token) => {
  try {
    const res = await axios.get(`${REACT_APP_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default getUserProfile;
