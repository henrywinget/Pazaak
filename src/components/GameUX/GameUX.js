import React, { useContext, useEffect, useRef } from 'react';
import GameContext from "../../context/game-context";
import PropTypes from "prop-types";

import { Col, Row } from "antd";
import GameButton from "../GameButton";
import { determineCardScore } from "../../utils/gameFuncs";

import './GameUX.scss';

GameUX.propTypes = {
	isUser: PropTypes.bool,
	isTurn: PropTypes.bool,
	gameStarted: PropTypes.bool,
	roundScore: PropTypes.number,
	endTurn: PropTypes.func.isRequired,
	standRound: PropTypes.func.isRequired,
	didStand: PropTypes.bool,
	roundWins: PropTypes.number,
};

function GameUX({ isBust, isUser, isTurn, didStand, roundScore, standRound, gameStarted, endTurn, roundWins, sideDeck, playerId, playedCardThisRound }) {
	// all games state
	const context = useContext(GameContext);
	
	const processAISideDeck = () => {
		console.log('Analyzing side deck...');
		let hasCardToPlay = false;
		let bestCard = { number: 0, type: '+', specialType: '+' };
		const { playerOne } = context;
		sideDeck.forEach((card) => {
			if(!hasCardToPlay && !card.isPlayed && !playedCardThisRound) {
				const potentialScore = determineCardScore(roundScore, card);
				console.log(`Best card: ${determineCardScore(roundScore, bestCard)} vs: ${potentialScore}`);
				if(potentialScore === 20) {
					bestCard = card;
					hasCardToPlay = true;
				} else if(isBust && potentialScore < 20 && determineCardScore(roundScore, bestCard) < potentialScore) {
					bestCard = card;
					hasCardToPlay = true;
				} else if(playerOne.didStand
					&& !playerOne.isBust
					&& (potentialScore < 20
						&& potentialScore > playerOne.roundScore
						&& determineCardScore(roundScore, bestCard) < potentialScore)) {
					bestCard = card;
					hasCardToPlay = true;
				}
			}
		});
		// console.log(isBust)
		// console.log(bestCard);
		// console.log(sideDeck);
		if(hasCardToPlay) {
			context.playSideCard(bestCard, playerId);
			
			console.log(`Playing a ${bestCard.type !== "177" ? bestCard.type : bestCard.specialType}${bestCard.number} to make score ${roundScore + bestCard.number}`);
		}
		return hasCardToPlay;
	};
	
	const processAILogic = () => {
		// this might be a little redundant but what are you gonna do, it's me
		if(roundScore === 20 || context.playerOne.isBust) {
			standRound(); // always stand here
		} else if (processAISideDeck()) {
			console.log('Playing card.')
		} else if(context.playerOne.didStand && roundScore === context.playerOne.roundScore) {
			standRound(); // kind of tricky, but you should still stand
		} else if(context.playerOne.roundScore > roundScore || roundScore < 16) {
			endTurn(); // only end your turn here
		} else {
			console.log('Other circumstance');
			standRound();
		}
	};
	
	useEffect(()=> {
		if(!isUser && isTurn && !didStand && gameStarted) {
			console.log('Processing AI turn...');
			setTimeout(processAILogic, 1000);
		}
		
	}, [isTurn, processAILogic, isUser, didStand]);
	
	const scoreAreaStyle = {
		display: 'flex',
		flexDirection: isUser ? 'row' : 'row-reverse',
		justifyContent: 'space-between', alignItems: 'center'
	};
	
	const scoreBallStyle = {
		display: 'flex',
		flexDirection: isUser ? 'row' : 'row-reverse',
		justifyContent: 'space-bw',
		alignItems: 'space-between'
	};
	
	const scores = [{ win: false }, { win: false }, { win: false}].map((score, index) => {
			score.win = index + 1 <= roundWins;
			return score;
	});
	const buttons = [
			{name: 'End Turn', onClick: endTurn, disabled: !gameStarted || !isTurn},
			{name: 'Stand', onClick: standRound, disabled: !gameStarted || !isTurn}
		];
	
	const returnRoundWins = () => {
		return <div className="score-ball-area" style={scoreBallStyle}>
			{scores.map((round, index) => {
			return <div className="score-ball"
			            key={"Score_ball_" + index}
			            style={{ background: round.win ? "red" : "white" }}>{' '}</div>
			})}
		</div>
	};
	
	const returnRoundScores = () => {
		return <div className="score-board">
			<span>{roundScore}</span>
		</div>;
	};
	
	const returnButtons = () => {
		if(!isUser) return null;
		return buttons.map((button) => {
			return <GameButton key={"Button_" + button.name}
			                   disabled={button.disabled}
			                   onClick={button.onClick}
			                   name={button.name}/>
		})
	};
	
	return (
		<Row>
			<Col span={24}
			     style={scoreAreaStyle}>
				{returnRoundWins()}
				{returnButtons()}
				{returnRoundScores()}
			</Col>
		</Row>
	);
}

export default GameUX;