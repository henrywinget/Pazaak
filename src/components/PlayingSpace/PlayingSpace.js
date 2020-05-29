import React from 'react';
import PropTypes from 'prop-types';
import SideDeck from "../SideDeck";
import DrawArea from "../DrawArea";
import RoundScores from "../RoundScores";

import { Col, Row, Divider } from "antd";
import tests from "../../utils/tests";

PlayingSpace.propTypes = {
	player: PropTypes.object,
};

function PlayingSpace({ player }) {
	const spaceStyle = {
		padding: '0 25px'
	};
	
	return (
		<Col style={spaceStyle}
		     xs={{ span: 24, order: player.isUser ? 1 : 0 }}
		     lg={{ span: 12, order: player.isUser ? 0 : 1 }}>
			<Divider orientation={player.isUser ? "left" : "right"}>{player.name}</Divider>
			<RoundScores wins={player.roundWins} isUser={player.isUser} roundScore={player.roundScore}/>
			<DrawArea drawSpace={tests.drawSpace}/>
			<Divider orientation={player.isUser ? "left" : "right"}>Side deck</Divider>
			<SideDeck player={player}/>
		</Col>
	);
}

export default PlayingSpace;