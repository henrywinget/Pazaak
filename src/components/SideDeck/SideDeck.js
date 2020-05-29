import React from 'react';
import PropTypes from 'prop-types';
import PazaakCard from "../PazaakCard";
import CardSpace from "../CardSpace";

import { Row, Col } from "antd";

SideDeck.propTypes = {
	player: PropTypes.object,
};

function SideDeck({ player }) {
	return (
		<Row>
			{player.sideDeck.map((card, index) => {
				return <Col key={'Card_' + index} span={6}>
					<CardSpace>
						<PazaakCard isFaceDown={!player.isUser}
						            isPlayed={card.isPlayed}
						            number={card.number}
						            type={card.type}/>
					</CardSpace>
				</Col>
			})}
		</Row>
	);
}

export default SideDeck;