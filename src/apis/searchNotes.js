import axios from "axios";

const searchNotes = async (input, token) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/note/search?input=${input}`,
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

export default searchNotes;
