import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Todos } from '../../main';
import { AuthenticatedDropMenu } from '../../stateless';
import './App.css';


export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true
    };
  }

  render() {
    return (
      <div className="App">
        <AppBar
          style={{height: 64}}
          title="rR"
          showMenuIconButton={false}
          iconElementRight={this.state.authenticated ?
                            <AuthenticatedDropMenu /> : <FlatButton label="Login"/>}
        />
        <div className="App-content">
          <Todos />
        </div>
      </div>
    );
  }
}

export default App;
