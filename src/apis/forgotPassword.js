import axios from "axios";

const forgotPassword = async (email) => {
  try {
    const res = await axios.put(
      `${REACT_APP_BASE_URL}/api/auth/password/forgot`,
      { email }
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default forgotPassword;
