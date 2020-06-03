import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PazaakCard from "../PazaakCard";
import CardSpace from "../CardSpace";

import { Row, Col } from "antd";
import GameContext from "../../context/game-context";

SideDeck.propTypes = {
	player: PropTypes.object,
};

function SideDeck({ player }) {
	const context = useContext(GameContext);
	
	return (
		<Row>
			{player.sideDeckInPlay.map((card, index) => {
				return <Col key={'Card_' + index} span={6}>
					<CardSpace>
						<PazaakCard isFaceDown={!player.isUser}
						            isPlayed={card.isPlayed}
						            number={card.number}
						            onClick={() => !player.playedCardThisRound ? context.playSideCard(card, player) : null}
						            type={card.type}/>
					</CardSpace>
				</Col>
			})}
		</Row>
	);
}

export default SideDeck;