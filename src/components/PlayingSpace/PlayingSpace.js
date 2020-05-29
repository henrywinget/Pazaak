import React from 'react';
import PropTypes from 'prop-types';

import { Col } from "antd";
import tests from "../../utils/tests";

PlayingSpace.propTypes = {
	player: PropTypes.object,
};

function PlayingSpace(props) {
	return (
		<Col xs={{ span: 24, order: props.player.isUser ? 1 : 0 }}
		     lg={{ span: 12, order: props.player.isUser ? 0 : 1 }}>
			{props.player.isUser ? 'You' : 'Opponent'}
		</Col>
	);
}

export default PlayingSpace;