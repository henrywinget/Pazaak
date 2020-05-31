import React, { useEffect } from 'react';

import PropTypes from "prop-types";
import { Col, Row } from "antd";
import GameButton from "../GameButton";

import './GameUX.scss';

GameUX.propTypes = {
	wins: PropTypes.number,
	isUser: PropTypes.bool,
	isTurn: PropTypes.bool,
	gameStarted: PropTypes.bool,
	roundScore: PropTypes.number,
	endTurn: PropTypes.func.isRequired,
	standRound: PropTypes.func.isRequired,
	didStand: PropTypes.bool,
	
};

function GameUX({ wins, isUser, isTurn, didStand, roundScore, standRound, gameStarted, endTurn, processAITurn }) {
	useEffect(()=> {
		if(!isUser && isTurn && !didStand && gameStarted) {
			console.log('Processing AI turn...');
			setTimeout(processAITurn, 1000);
		}
	}, [isTurn]);
	
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
	
	const scores = [{ win: false }, { win: false }, { win: false}];
	const buttons = [
			{name: 'End Turn', onClick: endTurn, disabled: !gameStarted || !isTurn},
			{name: 'Stand', onClick: standRound, disabled: !gameStarted || !isTurn}
		];
	
	const returnRoundWins = () => {
		return <div className="score-ball-area" style={scoreBallStyle}>
			{scores.map((round, index) => {
			return <div className="score-ball"
			            key={"Score_ball_" + index}
			            style={{ background: wins >= index + 1 ? "red" : "white" }}>{' '}</div>
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