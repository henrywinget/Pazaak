import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Space } from 'antd';

import GameArea from "./components/GameArea/GameArea";
import PlayingSpace from "./components/PlayingSpace/PlayingSpace";
import PazaakCard from "./components/PazaakCard";
import tests from "./utils/tests";

function App() {
  const [phase, setPhase] = useState('play');
  const { Header, Footer, Sider, Content } = Layout;
  let content = null;
  
  return (
    <div className="App">
      <Layout>
        <Content style={{padding: '50px', height: '100vh'}}>
            {/*to test playing area*/}
            <GameArea>
                {tests.players.map((player, index) =>  {
                    return <PlayingSpace key={"Playing_space_" + index} player={player}/>
                })}
            </GameArea>
        {/*    /!*to test pazaak cards*!/*/}
        {/*        <Row align={'center'}>*/}
        {/*    {tests.allCardTypes.map((card, index) => {*/}
        {/*        return <PazaakCard key={'Card_' + index} number={card.number} type={card.type}/>*/}
        {/*    })}*/}
        {/*</Row>*/}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
