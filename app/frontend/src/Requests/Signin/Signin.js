import axios from 'axios';
import config from "../../config";

const RequestSignin = function(email, password, onSuccess, onFailure) {
    axios
    .post(config.backURI + "signup",{
        'email': email,
        'password': password
    }, {
        headers: {}
    })
    .then(res => {
        onSuccess({githubToken: res.data.data.githubToken});
    })
    .catch(err => {
        onFailure(err);
    })
}

export default RequestSignin;