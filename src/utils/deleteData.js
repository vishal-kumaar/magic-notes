const deleteData = async (url = '') => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
}

export default deleteData;