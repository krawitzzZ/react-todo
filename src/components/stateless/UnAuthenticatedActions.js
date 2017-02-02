import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { pink50, cyan300 } from 'material-ui/styles/colors';

const styles = {
  display: 'flex',
  height: '64px',
  marginTop: '-8px',
  alignItems: 'center',
};

const btnStyles = {
  color: pink50,
};

export const UnAuthenticatedActions = (props) => (
  <div style={styles}>
    <FlatButton
      hoverColor={cyan300}
      labelStyle={btnStyles}
      onClick={props.openLoginModal}
      label="Login"
    />
    <FlatButton
      hoverColor={cyan300}
      labelStyle={btnStyles}
      onClick={props.openSignUpModal}
      label="Sign Up"
    />
  </div>
);

UnAuthenticatedActions.propTypes = {
  openLoginModal: PropTypes.func.isRequired,
  openSignUpModal: PropTypes.func.isRequired,
};

export default UnAuthenticatedActions;
