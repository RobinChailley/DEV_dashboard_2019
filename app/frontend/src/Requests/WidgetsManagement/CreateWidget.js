import axios from 'axios';
import config from '../../config';

const createWidget = function(type, timer, params, onSuccess, onFailure) {
  axios
    .post(config.backURI + "createWidget", {
      type: type,
      gridX: 0,
      gridY: 0,
      timer: timer,
      params: params
    }, {
      headers: {
        'x-access-token': localStorage.getItem("authToken")
      }
    })
    .then(res => {
      onSuccess(res);
    })
    .catch(err => {
      onFailure(err.response);
    });
};

export default createWidget;