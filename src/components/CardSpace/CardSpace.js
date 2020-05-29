import React from 'react';
import PropTypes from 'prop-types';

import "./CardSpace.scss";
CardSpace.propTypes = {
	children: PropTypes.element,
};

function CardSpace(props) {
	return (
		<div className="card-play-space">
			{props.children}
		</div>
	);
}

export default CardSpace;