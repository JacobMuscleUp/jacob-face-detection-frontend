import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Navigation.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navigation = (props) => {
  const { classes, onRouteChange, userSignedIn } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className='Navigation_topbar_background_color'>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <p className='FontFace_moonhouse'>Face Recognition</p>
          </Typography>
          {userSignedIn ?
            <Button onClick={() => onRouteChange('signin')} color="inherit">Logout</Button>
            : <div>
              <Button onClick={() => onRouteChange('signin')} color="inherit">Sign In</Button>
              <Button onClick={() => onRouteChange('signup')} color="inherit">Sign Up</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);