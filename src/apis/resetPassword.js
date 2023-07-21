import axios from "axios";

const resetPassword = async (resetToken) => {
  try {
    const res = await axios.put(
      `${REACT_APP_BASE_URL}/api/auth/password/reset/${resetToken}`
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default resetPassword;
