import axios from 'axios';

export const getData = () => {
  return axios.get("http://localhost/projet/api/dashboard.php")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
