import axios from "axios";

const resetPassword = async (data, resetToken) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/password/reset/${resetToken}`,
      data
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default resetPassword;
