import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from "antd";
import GameButton from "../GameButton";
import PropTypes from 'prop-types';

import './GameArea.scss';
import tests from "../../utils/tests";
import PlayingSpace from "../PlayingSpace/PlayingSpace";
import Game from "../../utils/Game";
import Card from "../../utils/Card";

import { shuffle } from "../../utils/gameFuncs";

GameArea.propTypes = {

};

function GameArea(props) {
	
	const game = useContext(new Game(tests.players[0], tests.players[2]));
	const [playerOne, setPlayerOne] = useState(tests.players[0]);
	const [playerTwo, setPlayerTwo] = useState(tests.players[1]);
	const [deck, setDeck] = useState(shuffle());
	const [roundsPlayed, setRoundsPlayed] = useState(0);
	const [winningPlayer, setWinningPlayer] = useState({});
	const [gameStarted, setGameStarted] = useState(false);
	
	const determineFirst = () => {
		const playerClone = {...playerOne};
		playerClone.isPlayerOne = true;
		setPlayerOne(playerClone);
	};
	
	useEffect(() => {
		determineFirst()
	}, []);

	const drawCard = player => {
		// if(deck.length > 0) {
		const deckClone = [...deck];
		const playerClone = {...player};
		const cardDrawn = deckClone.shift();
		playerClone.valuesInPlay.push(cardDrawn);
		playerClone.valuesInPlay.forEach((card, index) => {
			playerClone.drawSpace[index].card = card;
			playerClone.drawSpace[index].hasCard = true;
		});
		playerClone.roundScore += cardDrawn.number;
		if(playerClone.roundScore > 20) {
			playerClone.isBust = true;
		}
		if(playerClone.isPlayerOne) {
			setPlayerOne(playerClone)
		}
		else {
			setPlayerTwo(playerClone);
		}
		setDeck(deckClone);
	};

	const startGame = () => {
		console.log('Starting game...');
		console.log(playerOne);
		console.log(playerTwo);
		setGameStarted(true);
		drawCard(playerOne);
	};
	
	end
	
	const players = [playerOne, playerTwo];
	
	return (
		<Row className="game-area">
			<Col span={24}>
				<GameButton disabled={gameStarted} onClick={startGame} name={'Start'}/>
			</Col>
			{players.map((player, index) => {
				return <PlayingSpace isStarted={gameStarted}
				                     roundsPlayed={roundsPlayed}
				                     drawCard={() => drawCard(player)}
				                     player={player}/>
			})}
		</Row>
	);
}

export default GameArea;