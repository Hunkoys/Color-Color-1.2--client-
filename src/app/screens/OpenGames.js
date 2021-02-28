import { Component, Fragment } from 'react';
import Splash from '../screens/Splash';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Title from '../components/Title';
import Button from '../../generic-components/Button';
import Spacer from '../../generic-components/Spacer';
import Box from '../../generic-components/Box';
import List from '../../generic-components/List';
import ListPit from '../components/ListPit';
import OpenGamesItem from '../components/OpenGamesItem';

import AppContext from '../../AppContext';

// Server

const dataServer = {
  list: [
    {
      id: 'skaj1',
      name: 'Maria',
      boardSize: {
        w: 15,
        h: 15,
      },
    },
    {
      id: 'hueq2',
      name: 'John',
      boardSize: {
        w: 7,
        h: 7,
      },
    },
    {
      id: 'uihowr3',
      name: 'Tanglo',
      boardSize: {
        w: 15,
        h: 15,
      },
    },
    {
      id: '263hed4',
      name: 'Brogodog',
      boardSize: {
        w: 21,
        h: 21,
      },
    },
  ],
};

const dataString = JSON.stringify(dataServer);

// Server

export default class OpenGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openGames: [],
    };
    this.populateList = this.populateList.bind(this);
  }

  componentDidMount() {
    this.fetchList(this.populateList);
  }

  fetchList(then) {
    console.log('Fetched data');
    const data = JSON.parse(dataString);
    const cleanData = this.validateData(data);
    if (cleanData.list === undefined) console.error('Fetched Data is not clean. Please check server');
    else then(cleanData.list);
  }

  validateData(data) {
    let dataIsGood = true;
    if (data === undefined || data.list === undefined) dataIsGood = false;
    else {
      const { list } = data;
      dataIsGood = list.every((openGame) => {
        if (openGame === undefined) return false;
        if (openGame.id === undefined) return false;
        if (openGame.name === undefined) return false;
        if (openGame.boardSize === undefined) return false;
        if (openGame.boardSize.w === undefined) return false;
        if (openGame.boardSize.h === undefined) return false;
        return true;
        /* Try object check {
          id: String,
          name: String,
          boardSize: {
            w: Number,
            h: Number
          }
        } */
      });
    }
    if (!dataIsGood) return {};

    return data;
  }

  populateList(list) {
    const openGames = list.map((openGame) => <OpenGamesItem key={openGame.id} value={openGame.id} data={openGame} />);

    this.setState({ openGames });
  }

  render() {
    return (
      <AppContext.Consumer>
        {(app) => (
          <Screen type={'OpenGames'}>
            <Card>
              <Title>Open Games</Title>
              <ListPit type="block" placeholder={<Title>Empty</Title>} select={(item) => console.log(item)}>
                {this.state.openGames}
              </ListPit>
              <Spacer height={app.ui.buttonSpace} />
              <Box type="button-bar bb-horizontal">
                <Button type="block" action={() => this.fetchList(this.populateList)}>
                  REFRESH
                </Button>
                <Spacer width={app.ui.buttonSpace} />
                <Button type="block" disabled={this.state.selectedGame ? false : true}>
                  JOIN
                </Button>
              </Box>
              <Spacer height={app.ui.backButtonSpace} />
              <Button type="block" action={() => app.goto(Splash)}>
                HOME
              </Button>
              <List select={(value) => console.log(value)}>
                {[
                  <div key="sdfja" id="3029" value={'Maria'}>
                    Maria
                  </div>,
                  <div key="yosaj" id="8379" abno="ksdjfa">
                    23ss
                  </div>,
                  <div key="sjdk" id="1082">
                    abno
                  </div>,
                  <div key="jsdk" id="8319">
                    tanglo
                  </div>,
                ]}
              </List>
            </Card>
          </Screen>
        )}
      </AppContext.Consumer>
    );
  }
}
