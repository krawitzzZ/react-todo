import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import './Home.scss';
import styles from './styles';


export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Paper style={styles.paper} zDepth={1} rounded={false}>
          <h1>Welcome to `Todo` app!</h1>
          <h2>Login or Sign up, please!</h2>
        </Paper>
      </div>
    );
  }
}

export default Home;
