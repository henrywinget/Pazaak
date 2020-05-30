import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from "antd";
import GameButton from "../GameButton";
import PropTypes from 'prop-types';

import './GameArea.scss';
import tests from "../../utils/tests";
import PlayingSpace from "../PlayingSpace/PlayingSpace";
import Game from "../../utils/Game";
import Card from "../../utils/Card";

import { shuffle, drawSpace } from "../../utils/gameFuncs";

GameArea.propTypes = {

};

function GameArea(props) {
	
	const game = useContext(new Game(tests.players[0], tests.players[2]));
	const [playerOne, setPlayerOne] = useState(tests.players[0]);
	const [playerTwo, setPlayerTwo] = useState(tests.players[1]);
	const [deck, setDeck] = useState(shuffle());
	const [playerTurn, setPlayerTurn] = useState(0);
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [winningPlayer, setWinningPlayer] = useState({});
	const [gameStarted, setGameStarted] = useState(false);
	
	const determineFirst = () => {
		const playerClone = {...playerOne};
		playerClone.isPlayerOne = true;
		playerClone.isTurn = true;
		setPlayerOne(playerClone);
	};
	
	useEffect(() => {
		determineFirst()
	}, []);

	const drawCard = player => {
		// setting clones to alter state
		console.log(`${player.name} drew a card.`);
		const { thisPlayer, thisPlayerFunc } = determinePlayers(player);
		const deckClone = [...deck];
		const values = [...thisPlayer.valuesInPlay];
		const drawSpace = [...thisPlayer.drawSpace];
		const cardDrawn = deckClone.shift();
		thisPlayer.isTurn = true;
		values.push(cardDrawn);
		values.forEach((card, index) => {
			drawSpace[index].card = card;
			drawSpace[index].hasCard = true;
		});
		thisPlayer.roundScore += cardDrawn.number;
		thisPlayer.valuesInPlay = values;
		thisPlayer.drawSpace = drawSpace;
		if(thisPlayer.roundScore > 20) {
			thisPlayer.isBust = true;
			standRound(thisPlayer);
		} else if (thisPlayer.roundScore === 20) {
			standRound(thisPlayer);
		} else {
			thisPlayer.isBust = false;
		}
		// probably a better way to do this
		thisPlayerFunc(thisPlayer);
		setDeck(deckClone);
	};

	const startGame = () => {
		console.log('Starting game...');
		setGameStarted(true);
		drawCard(playerOne);
	};
	
	const resetPlayerRound = () => {
		const firstPlayer = {...playerOne};
		const secondPlayer = {...playerTwo};
		firstPlayer.roundScore = 0;
		secondPlayer.roundScore = 0;
		firstPlayer.drawSpace = drawSpace();
		secondPlayer.drawSpace = drawSpace();
		firstPlayer.valuesInPlay = [];
		secondPlayer.valuesInPlay = [];
		setPlayerOne(firstPlayer);
		setPlayerTwo(secondPlayer);
	};
	
	const endRound = () => {
		console.log('Ending round!');
		const firstPlayer = {...playerOne};
		const secondPlayer = {...playerTwo};
		if(firstPlayer.roundScore < secondPlayer.roundScore) {
			firstPlayer.roundWins++;
		} else if (firstPlayer.roundScore > secondPlayer.roundScore) {
			secondPlayer.roundWins++;
		}
		setPlayerOne(firstPlayer);
		setPlayerTwo(secondPlayer);
		setTimeout(resetPlayerRound, 500);
	};
	
	const determinePlayers = player => {
		const players = {};
		if(player.id === playerOne.id) {
			players.thisPlayer = {...playerOne};
			players.nextPlayer = {...playerTwo};
			players.thisPlayerFunc = setPlayerOne;
			players.nextPlayerFunc = setPlayerTwo;
		}
		else {
			players.thisPlayer = {...playerTwo};
			players.nextPlayer = {...playerOne};
			players.thisPlayerFunc = setPlayerTwo;
			players.nextPlayerFunc = setPlayerOne;
		}
		return players;
	};
	
	const endTurn = player => {
		console.log(`${player.name} is ending their turn.`);
		const { thisPlayer, nextPlayer, thisPlayerFunc, nextPlayerFunc } = determinePlayers(player);
		thisPlayer.isTurn = false;
		nextPlayer.isTurn = true;
		thisPlayerFunc(thisPlayer);
		nextPlayerFunc(nextPlayer);
		if(!nextPlayer.didStand || !nextPlayer.isBust) {
			console.log('About to draw card for next player.');
			drawCard(nextPlayer);
		} else if(nextPlayer.didStand || nextPlayer.isBust) {
			console.log('About to draw another card.');
			drawCard(thisPlayer);
		} else {
			endRound();
		}
	};
	
	const standRound = player => {
		console.log(`${player.name} is standing.`);
		const { thisPlayer, nextPlayer, thisPlayerFunc, nextPlayerFunc } = determinePlayers(player);
		thisPlayer.isTurn = false;
		nextPlayer.isTurn = true;
		thisPlayer.didStand = true;
		thisPlayerFunc(thisPlayer);
		nextPlayerFunc(nextPlayer);
		if(!nextPlayer.didStand || !nextPlayer.isBust) {
			console.log('About to draw card for next player.');
			drawCard(nextPlayer);
		} else {
			endRound();
		}
	};
	
	const processAITurn = player => {
		if(!player.isUser && player.isTurn) {
			const aiPlayer = {...player};
			if(!playerOne.isBust && playerOne.roundScore >= aiPlayer.roundScore && aiPlayer.roundScore < 16) endTurn(aiPlayer);
			else standRound(aiPlayer);
		}
	};
	
	
	const players = [playerOne, playerTwo];
	
	return (
		<Row className="game-area">
			<Col span={24}>
				<GameButton disabled={gameStarted} onClick={startGame} name={'Start'}/>
			</Col>
			{players.map((player, index) => {
				return <PlayingSpace key={"Playing_space_" + index}
				                     gameStarted={gameStarted}
				                     roundsPlayed={roundsPlayed}
				                     processAITurn={() => processAITurn(player)}
				                     endTurn={() => endTurn(player)}
				                     standRound={() => standRound(player)}
				                     drawCard={() => drawCard(player)}
				                     player={player}/>
			})}
		</Row>
	);
}

export default GameArea;