import axios from 'axios';
import config from "../../config";


const getNotificationsEpitechData = function(onSuccess, onFailure) {
  axios
    .get(config.backURI + "epitech/notification", {
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
}

export default getNotificationsEpitechData;
