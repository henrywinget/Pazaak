import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Row, Col, Space } from 'antd';

import PazaakCard from "./components/PazaakCard";
import tests from "./utils/tests";

function App() {
  const [phase, setPhase] = useState('play');
  const { Header, Footer, Sider, Content } = Layout;
  let content = null;
  
  return (
    <div className="App">
      <Layout>
        <Content style={{padding: '0 50px'}} >
                <Row align={'center'}>
                  {tests.cards.map((card, index) => {
                    return <PazaakCard key={'Card_' + index} number={card.number} type={card.type}/>
                  })}
                </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
