import axios from "axios";

const editNote = async (noteId, data, token) => {
  try {
    const res = await axios.put(
      `${REACT_APP_BASE_URL}/api/note/editNote/${noteId}`,
      {
        data,
      },
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

export default editNote;
