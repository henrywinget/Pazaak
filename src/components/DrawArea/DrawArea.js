import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import CardSpace from "../CardSpace";
import './DrawArea.scss';
import PazaakCard from "../PazaakCard";

DrawArea.propTypes = {
	drawSpace: PropTypes.array,
};

function DrawArea(props) {
	const generateCard = ({ card, hasCard }, index) => {
		return <PazaakCard isFaceDown={false}
		                   number={hasCard ? card.number : null}
		                   type={hasCard ? card.type : null}
		                   drawSpaceIndex={index}
		                   isPlayed={!hasCard}/>
	};
	
	return (
		<Row className="draw-area">
			{props.drawSpace.map((space, index) => {
				return <Col style={{ padding: 5 }} span={8} key={"drawn-card-" + index}>
					<CardSpace>
						{generateCard(space, index)}
					</CardSpace>
				</Col>
			})}
		</Row>
	);
}

export default DrawArea;