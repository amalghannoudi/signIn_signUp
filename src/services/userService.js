import axios from 'axios';

    export const getUsers = (searchText = "") => {
        return axios.get(`http://localhost/projet/api/compte.php`)
          .then((response) => {
            if (searchText) {
              const filteredMsg = response.data.filter(
                (compte) => compte.email.toLowerCase().includes(searchText.toLowerCase())
              );
              return filteredMsg;
            } else {
              return response.data;
            }
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      };
      
      export const getUserById = (userId) => {
        return axios.get(`http://localhost/projet/api/user_information.php?id=${userId}`)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      };

      export const updateUser = (UserData) => {
        return axios.put('http://localhost/projet/api/compte.php', UserData)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.error(error);
            throw error;
          });
      };
      
