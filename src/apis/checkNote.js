import axios from "axios";

const checkNote = async (noteId, token) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/note/checkNote/${noteId}`, null, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default checkNote;
