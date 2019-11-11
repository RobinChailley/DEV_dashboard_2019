//NPM MODULES
import React from 'react';
import {Container} from 'react-bootstrap';
import { Dragact } from 'dragact';
import homeRequests from '../../Requests/Home/homeRequests';

//CSS
import './Home.css';

//MY COMPONENTS
import Header from '../../CommonComponents/Header/Header';
import ProfileEpitech from '../../Widgets/Epitech/Profile/ProfileEpitech';
import InformationEpitech from '../../Widgets/Epitech/Information/InformationEpitech';
import NotificationEpitech from '../../Widgets/Epitech/Notifications/NotificationsEpitech';
import ModuleEpitech from '../../Widgets/Epitech/Module/ModuleEpitech';
import ProfileLinkedin from '../../Widgets/Linkedin/Profile/ProfileLinkedin';
import PosteLinkedin from '../../Widgets/Linkedin/Poste/PosteLinkedin';
import ProfileGithub from '../../Widgets/Github/Profile/ProfileGithub';
import RepositoryGithub from '../../Widgets/Github/Repository/RepositoryGithub';
import GroupYammer from '../../Widgets/Yammer/Group/GroupYammer';
import MailBoxYammer from '../../Widgets/Yammer/MailBox/MailBoxYammer';
import ProfileYammer from '../../Widgets/Yammer/Profile/profileYammer';

const getblockStyle = (isDragging) => {
  return {
    //background: isDragging ? '#1890ff' : 'white',
  }
};

/*
{ id: "fakeId", GridX: 0, GridY: 0, w: widgets['profileEpitech'].w, h: widgets['profileEpitech'].h, key: 1, comp: widgets['profileEpitech'].comp },
{ id: "fakeId", GridX: 3, GridY: 0, w: widgets['notificationsEpitech'].w, h: widgets['notificationsEpitech'].h, key: 2, comp: widgets['notificationsEpitech'].comp },
{ id: "fakeId", GridX: 6, GridY: 0, w: widgets['informationEpitech'].w, h: widgets['informationEpitech'].h, key: 3, comp: widgets['informationEpitech'].comp },
{ id: "fakeId", GridX: 9, GridY: 0, w: widgets['moduleEpitech'].w, h: widgets['moduleEpitech'].h, key: 4, comp: widgets['moduleEpitech'].comp },
{ id: "fakeId", GridX: 0, GridY: 5, w: widgets['profileLinkedin'].w, h: widgets['profileLinkedin'].h, key: 5, comp: widgets['profileLinkedin'].comp },
{ id: "fakeId", GridX: 3, GridY: 5, w: widgets['posteLinkedin'].w, h: widgets['posteLinkedin'].h, key: 6, comp: widgets['posteLinkedin'].comp }
*/

class Home extends React.Component {

