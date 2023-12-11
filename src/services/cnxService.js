import axios from 'axios';

export const signUp = (values) => {
  return axios.post('http://localhost/projet/api/add_user.php', values)
    .then((response) => {
      if (response.data.success) {
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const signIn = (values) => {
  return axios.post('http://localhost/projet/api/signin.php', values)
    .then((response) => {
      if (response.data.success) {
        const user = response.data.user;
        const userId = user.id;

        localStorage.setItem('userId', userId);

        if (userId === 1) {
          return { success: true, isAdmin: true };
        } else {
          return { success: true, isAdmin: false };
        }
      } else {
        return { success: false, message: response.data.message };
      }
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
