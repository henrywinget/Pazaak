import React from 'react';
import PropTypes from 'prop-types';

import { Button } from "antd";

GameButton.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

function GameButton({ name, onClick, disabled }) {
	return (
		<Button disabled={disabled} onClick={onClick}>{name}</Button>
	);
}

export default GameButton;