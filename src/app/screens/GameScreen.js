import { Component } from 'react';
import { io } from 'socket.io-client';
import AppContext from '../../AppContext';
import { faces } from '../../common/classes';
import { getCookie } from '../../common/functions';
import { server } from '../../common/network';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Card from '../components/Card';
import Screen from '../components/Screen';
import Board from './game-screen/Board';
import ControllerPanel, { action } from './game-screen/ControllerPanel';
import PlayersHud from './game-screen/PlayersHud';
import LoadingScreen from './LoadingScreen';
import Splash from './Splash';

const me = getCookie();

function is(it, that) {
  return it && it.id === that && that.id;
}

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.game,
      challenger: {
        ...this.props.game.challenger,
        id: 123,
        username: 'nicko',
        faceName: 'devil',
        score: 31,
      },
    };
  }

  act = (player, type, data) => {
    console.log(player, type.toString(), data);
    if (type === action.confirm) {
      this.setState((game) => {
        const turn = (game.turn && game.turn.id) === (game.host && game.host.id) ? game.challenger : game.host;
        return { turn };
      });
    }
  };

  render() {
    const game = this.state;

    return (
      <AppContext.Consumer>
        {(app) => {
          const [screen, setScreen] = app.screenHook;
          game.host = {
            ...game.host,
            ...{
              score: 30,
            },
          };
          const quitGame = () => {
            server('quit-game').then((success) => {
              if (success) setScreen(<Splash />);
            });
            setScreen(<LoadingScreen />);
          };
          return (
            <Screen name="GameScreen">
              <Card>
                <Button type="block" action={quitGame}>
                  Quit
                </Button>
                <PlayersHud left={game.host} right={game.challenger} />
                <Spacer type="h-gutter" />
                <Spacer type="h-gutter" />
                <Board colorTable={game.board.table} />
                <Spacer type="h-gutter" />
                <ControllerPanel game={this.state} onAct={this.act} />
                <Spacer type="h-gutter" />
              </Card>
            </Screen>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
