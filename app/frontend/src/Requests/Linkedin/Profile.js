import axios from 'axios';
import config from "../../config";
import RequestTokenLinkedin from './Token';

const RequestProfileLinkedin = function(onSuccess, onFailure) {
    axios
        .get(config.backURI + 'linkedin/profil', {
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

export default RequestProfileLinkedin;