import React, { useState, useEffect } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Space } from 'antd';

//player context
import PlayerState from "./context/PlayerState";
import PlayerContext from "./context/player-context";
import PlayerArea from "./components/PlayerArea/PlayerArea";

// game context
import GameState from "./context/GameState";
import GameContext from "./context/game-context";
import GameArea from "./components/GameArea/GameArea";

import API from "./utils/API";

import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  
  const [playerState, setPlayerState] = useState({
      player: {},
      // hasPlayer: true,
      hasPlayer: false,
  });
  
  
  useEffect(() => {
      console.log('running!');
      // api call at the beginning
  }, []);
  
  useEffect(() => {
      console.log('running!');
        // when player state changes
  }, [playerState]);

  const { Content } = Layout;
  // let content = null;
  
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Content className="game-content">
            <PlayerState>
                <PlayerContext.Consumer>
                    {() => playerState.hasPlayer ?
                        <GameState>
                            <GameContext.Consumer>
                                {() => <GameArea/>}
                            </GameContext.Consumer>
                        </GameState> : <PlayerArea setPlayerState={setPlayerState}/>}
                </PlayerContext.Consumer>
            </PlayerState>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
