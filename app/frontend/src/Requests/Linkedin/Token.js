import axios from 'axios';
import config from "../../config";

const RequestTokenLinkedin = function(onSuccess, onFailure) {
    axios
      .get(config.backURI + "account",{
          headers: {
            'x-access-token': localStorage.getItem('authToken')
          }
      })
      .then(res => {
          console.log("{RequestTokenLinkedin} linkedinToken = " + res.data.data.linkedinToken);
          onSuccess({linkedinToken: res.data.data.linkedinToken});
      })
      .catch(err => {
          onFailure(err);
      })
}

export default RequestTokenLinkedin;
