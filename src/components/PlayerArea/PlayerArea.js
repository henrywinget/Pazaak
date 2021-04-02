import React from 'react';

import PlayerCreation from "../PlayerCreation/PlayerCreation";

export default function PlayerArea(props) {
	return (
		<div>
			<PlayerCreation setPlayerState={props.setPlayerState}/>
		</div>
	);
}