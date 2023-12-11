import axios from 'axios';

export const getAbonn = (searchText = "") => {
  return axios.get('http://localhost/projet/api/admin_abonnement.php')
    .then((response) => {
      if (searchText) {
        const filteredAbonn = response.data.filter(
          (abonn) => abonn.email.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredAbonn;
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const updateAbonn = (updatedAbonn) => {
    return axios.put('http://localhost/projet/api/admin_abonnement.php', updatedAbonn)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  
export const deleteAbonn = (id) => {
    return axios.delete('http://localhost/projet/api/admin_abonnement.php', { data: { id } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

 