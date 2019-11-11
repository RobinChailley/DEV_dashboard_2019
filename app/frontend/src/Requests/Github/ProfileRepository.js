import axios from 'axios';
import config from "../../config";
import RequestTokenGithub from './Token';
            
const RequestProfileGithub = function(onSuccess, onFailure) {
    var githubToken = null;
            
    RequestTokenGithub(res => {
        githubToken = res.githubToken;
            
        //GET REPOSITORY INFORMATION
        axios
        .get(config.githubURI + "user/repos",{
            headers: {
                'Authorization': 'Bearer ' + githubToken
            }
        })
        .then(res => {
            onSuccess(res);
        })
        .catch(err => {
            onFailure(err);
        });
            
        }, err => {
            onFailure(err);
        });
};
            
export default RequestProfileGithub;