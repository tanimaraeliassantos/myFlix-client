import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;

		return (
			<CardDeck>
				<Card bg="Light" border="danger" style={{ width: '18rem' }}>
					<Card.Img variant="top" src={movie.ImagePath} />
					<Card.Body>
						<Card.Title>{movie.Title}</Card.Title>
						<Card.Text>{movie.Description} </Card.Text>
					</Card.Body>
					<Button variant="danger" block onClick={() => onClick(movie)}>
						Open
					</Button>
				</Card>
			</CardDeck>
		);
	}
}
