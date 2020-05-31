import React, { useState } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Space } from 'antd';
import GameState from "./context/GameState";
import GameContext from "./context/game-context";
import GameArea from "./components/GameArea/GameArea";
import PlayingSpace from "./components/PlayingSpace/PlayingSpace";
import PazaakCard from "./components/PazaakCard";
import tests from "./utils/tests";
import Game from "./utils/Game";

function App() {
  
  const [phase, setPhase] = useState('play');

  const { Header, Footer, Sider, Content } = Layout;
  let content = null;
  
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Content className="game-content">
            <GameState>
                <GameContext.Consumer>
                    {(context) => <GameArea/>}
                </GameContext.Consumer>
            </GameState>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
