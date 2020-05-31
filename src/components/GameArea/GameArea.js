import React, { useEffect, useContext } from 'react';
import { Row, Col } from "antd";
import GameButton from "../GameButton";
import GameContext from "../../context/game-context";
import './GameArea.scss';
import PlayingSpace from "../PlayingSpace/PlayingSpace";


function GameArea(props) {
	const context = useContext(GameContext);
	useEffect(() => context.determinePlayerOne(), []);
	
	const players = [context.playerOne, context.playerTwo];
	
	const startGame = () => {
		context.drawCard(context.playerOne.isTurn ? context.playerOne : context.playerTwo);
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
					                     processAITurn={() => context.processAITurn(player)}
					                     endTurn={() => context.endTurn(player)}
					                     standRound={() => context.standRound(player)}
					                     drawCard={() => context.drawCard(player)}
					                     player={player}/>
				})}
			</Row>
	)
	
}

export default GameArea;