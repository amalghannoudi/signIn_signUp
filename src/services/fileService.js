import axios from 'axios';

export const getFiles = (searchText = "") => {
  return axios.get('http://localhost/projet/api/save_file.php')
    .then((response) => {
      if (searchText) {
        const filteredFiles = response.data.filter(
          (file) => file.nomF1.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        return filteredFiles;
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      throw error;
    });
};


export const getFileByUserId = (userId) => {
    const url = `http://localhost/projet/api/save_file.php${userId ? `?idUser=${userId}` : ''}`;
    return axios.get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  
export const saveFile = (formData) => {
    axios.post('http://localhost/projet/api/save_file.php', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    } ; 