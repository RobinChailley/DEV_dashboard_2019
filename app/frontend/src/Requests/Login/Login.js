import axios from 'axios';
import config from "../../config";

const RequestLogin = function(authType, email, password, onSuccess, onFailure) {
    axios
    .post(config.backURI + "login",{
        'authType': authType,
        'email': email,
        'password': password
    }, {
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

export default RequestLogin;