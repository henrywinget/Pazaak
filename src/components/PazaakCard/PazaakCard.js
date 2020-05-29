import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';

import './PazaakCard.scss';

PazaakCard.propTypes = {
	number: PropTypes.number,
	type: PropTypes.string,
	onClick: PropTypes.func,
};

function PazaakCard(props) {
	const determineColor = type => {
		let color = "linear-gradient(to right, #66CD00, #5DFC0A, #83F52C, #5DFC0A, #66CD00)";
		if(type === "+") color = "linear-gradient(to right, #104E8B, #1874CD, #104E8B)"; // blue
		else if(type === "-") color = "linear-gradient(to right, #8B0000, #CD2626, #8B0000)"; // red
		else if (type === "+-") color = "linear-gradient(#1874CD, #104E8B, 50%, #CD2626 25%, #8B0000)"; // blue-red
		return color;
	};
	
	// who needs sass (the irony in this statement)
	const cardStyle = {
		background: '#EEEEE0', // tan
		width: 240,
		border: '#D8D8BF solid 2px',
		borderRadius: '5px',
	};
	
	const outerStyle = {
		padding: "60px 0 100px 0",
		fontSize: '36px',
		color: 'white',
		fontWeight: 'bold',
		borderRadius: '5px',
		backgroundImage: determineColor(props.type),
	};
	
	const numberOuterStyle = {
		background: '#EEEEE0', // tan
		borderRadius: '2px',
		padding: 5,
	};
	
	const innerStyle = {
		fontSize: '36px',
		background: '#0D0D0D', // black
		borderRadius: '5px',
		margin: '0 10px',
		padding: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};
	
	return (
		<div className="Card_space">
			<Card hoverable
			      style={cardStyle}
			      onClick={props.onClick}
			      bordered={true}>
				<div className="card-outer" style={outerStyle}>
					<div className="card-number-outer" style={numberOuterStyle}>
						<div className="card-number-inner" style={innerStyle}>
							 {props.type + props.number}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default PazaakCard;