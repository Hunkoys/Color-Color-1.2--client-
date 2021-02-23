import { Component } from 'react';
import { Accessor } from './standard/standard';
import Splash from './app/Splash';
import AppContext from './AppContext';

import './app.scss';

import CreateBoard from './app/CreateBoard';
import OpenGames from './app/OpenGames';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: OpenGames,
      username: '',
    };

    const elementSpace = '12px';

    this.appInterface = {
      state: this.state,
      goto: (screen) => {
        this.setState({ screen });
      },
      username: new Accessor(this, 'username'),
      ui: {
        elementSpace: elementSpace,
        buttonSpace: elementSpace,
        backButtonSpace: '36px',
      },
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.appInterface}>
        <this.state.screen />
      </AppContext.Provider>
    );
  }
}
