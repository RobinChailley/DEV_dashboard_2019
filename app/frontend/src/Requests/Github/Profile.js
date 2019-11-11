import axios from 'axios';
import config from "../../config";
import RequestTokenGithub from './Token';

const RequestProfileGithub = function(onSuccess, onFailure) {
    var githubToken = null;

    RequestTokenGithub(res => {
        githubToken = res.githubToken;

        //GET ACCOUNT INFORMATION
        axios
        .get(config.githubURI + "user",{
            headers: {
                'Authorization': 'Bearer ' + githubToken
            }
        })
        .then(res => {
            onSuccess({avatar_url: res.data.avatar_url, name: res.data.name, login: res.data.login, followers: res.data.followers});
        })
        .catch(err => {
            onFailure(err);
        });

    }, err => {
        onFailure(err);
    });
};

export default RequestProfileGithub;