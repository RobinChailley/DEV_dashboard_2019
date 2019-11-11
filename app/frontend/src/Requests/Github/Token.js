import axios from 'axios';
import config from "../../config";

const RequestTokenGithub = function(onSuccess, onFailure) {
    axios
    .get(config.backURI + "account",{
        headers: {
          'x-access-token': localStorage.getItem('authToken')
        }
    })
    .then(res => {
        onSuccess({githubToken: res.data.data.githubToken});
    })
    .catch(err => {
        onFailure(err);
    })
}

export default RequestTokenGithub;