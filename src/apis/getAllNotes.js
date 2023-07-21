import axios from "axios";

const getAllNotes = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/note/getNotes`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default getAllNotes;
