import axios from 'axios';

export const getMsg = () => {
  return axios.get("http://localhost/projet/api/message.php")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const addMsg = (item) => {
  return axios.post("http://localhost/projet/api/message.php", item)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteMsg = (id) => {
    return axios.delete("http://localhost/projet/api/message.php", { data: { id } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };


export const getByEmail = (email) => {
  const url = `http://localhost/projet/api/message.php${email ? `?email=${email}` : ''}`;
  return axios.get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
