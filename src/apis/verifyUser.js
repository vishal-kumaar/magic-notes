import axios from "axios";

const verifyUser = async (userId, otp) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/user/verify/${userId}`,
      {
        otp
      }
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default verifyUser;
