import React from 'react';

class CallbackLinkedin extends React.Component {

  componentDidMount() {
    let redirect = "https://www.linkedin.com/oauth/v2/authorization";
    redirect += "?response_type=code&";
    redirect += "client_id=770q8w262cpq0v&";
    redirect += "redirect_uri=http://localhost:8080/callbacklinkedin_accesstoken&";
    redirect += "scope=r_liteprofile%20r_emailaddress%20w_member_social";
    window.location.href = redirect;
  }

  render() {
    return (
      <div>
        Wait ...
      </div>
    );
  }

}

export default CallbackLinkedin;
