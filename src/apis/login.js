import axios from "axios";

const login = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, data);
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default login;
