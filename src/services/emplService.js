import axios from 'axios';

export const getEmp = (searchText = "") => {
  return axios.get("http://localhost/projet/api/getEmp.php")
    .then((response) => {
      const filteredEmp = response.data.filter(
        (emp) => emp.email.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      );
      return filteredEmp;
    })
    .catch((error) => {
      throw error;
    });
};


export const addEmp = (formData) => {
    return axios.post("http://localhost/projet/api/save_emplacement.php", formData)
      .then((response) => {
        if (response.data.success) {
          return response.data.message;
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  
export const updateEmp = (shape) => {
    return axios.put("http://localhost/projet/api/save_emplacement.php", shape)
      .then((response) => {
        if (response.data.success) {
          return response.data.message;
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  
export const deleteEmp = (layerId) => {
    return axios.delete("http://localhost/projet/api/save_emplacement.php", { data: layerId })
      .then((response) => {
        if (response.data.success) {
          return response.data.message;
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
  
  
  