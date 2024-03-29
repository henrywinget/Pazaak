import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SideDeck from "../SideDeck";
import DrawArea from "../DrawArea";
import GameUX from "../GameUX";

import { Col, Row, Divider } from "antd";
import GameContext from "../../context/game-context";

PlayingSpace.propTypes = {
	player: PropTypes.object.isRequired,
	drawCard: PropTypes.func.isRequired,
	gameStarted: PropTypes.bool,
	endTurn: PropTypes.func,
	standRound: PropTypes.func,
};

function PlayingSpace({ player, drawCard, endTurn, standRound, gameStarted }) {
	const context = useContext(GameContext);
	const flipCard = card => {
		console.log('Flipping card');
		const cardType = card.specialType === "+" ? "-" : "+";
		context.flipCard(card, cardType, player.id)
	};
	
	const spaceStyle = {
		padding: '0 25px'
	};
	
	return (
		<Col style={spaceStyle}
		     xs={{ span: 24, order: player.isUser ? 1 : 0 }}
		     lg={{ span: 12, order: player.isUser ? 0 : 1 }}>
			<Divider orientation={player.isUser ? "left" : "right"}>{player.name}</Divider>
			<GameUX roundWins={player.roundWins}
			        sideDeck={player.sideDeckInPlay}
			        playerId={player.id}
			        drawCard={drawCard}
			        flipCard={flipCard}
			        playSideCard={context.playSideCard}
			        endTurn={endTurn}
			        standRound={standRound}
			        gameStarted={gameStarted}
			        didStand={player.didStand}
			        isTurn={player.isTurn}
			        isUser={player.isUser}
			        isBust={player.isBust}p
			        playedCardThisRound={player.playedCardThisRound}
			        roundScore={player.roundScore}
			/>
			<DrawArea drawSpace={player.drawSpace}
			          cardsInPlay={player.valuesInPlay}/>
			<Divider orientation={player.isUser ? "left" : "right"}>Side deck</Divider>
			<SideDeck player={player} flipCard={flipCard} playSideCard={context.playSideCard}/>
		</Col>
	);
}

export default PlayingSpace;