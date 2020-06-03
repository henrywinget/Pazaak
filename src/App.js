import React, { useState } from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Space } from 'antd';
import GameState from "./context/GameState";
import GameContext from "./context/game-context";
import GameArea from "./components/GameArea/GameArea";

function App() {
  
  // const [phase, setPhase] = useState('play');

  const { Content } = Layout;
  // let content = null;
  
  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Content className="game-content">
            <GameState>
                <GameContext.Consumer>
                    {() => <GameArea/>}
                </GameContext.Consumer>
            </GameState>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
