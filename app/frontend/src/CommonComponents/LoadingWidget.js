import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';

const override = css`
  display: flex;
  justify-content: center;
  margin-top: 50%;
`;

class LoadingWidget extends React.Component {

  render() {
    return (
      <div>
        {this.props.loading ? (
          <PulseLoader
            css={override}
            size={30}
            sizeUnit={"px"}
            color={"gray"}
            loading={true}
          />
        ) : this.props.children
        }
      </div>
    );
  }

}

LoadingWidget.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default LoadingWidget;