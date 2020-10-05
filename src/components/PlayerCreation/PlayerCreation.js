import React from 'react';
import { Row, Col, } from "antd";

import './PlayerCreation.scss';

const attributes = [
	{
		title: 'COOL',
		description: '',
	},
	{
		title: 'COERCION',
		description: '',
	},
	{
		title: 'DECEPTION',
		description: '',
	},
	{
		title: 'NEGOTIATION',
		description: '',
	},
	{
		title: 'CHARM',
		description: '',
	},
	{
		title: 'SKULDUGGERY',
		description: '',
	},
	{
		title: 'COMPUTERS',
		description: '',
	},
	{
		title: 'PERCEPTION',
		description: '',
	},
	{
		title: 'STREETWISE',
		description: '',
	},
];

export default function PlayerCreation(props) {
	return (
		<Row className="player-creation-area">
			<Col className="player-editing-space" span={24}>
				<Row>
					<Col span={12}>
						{attributes.map((attribute, index) => {
							return <Row key={attribute.title + "_" + index}>
								<Col span={18}>
									<h3 style={{color: 'white'}}>{attribute.title}</h3>
								</Col>
								<Col span={6}>
									0
								</Col>
							</Row>
						})}
					</Col>
					<Col span={12}>
					
					</Col>
				</Row>
			</Col>
		</Row>
		);
}