import axios from 'axios';
import config from '../../config';

const getModulesNames = function(onSuccess, onFailure) {
  axios
    .get(config.backURI + "epitech/module_names", {
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

const getModuleInfo = function(params, onSuccess, onFailure) {
  axios
    .post(config.backURI + "epitech/module_info", {
      instance: params.instance,
      module: params.module,
      moduleName: params.moduleName,
      year: params.year
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

export default {getModulesNames: getModulesNames, getModuleInfo: getModuleInfo};