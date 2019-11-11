import config from '../../config';
import axios from 'axios';

const homeRequests = {
  getLayout : function(onSuccess, onFailure) {
    axios
      .get(config.backURI + "account", {
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
  },

  setLayout: function(layout, onSuccess, onFailure) {
    axios
      .post(config.backURI + "setLayout", {
        layout: layout
      }, {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        onSuccess(res);
      })
      .catch(err => {
        onFailure(err.response);
      })
  },

  deleteWidget: function(id, onSuccess, onFailure) {
    axios
      .post(config.backURI + "deleteWidget", {
        'widget_id': id
      }, {
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
      })
      .then(res => {
        onSuccess(res);
      })
      .catch(err => {
        onFailure(err.response);
      });
  }
};

export default homeRequests;