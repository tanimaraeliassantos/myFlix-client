import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export class UserCard extends React.Component {
	render() {
		const { user, onClick } = this.props;

		return (
			<CardDeck>
				<Card
					bg="Light"
					border="danger"
					style={{
						height: '30rem',
						margin: '1rem',
						overflowY: 'scroll',
					}}
				>
					{' '}
					<Card.Img variant="top" src="holder.js/171x180" roundedCircle />
					<Card.Body>
						<Card.Title>{user.Username}</Card.Title>
						<Card.Text>
							{(user.Email, user.Birthday, user.FavoriteMovies)}{' '}
						</Card.Text>
					</Card.Body>
					<Button variant="danger" block onClick={() => onClick(user)}>
						Open
					</Button>
				</Card>
			</CardDeck>
		);
	}
}
