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
		<div className={isFlippable ? "flip-area-space flippable" : "flip-area-space"} onClick={isFlippable ? flipCard : null}>{isFlippable ? <FontAwesomeIcon icon={faSync}/> : null}</div>
	);
}

export default FlipArea;