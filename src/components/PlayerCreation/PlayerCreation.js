import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Divider, Input, Button } from "antd";
import portraits from "../../utils/portraits";
import PerfectScrollbar from 'react-perfect-scrollbar';
import names from  'random-names-generator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './PlayerCreation.scss';
import PlayerContext from "../../context/player-context";

const attributes = [
	{
		title: 'cool',
		description: 'Used to determine who goes first at the beginning of the match. Higher cool means you\'re less likely to go first (no repercussions)',
	},
	{
		title: 'coercion',
		description: 'Used to bait the opponent into holding out for one more card when they would otherwise stand (no repercussions)',
	},
	{
		title: 'deception',
		description: 'Used to attempt to get out of repercussions if caught cheating to avoid loss stat and money loss',
	},
	{
		title: 'negotiation',
		description: 'Used to negotiate higher bids and bribe if caught cheating to avoid a loss stat',
	},
	{
		title: 'charm',
		description: 'Used to negotiate higher bids, bait the opponent, or attempt to get out of repercussions if caught cheating with opposite sex',
	},
	{
		title: 'skulduggery',
		description: 'Used to cheat to pick up an extra side card (failure could mean auto loss)',
	},
	{
		title: 'computers',
		description: 'Used to cheat to trick the computer to dealing the card you need (could lead to less than desirable card and multiple failures could mean auto loss)',
	},
	{
		title: 'perception',
		description: 'Used to tell if the opponent is cheating (passive; no repercussions could result in auto win)',
	},
	{
		title: 'streetwise',
		description: 'Adds an overall luck boost to all stats (potential advantage rolls, no repercussions)',
	},
];


export default function PlayerCreation(props) {
	const [user, setUserName] = useState('');
	const [userStats, setUserStats] = useState({
		cool: 5,
		coercion: 5,
		deception: 5,
		negotiation: 5,
		charm: 5,
		skulduggery: 5,
		computers: 5,
		perception: 5,
		streetwise: 5,
	});
	const [statsLeft, setStatsLeft] = useState(
		// 18
		0
	);
	const [userPortrait, setUserPortrait] = useState(portraits[Object.keys(portraits)[0]]);
	
	const playerContext = useContext(PlayerContext);
	
	useEffect(() => {
		if(!user) {
			generateRandomName();
		}
	});
	
	const setUserStat = (type, statKey) => {
		if(statsLeft > 0 || (type === "-" && userStats[statKey] > 0)) {
			if(type === "-" && userStats[statKey] > 4) {
				setUserStats({
					...userStats,
					[statKey]: userStats[statKey] - 1
				});
				setStatsLeft(statsLeft + 1);
			} else if(type === "+") {
				setUserStats({
					...userStats,
					[statKey]: userStats[statKey] + 1
				});
				setStatsLeft(statsLeft - 1);
			}
		}
	};
	
	const generateRandomName = () => {
		let first = names.random();
		let last = names.random();
		while(first === last) {
			last = names.random();
		}
		setUserName(first + " " + last);
	};
	
	const handleInputChange = e => {
		setUserName(e.target.value);
	};
	
	const onPlayClick = () => {
		const newPlayer = {
			name: user,
			portrait: userPortrait,
			...userStats,
		};
		props.setPlayerState({ player: newPlayer, hasPlayer: true });
		playerContext.setPlayer(newPlayer);
	};
	
	return (
		<div className="player-creation-area">
			<div className="player-editing-space">
				<Row gutter={{ sm: 4, md: 24, lg: 24 }} style={{
					marginRight: 'auto',
					marginLeft:  'auto',
					maxWidth: 1700,
					paddingRight: 10,
					paddingLeft:  10,
					maxHeight: 300,
				}}>
					<Col span={4}>
						<h1 style={{ color: 'white'}}>{user}</h1>
					</Col>
					<Col span={12}>
						<Input placeholder="Player Name"
						       id={"player-name-input"}
						       value={user}
						       onChange={handleInputChange}/>
					</Col>
					<Col span={2}>
						<Button style={{
							background: 'lightblue',
							borderRadius: 25,
						}} onClick={generateRandomName}>
							Random Name
						</Button>
					</Col>
					{!statsLeft && user && userPortrait &&
					<Col span={6} className={"play-pazaak-button"} >
						<Button style={{
							background: 'lightyellow',
							borderRadius: 25,
						}} onClick={onPlayClick}>
							Play Pazaak!
						</Button>
					</Col>
					}
				</Row>
				<Divider />
				<Row gutter={{ sm: 4, md: 24, lg: 24 }}>
					<Col span={4} className={"player-portrait-area"}>
						<img src={userPortrait} width={175} height={175} alt={'Player\'s portrait'}/>
					</Col>
					<Col span={20}>
						<PerfectScrollbar>
							<Row style={{
								marginRight: 'auto',
								marginLeft:  'auto',
								maxWidth: 1700,
								paddingRight: 10,
								paddingLeft:  10,
								maxHeight: 300,
								
							}}>
									{Object.keys(portraits).map((portKey, index) => {
										return <div style={{
											margin: 1,
											padding: '2px 5px'
										}} key={`player-creation-col-${portKey}`}>
											<img style={{
												border: `2px solid ${userPortrait === portraits[portKey] ? 'gold' : 'beige'}`,
												borderRadius: '5px',
												cursor: 'pointer'
											}} className="player-creation-image"
											     onClick={() => setUserPortrait(portraits[portKey])}
											     alt={`Player portrait ${portKey}`}
											     src={portraits[portKey]}/>
										</div>
									})}
							</Row>
						</PerfectScrollbar>
					</Col>
				</Row>
				<Divider />
				<Row gutter={{ sm: 4, md: 24, lg: 24 }}>
					<Col span={24} style={{
						marginRight: 'auto',
						marginLeft:  'auto',
						maxWidth: 1700,
						paddingRight: 10,
						paddingLeft:  10,
						maxHeight: 300,
					}}>
						{attributes.map((attribute, index) => {
							return <Row key={attribute.title + "_" + index}>
								<Col span={3}>
									<h3 style={{
										color: 'white',
										textAlign: 'left'
									}}>{attribute.title.toUpperCase()}</h3>
								</Col>
								<Col span={1} style={{ textAlign: 'right', }}>
									<FontAwesomeIcon icon={faAngleDown}
									                 style={{
									                 	cursor: 'pointer',
										                 display: userStats[attribute.title] < 6 && 'none'
									                 }}
									                 onClick={() => setUserStat('-', attribute.title)}/>
								</Col>
								<Col span={1}  style={{ textAlign: 'center', }}>
									{userStats[attribute.title]}
								</Col>
								<Col span={1} style={{
									textAlign: 'left',
								}}>
									<FontAwesomeIcon icon={faAngleUp}
									                 style={{
										                 cursor: 'pointer',
										                 display: userStats[attribute.title] > 15 && 'none'
									                 }}
									                 onClick={() => setUserStat('+', attribute.title)} />
								</Col>
								<Col span={18}>
									<p style={{ textAlign: 'left' }}>{attribute.description}</p>
								</Col>
								
							</Row>
						})}
						<Row>
							<Col span={4}>
								<h4 style={{
									color: 'white',
									textAlign: 'right'
								}}>Points Left: </h4>
							</Col>
							<Col span={1}>
								<span style={{
									color: statsLeft < 7 ? 'red' : statsLeft > 6 && statsLeft < 16 ? 'orange' : 'lightgreen',
								}}>{statsLeft}</span>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
		);
}