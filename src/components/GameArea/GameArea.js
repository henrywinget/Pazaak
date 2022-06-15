import React, { useEffect, useContext } from 'react';
import { Row, Col } from "antd";
import GameButton from "../GameButton";
import PlayerContext from "../../context/player-context";
import GameContext from "../../context/game-context";
import './GameArea.scss';
import PlayingSpace from "../PlayingSpace/PlayingSpace";

import { determinePlayers, rollSkill } from "../../utils/gameFuncs";

function GameArea() {
	const context = useContext(GameContext);
	const playerContext = useContext(PlayerContext);
	const players = [context.playerOne, context.playerTwo];
	
	const handleStandLogic = (playerOne, playerTwo) => {
		console.log('Detected player stand. Handling state logic.');
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
	
	useEffect(() =>{
		console.log('setting playerstate')
		context.setPlayerOne(playerContext);
	}, [playerContext]);
	
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
	}, [context, handleStandLogic]);
	
	const startGame = () => {
		const playerGoingFirst = {...determineFirst(context.playerOne, context.playerTwo)};
		console.log(playerGoingFirst.name + " is going first!");
		context.drawCard(playerGoingFirst);
	};
	
	const determineFirst = (playerOne, playerTwo) => {
		const p1Cool = rollSkill(playerOne.cool);
		const p2Cool = rollSkill(playerTwo.cool);
		if(p1Cool === p2Cool) return determineFirst(playerOne, playerTwo); // redo going first skill checks
		else if (p1Cool > p2Cool) return playerTwo;
		else return playerOne;
	};
	
	const endTurn = player => {
		console.log(`${player.name} is ending their turn.`);
		const { thisPlayer, nextPlayer } = determinePlayers(player.id, context);
		if(nextPlayer.didStand) {
			context.drawCard(thisPlayer);
		} else {
			context.drawCard(nextPlayer);
		}

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
				                     standRound={() => context.standRound(player)}
				                     drawCard={() => context.drawCard(player)}
				                     player={player}/>
			})}
		</Row>
	);
}

export default GameArea;