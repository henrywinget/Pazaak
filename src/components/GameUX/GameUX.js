import React, { useContext, useEffect, useRef } from 'react';

import PropTypes from "prop-types";
import { Col, Row } from "antd";
import GameButton from "../GameButton";

import './GameUX.scss';
import { endTurn } from "../../context/reducers";
import GameContext from "../../context/game-context";

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

function GameUX({ isUser, isTurn, didStand, roundScore, standRound, gameStarted, endTurn, roundWins}) {
	// all games state
	const context = useContext(GameContext);
	
	
	const processAILogic = () => {
		if(roundScore === 20 || context.playerOne.isBust) {
			standRound(); // always stand here
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