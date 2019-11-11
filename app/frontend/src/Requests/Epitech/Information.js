import axios from 'axios';
import config from "../../config";

const requestInformationsEpitech = function(onSuccess, onFailure) {
  axios
    .get(config.backURI + "epitech/information",{
      headers: {
        'x-access-token': localStorage.getItem('authToken')
      }
    })
    .then(res => {
      onSuccess({gpa: res.data.gpa, netsoul: res.data.netsoul, credits: res.data.credits});
    })
    .catch(err => {
      onFailure(err);
    });
};

export default requestInformationsEpitech;