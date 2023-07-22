import axios from "axios";

const forgotPassword = async (data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/password/forgot`,
      data
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default forgotPassword;