  /*
  ~ Constructor of the Home component
  ~ Build state and bind functions
  ~ params: props
  ~ return:
  */
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      DragactWidth: window.innerWidth - 40,
      DragactCol: Math.round((window.innerWidth - 40) / 115),
      dashboardData: []
    };

    this.buildDashboard = this.buildDashboard.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.deleteWidget = this.deleteWidget.bind(this);
    this.onWidgetCreated = this.onWidgetCreated.bind(this);

    this.widgetsConfig = {
      "profileLinkedin": {comp: <ProfileLinkedin onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 3},
      "profileEpitech": {comp: <ProfileEpitech onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 4},
      "informationEpitech": {comp: <InformationEpitech onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 3},
      "notificationsEpitech": {comp: <NotificationEpitech onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 4},
      "moduleEpitech": {comp: <ModuleEpitech onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 3},
      "posteLinkedin": {comp: <PosteLinkedin onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 5, h: 5},
      "profileGithub": {comp: <ProfileGithub onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 5, h: 4},
      "repositoryGithub": {comp: <RepositoryGithub onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 4},
      "groupYammer": {comp: <GroupYammer onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 4},
      "mailBoxYammer": {comp: <MailBoxYammer onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 5, h: 4},
      "profileYammer": {comp: <ProfileYammer onWidgetCreated={this.onWidgetCreated} deleteWidget={this.deleteWidget} />, w: 3, h: 4}
    };

    this.dashboardRef = React.createRef();
  }

  /*
  ~ Build the dashboard from the database with an axios request
  ~ params: 
  ~ return:
  */
  buildDashboard() {
    homeRequests.getLayout(res => {
      const widgets = res.data.data.widgets;
      const dashboard = [];

      widgets.map((e, i) => {
        let el = {
          id: e.id,
          GridX: e.gridX,
          GridY: e.gridY,
          type: e.type,
          timer: e.timer,
          params: e.params,
          key: i,
          w: this.widgetsConfig[e.type].w,
          h: this.widgetsConfig[e.type].h,
          comp: this.widgetsConfig[e.type].comp
        };
        dashboard.push(el);
        return 0;
      });

      this.setState({dashboardData: dashboard});
    }, err => {
      console.log(JSON.parse(JSON.stringify(err)));
    });
  }


  /*
  ~ This function is passed as props into components of dashboard,
  ~ it serves for delete a widget from state and from database
  ~ params:
  ~ return:
  */
  deleteWidget(id) {
    let dashboard = this.state.dashboardData;
    dashboard = dashboard.filter((e,i) => id !== e.id);
    this.setState({dashboardData: dashboard});
    homeRequests.deleteWidget(id, res => {
    }, err => {
    });
  }


  /*
  ~ Just get the size of the window for make the dashboard grid layout responsive
  ~ This is an event listener function of 'resize' event.
  ~ params: 
  ~ return:
  */
  updateDimensions() {
    this.setState({
      DragactWidth: window.innerWidth - 40,
      DragactCol: Math.round((window.innerWidth - 40) / 115),
      width: window.innerWidth
    });
  };


  onWidgetCreated() {
    this.buildDashboard();
  }

  /*
  ~ ComponentDidMount function of the Home component
  ~ Attach event to the window and initialize the component from the database
  ~ params:
  ~ return:
  */
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.buildDashboard();
  }


  /*
  ~ ComponentDidMount function of the Home component
  ~ Detach event from the window
  ~ params:
  ~ return:
  */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  /*
  ~ Callback of the event OnDragEnd of the dragact library
  ~ Also make a request to the server for updating the database with all
  ~ positions of each element in the layout.
  ~ params: event
  ~ return:
  */
  onDragEnd(event) {
    let dashboardData = this.dashboardRef.current.getLayout();
    for (let i = 0; i < dashboardData.length; i++) {
      if (event.UniqueKey === dashboardData[i].key) {
        dashboardData[i].GridX = event.GridX;
        dashboardData[i].GridY = event.GridY;
        if (this.dashboardRef.current !== null) {
          let datas = [];
          dashboardData.map((e, i) => {
            datas.push({id: e.id, GridX: e.GridX, GridY: e.GridY});
            return 0;
          });
          homeRequests.setLayout(datas, res => {
          }, err => {
          });
        }
        break;
      }
    }
    this.setState({dashboardData: dashboardData});
  }

  /*
  ~ The render method
  ~ params:
  ~ return:
  */
  render() {
    return (
      <Container fluid>
        <Header onWidgetCreated={this.onWidgetCreated}/>
          {this.state.dashboardData.length !== 0 && <Dragact
          ref={this.dashboardRef}
          layout={this.state.dashboardData}
          width={this.state.DragactWidth}
          col={this.state.DragactCol}
          rowHeight={80}
          margin={[20, 20]}
          className='container-widget'
          style={{ background: '#ffffff' }}
          onDragEnd={this.onDragEnd}
          placeholder={true} >
          {(item, provided) => {
            return (
              <div className="plant-layout"
                {...provided.props}
                {...provided.dragHandle}
                style={{...provided.props.style, ...getblockStyle(provided.isDragging)}}>
                {React.cloneElement(
                  item.comp,
                  {item: item}
                )}
              </div>
            )
        }}
        </Dragact>}
      </Container>
    )
  }
}


/*
 * Describe the type and some options of each props of this component
 */
Home.propTypes = {
};

export default Home;

