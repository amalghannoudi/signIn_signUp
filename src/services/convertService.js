import axios from 'axios';

export const convertKMZ = (formData) => {
  return fetch('http://localhost/projet/api/kmz_txt.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      throw new Error('API call failed');
    });
};


export const convertKML = (formData) => {
    return fetch('http://localhost/projet/api/kml_txt.php', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        throw new Error('API call failed');
      });
  };