import React from 'react';

import PropTypes from "prop-types";
import { Col, Row } from "antd";
import GameButton from "../GameButton";

import './GameUX.scss';

GameUX.propTypes = {
	wins: PropTypes.number,
	isUser: PropTypes.bool,
	roundScore: PropTypes.number,
	player: PropTypes.object.isRequired,
	drawCard: PropTypes.func.isRequired,
};

function GameUX({ wins, isUser, roundScore, drawCard }) {
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
			{name: 'End Turn', onClick: drawCard},
			{name: 'Stand', onClick: function () {}}
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
		return buttons.map((button, index) => {
			return <GameButton onClick={button.onClick} name={button.name}/>
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