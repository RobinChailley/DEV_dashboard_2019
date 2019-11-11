//NODE MODULES
import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';

//CSS
import './RepositoryGithub.css';

//MY COMPONENTS
import FormRepositoryGithub from '../../../Components/Modal/FormRepositoryGithub';
import CustomModal from '../../../Components/Modal/CustomModal';
import RequestProfileRespositoryGithub from "../../../Requests/Github/ProfileRepository";
import RequestCommitRepositoryGithub from "../../../Requests/Github/Repository/Commits";
import RequestBranchesRepositoryGithub from "../../../Requests/Github/Repository/Branches";
import RequestReleasesRepositoryGithub from "../../../Requests/Github/Repository/Releases";
import RequestContributorsRepositoryGithub from "../../../Requests/Github/Repository/Contributors";
import LoadingWidget from "../../../CommonComponents/LoadingWidget";

class RepositoryGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: null,
      login: null,
      nbCommits: null,
      nbBranches: null,
      nbReleases: null,
      nbContributors: null,
      description: null
    };

    this.updateData = this.updateData.bind(this);

    setInterval(this.updateData, this.props.item.timer * 1000 * 60);
  }

  contributorsRequestFunc() {
    RequestContributorsRepositoryGithub(this.state.login, this.state.name, res => {
      this.setState({nbContributors: Object.keys(res.data).length});
    }, err => {
      console.log(err);
    })
  }

  releasesRequestFunc() {
    RequestReleasesRepositoryGithub(this.state.login, this.state.name, res => {
      this.setState({nbReleases: Object.keys(res.data).length});
    }, err => {
      console.log(err);
    })
  }

  branchesRequestFunc() {
    RequestBranchesRepositoryGithub(this.state.login, this.state.name, res => {
      this.setState({nbBranches: Object.keys(res.data).length});
    }, err => {
      console.log(err);
    })
  }

  commitRequestFunc() {
    RequestCommitRepositoryGithub(this.state.login, this.state.name, res => {
      this.setState({nbCommits: Object.keys(res.data).length});
    }, err => {
      console.log(err);
    })
  }

  updateData() {
    if (this.props.item.params.repositoryName === "") {
      this.setState({loading: false});
      return;
    }

    RequestProfileRespositoryGithub(res => {
      res.data.map(e => {
        if (e.name === this.props.item.params.repositoryName) {
          this.setState({
            name: e.name,
            description: e.description,
            login: e.owner.login
          }, () => {
            if (this.state.name != null) {
              this.commitRequestFunc();
              this.branchesRequestFunc();
              this.releasesRequestFunc();
              this.contributorsRequestFunc();
              this.setState({loading: false});
            } else
              console.log("{RepositoryGithub} RequestProfileRespositoryGithub error");
          });
        }
      });
    }, err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.updateData();
  }

  test() {
    setTimeout(this.updateData, 2000);
  }

  render() {
    return(
      <LoadingWidget loading={this.state.loading}>
        <Row>
          <Col xs={{span: '4', offset: '1'}} >
            <Image style={{marginTop: '15px'}} src={require("../../../Assets/Icons/ic_commit.png")} />
          </Col>
          <Col xs={{span: '3', offset: '4'}} sm={{span: '1', offset: '4'}}>
            <CustomModal
              service="githubToken"
              onWidgetCreated={this.props.onWidgetCreated}
              type={"repositoryGithub"}
              deleteWidget={this.props.deleteWidget}
              item={this.props.item}
              title={"Répertoire Github"}
              titleModal={"Modification du widget Répertoire Github"}
              form={<FormRepositoryGithub />}
              mode="edit"
              test={this.test.bind(this)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={{offset: '1', span: '11'}}>
            <h5 className="name-repository-github dark">{this.state.name}</h5>
            <p>{this.state.description}</p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{marginTop: '30px'}}>
          <Col xs={{offset: 1, span: '4'}}>
          <div className="container-repository-github">
              <Row>
                <Col xs={{offset: '1', span: 3}}>
                  <Image className="icon-repository-github" src={require("../../../Assets/Icons/release.svg")} />
                </Col>
                <Col xs={{span: 7}} style={{textAlign: 'center', marginLeft: '-5px'}}>
                  <h6 className="value-repository-github dark">{this.state.nbCommits}</h6>
                  <p>Commits</p>
                </Col>
              </Row>
            </div>
            <div className="container-repository-github">
              <Row>
                <Col xs={{offset: '1', span: 3}}>
                  <Image className="icon-repository-github" src={require("../../../Assets/Icons/branch.svg")} />
                </Col>
                <Col xs={{span: 7}} style={{textAlign: 'center', marginLeft: '-5px'}}>
                  <h6 className="value-repository-github dark">{this.state.nbBranches}</h6>
                  <p>Branch</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={{offset: 1, span: '4'}}>
            <div className="container-repository-github">
              <Row>
                <Col xs={{offset: '1', span: 3}}>
                  <Image className="icon-repository-github" src={require("../../../Assets/Icons/release.svg")} />
                </Col>
                <Col xs={{span: 7}} style={{textAlign: 'center', marginLeft: '-5px'}}>
                  <h6 className="value-repository-github dark">{this.state.nbReleases}</h6>
                  <p>Releases</p>
                </Col>
              </Row>
            </div>
            <div className="container-repository-github">
              <Row>
                <Col xs={{offset: '1', span: 3}}>
                  <Image className="icon-repository-github" src={require("../../../Assets/Icons/contributor.svg")} />
                </Col>
                <Col xs={{span: 7}} style={{textAlign: 'center', marginLeft: '-20px'}}>
                  <h6 className="value-repository-github dark" style={{marginLeft: '30px'}}>{this.state.nbContributors}</h6>
                  <p>Contributor</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </LoadingWidget>
    )
  }
}

export default RepositoryGithub;