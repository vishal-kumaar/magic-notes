import axios from "axios";

const updateUserName = async (userId, data, token) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/auth/username/update/${userId}`,
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

export default updateUserName;
