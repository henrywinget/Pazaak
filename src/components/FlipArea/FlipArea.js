import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import "./FlipArea.scss";
FlipArea.propTypes = {
	isFlippable: PropTypes.bool.isRequired,
	flipCard: PropTypes.func.isRequired,
};

function FlipArea({ isFlippable, flipCard }) {
	return (
		<div className="flip-area-space" onClick={flipCard}>{isFlippable ? <FontAwesomeIcon icon={faSync}/> : null}</div>
	);
}

export default FlipArea;