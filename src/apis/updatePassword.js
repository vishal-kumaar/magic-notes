import axios from "axios";

const updatePassword = async (userId, data, token) => {
  try {
    const res = await axios.put(
      `${REACT_APP_BASE_URL}/api/auth/password/update/${userId}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default updatePassword;
