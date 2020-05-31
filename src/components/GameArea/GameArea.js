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
		if(playerOne.didStand) {
			if(!playerTwo.didStand || !playerTwo.isBust) {
				console.log('About to draw card for next player.');
				context.drawCard(playerTwo);
			} else if(playerTwo.didStand || playerTwo.isBust) {
				console.log('About to draw another card.');
				context.drawCard(playerOne);
			} else {
				context.endRound();
			}
		}
	};
	
	useEffect(() => {
		if(context.playerOne.didStand) {
			handleStandLogic(context.playerOne, context.playerTwo);
		} else if(context.playerTwo.didStand) {
			handleStandLogic(context.playerTwo, context.playerOne);
		}
	}, [context.playerOne.didStand, context.playerTwo.didStand]);
	
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
		}
		else {
			players.thisPlayer = {...context.playerTwo};
			players.nextPlayer = {...context.playerOne};
		}
		players.thisPlayerKey = players.isPlayerOne ? 'playerOne' : 'playerTwo';
		players.nextPlayerKey = !players.isPlayerOne ? 'playerOne' : 'playerTwo';
		return players;
	};
	
	const endTurn = player => {
		console.log(`${player.name} is ending their turn.`)
		const { thisPlayer, nextPlayer } = determinePlayers(player.id);
		if(!nextPlayer.didStand || !nextPlayer.isBust) {
			console.log('About to draw card for next player.');
			context.drawCard(nextPlayer);
		} else if(nextPlayer.didStand || nextPlayer.isBust) {
			console.log('About to draw another card.');
			context.drawCard(thisPlayer);
		} else {
			context.endRound();
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