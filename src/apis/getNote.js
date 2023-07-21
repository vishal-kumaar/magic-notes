import axios from "axios";

const getNote = async (noteId, token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/note/getNote/${noteId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default getNote;
