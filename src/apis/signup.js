import axios from "axios";

const signup = async (data) => {
  try {
    const res = await axios.post(
      `${REACT_APP_BASE_URL}/api/auth/signup`,
      data
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default signup;
