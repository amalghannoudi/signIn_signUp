import axios from 'axios';

export const insertCalcul = (values) => {
  try {
    const response = axios.post('http://localhost/projet/api/calcul.php', values);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
