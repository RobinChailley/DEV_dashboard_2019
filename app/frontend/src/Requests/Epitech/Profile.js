import axios from 'axios';
import config from '../../config';

const getProfileEpitechData = function(onSuccess, onFailure) {
  axios
    .get(config.backURI + "epitech/profile", {
      headers: {
        'x-access-token': localStorage.getItem('authToken')
      }
    })
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFailure(err);
    });
};

export default getProfileEpitechData;