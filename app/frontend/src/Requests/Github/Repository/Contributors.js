import axios from 'axios';
import config from "../../../config";
import RequestTokenGithub from '../Token';

const RequestContributorsRepositoryGithub = function(login, name, onSuccess, onFailure) {
    var githubToken = null;

    RequestTokenGithub(res => {
        githubToken = res.githubToken;

        //GET NB COMMIT REPOSITORY
        axios
        .get(config.githubURI + "repos/" + login + "/" + name + "/contributors",{
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

export default RequestContributorsRepositoryGithub;