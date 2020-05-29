import React from 'react';

import PropTypes from "prop-types";
import { Col, Row } from "antd";

import './RoundScores.scss';

RoundScores.propTypes = {
	wins: PropTypes.number,
	isUser: PropTypes.bool,
	roundScore: PropTypes.number,
};

function RoundScores({ wins, isUser, roundScore }) {
	const scoreAreaStyle = {
		display: 'flex',
		flexDirection: isUser ? 'row' : 'row-reverse',
		justifyContent: 'space-between', alignItems: 'center'
	};
	
	const scores = [{ win: false }, { win: false }, { win: false}];
	
	const returnRoundWins = () => {
		const scoreBallStyle = {
			display: 'flex',
			flexDirection: isUser ? 'row' : 'row-reverse',
			justifyContent: 'space-bw',
			alignItems: 'space-between'
		};
		
		return <div className="score-ball-area"
		            style={scoreBallStyle}>
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
	
	return (
		<Row>
			<Col span={24}
			     style={scoreAreaStyle}>
				{returnRoundWins()}
				{returnRoundScores()}
			</Col>
		</Row>
	);
}

export default RoundScores;