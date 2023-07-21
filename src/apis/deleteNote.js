import axios from "axios";

const deleteNote = async (noteId, token) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/note/deleteNote/${noteId}`,
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

export default deleteNote;
