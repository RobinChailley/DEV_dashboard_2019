import axios from 'axios';
import config from '../../config';

const updateWidget = function(id, timer, params, onSuccess, onFailure) {
  axios
    .post(config.backURI + "updateWidget", {
      widget_id: id,
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

export default updateWidget;