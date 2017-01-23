import React, { PropTypes } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export const AuthenticatedDropMenu = (props) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon color="white" /></IconButton>}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem onTouchTap={props.addTodo} primaryText="Add Todo"/>
    <MenuItem onTouchTap={props.openAccount} primaryText="Account"/>
    <MenuItem onTouchTap={props.signOut} primaryText="Sign Out"/>
  </IconMenu>
);

AuthenticatedDropMenu.propTypes = {
  addTodo: PropTypes.func.isRequired,
  openAccount: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default AuthenticatedDropMenu;
