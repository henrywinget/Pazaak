import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from "antd";
import GameButton from "../GameButton";
import PropTypes from 'prop-types';
import GameContext from "../../context/game-context";
import './GameArea.scss';
import tests from "../../utils/tests";
import PlayingSpace from "../PlayingSpace/PlayingSpace";
import Game from "../../utils/Game";
import Card from "../../utils/Card";

import { shuffle, drawSpace } from "../../utils/gameFuncs";
import { drawCard, endRound } from "../../context/reducers";

GameArea.propTypes = {

};

function GameArea(props) {
	const context = useContext(GameContext);
	const players = [context.playerOne, context.playerTwo];
	
	const handleStandLogic = (playerOne, playerTwo) => {
		console.log('Detected player stand. Handling state logic.')
		if(playerOne.didStand) {
			if(playerTwo.isBust || playerOne.isBust) {
				context.endRound();
			}
			else if(!playerTwo.didStand) {
				context.drawCard(playerTwo);
			} else {
				context.endRound();
			}
		}
	};
	
	useEffect(() => {
		if(context.playerStood) {
			if(context.playerOne.didStand && !context.playerTwo.didStand) {
				handleStandLogic(context.playerOne, context.playerTwo);
			} else if(context.playerTwo.didStand && !context.playerOne.didStand) {
				handleStandLogic(context.playerTwo, context.playerOne);
			} else {
				context.endRound();
			}
		}
	}, [context.playerStood, handleStandLogic, context.playerOne, context.playerTwo]);
	
	const startGame = () => {
		if(context.playerOne.isTurn) {
			context.drawCard(context.playerOne)
		} else {
			context.drawCard(context.playerTwo);
		}
	};
	
	const determinePlayers = id => {
		const players = {};
		if(id === context.playerOne.id) {
			players.thisPlayer = {...context.playerOne};
			players.nextPlayer = {...context.playerTwo};
			players.thisPlayerKey = 'playerOne';
			players.nextPlayerKey = 'playerTwo';
		}
		else {
			players.thisPlayer = {...context.playerTwo};
			players.nextPlayer = {...context.playerOne};
			players.thisPlayerKey = 'playerTwo';
			players.nextPlayerKey = 'playerOne';
		}
		return players;
	};
	
	const endTurn = player => {
		console.log(`${player.name} is ending their turn.`);
		const { thisPlayer, nextPlayer } = determinePlayers(player.id);
		if(nextPlayer.didStand) {
			context.drawCard(thisPlayer);
		} else {
			context.drawCard(nextPlayer);
		}

	};
	
	const standRound = player => {
		
		context.standRound(player);
	};
	
	
	return (
		<Row className="game-area">
			<Col span={24}>
				<GameButton disabled={context.gameStarted} onClick={startGame} name={'Start'}/>
			</Col>
			{players.map((player, index) => {
				return <PlayingSpace key={"Playing_space_" + index}
				                     gameStarted={context.gameStarted}
				                     roundsPlayed={context.roundsPlayed}
				                     endTurn={() => endTurn(player)}
				                     standRound={() => standRound(player)}
				                     drawCard={() => context.drawCard(player)}
				                     player={player}/>
			})}
		</Row>
	);
}

export default GameArea;