import axios from 'axios';

export const getPacks = (searchText = '') => {
  return axios.get('http://localhost/projet/api/pack.php')
    .then((response) => {
      if (searchText) {
        const filteredPacks = response.data.filter(
          (pack) => pack.titre.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredPacks;
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const addPack = (packData) => {
    return axios.post('http://localhost/projet/api/pack.php', packData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };


export const updatePack = (updatedPack) => {
  return axios.put('http://localhost/projet/api/pack.php', updatedPack)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deletePack = (id) => {
    return axios.delete('http://localhost/projet/api/pack.php', { data: { id } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };

 