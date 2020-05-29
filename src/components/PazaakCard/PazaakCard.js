import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOldRepublic } from '@fortawesome/free-brands-svg-icons';

import './PazaakCard.scss';

PazaakCard.propTypes = {
	number: PropTypes.number,
	type: PropTypes.string,
	onClick: PropTypes.func,
	isFaceDown: PropTypes.bool,
	isPlayed: PropTypes.bool,
	drawSpaceIndex: PropTypes.number,
};

function PazaakCard(props) {
	
	const determineColor = type => {
		let color = "linear-gradient(to right, #66CD00, #5DFC0A, #83F52C, #5DFC0A, #66CD00)";
		if(type === "+") color = "linear-gradient(to right, #104E8B, #1874CD, #104E8B)"; // blue
		else if(type === "-") color = "linear-gradient(to right, #8B0000, #CD2626, #8B0000)"; // red
		else if (type === "177") color = "linear-gradient(#1874CD, #104E8B, 50%, #CD2626 25%, #8B0000)"; // blue-red
		if(props.isFaceDown) color = "linear-gradient(#CDC9A5, #CDC9A5)";
		return color;
	};
	
	// who needs sass (the irony in this statement)
	const cardStyle = {
		background: '#EEEEE0', // tan
		height: '100%',
		width: "100%",
		border: '#D8D8BF solid 2px',
		borderRadius: '5px',
		display: props.isPlayed ? 'none' : 'inherit',
	};
	
	const outerStyle = {
		padding: "2.5rem 0 3rem 0",
		fontSize: '36px',
		color: !props.isFaceDown ? 'white' : '#CDC9A5',
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
		fontSize: '2rem',
		background: '#0D0D0D', // black
		borderRadius: '5px',
		margin: '0 .5rem',
		padding: '.5rem',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};
	
	const printType = type => {
		return type ? isNaN(type) ? type : String.fromCharCode(type) : type;
	};
	
	return (
		<div className="card-space">
			<Card hoverable
			      style={cardStyle}
			      bodyStyle={{padding: '.75rem'}}
			      onClick={props.onClick}
			      bordered={true}>
				<div className="card-outer" style={outerStyle}>
					<div className="card-number-outer" style={numberOuterStyle}>
						<div className="card-number-inner" style={innerStyle}>
							 {!props.isFaceDown ? printType(props.type) + props.number : <FontAwesomeIcon size="lg" icon={faOldRepublic}/>}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default PazaakCard;