import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<Card
				border="danger"
				style={{
					width: '20em',
					margin: '1em',
				}}
			>
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Card.Text>{movie.Description.substring(0, 100)}... </Card.Text>
					<Link to={`/movies/${movie._id}`}>
						<Button variant="danger" block>
							Open
						</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}
