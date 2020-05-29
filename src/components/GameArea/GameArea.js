import React from 'react';
import { Row } from "antd";
import PropTypes from 'prop-types';

import './GameArea.scss';

GameArea.propTypes = {
	children: PropTypes.node.isRequired,
};

function GameArea(props) {
	return (
		<Row className="game-area">
			{props.children}
		</Row>
	);
}

export default GameArea;