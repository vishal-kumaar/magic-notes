import axios from "axios";

const createNote = async (data, token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/note/createNote`,
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

export default createNote;
