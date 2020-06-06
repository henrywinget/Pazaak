import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PazaakCard from "../PazaakCard";
import CardSpace from "../CardSpace";
import FlipArea from "../FlipArea";

import { Row, Col } from "antd";
import GameContext from "../../context/game-context";

SideDeck.propTypes = {
	player: PropTypes.object,
};

function SideDeck({ player }) {
	const context = useContext(GameContext);
	const flipCard = card => {
		console.log('Flipping card');
		context.flipCard(card, player.id)
	};
	return (
		<Row>
			{player.sideDeckInPlay.map((card, index) => {
				return <Col key={'Card_' + index} span={6}>
					<CardSpace>
						<PazaakCard isFaceDown={!player.isUser}
						            isPlayed={card.isPlayed}
						            number={card.number}
						            onClick={() => !player.playedCardThisRound ? context.playSideCard(card, player) : null}
						            specialType={card.specialType}
						            type={card.type}/>
					</CardSpace>
				</Col>
			})}
			{player.sideDeckInPlay.map((card, index) => {
				return <Col key={'Flip_area_' + index} span={6}>
					<FlipArea flipCard={() => flipCard(card)} isFlippable={player.isUser && card.type === "177"}/>
				</Col>
			})}
		</Row>
	);
}

export default SideDeck;