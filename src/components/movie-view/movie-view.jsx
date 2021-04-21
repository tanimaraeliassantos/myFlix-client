import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container, Button, Row, Col, Media } from 'react-bootstrap';

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	addFavorite(movie) {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		const url = `https://myflix-movies-app.herokuapp.com/users/${user}/movies/$?${movie._id}`;

		const checkMovie = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
		if (checkMovie.includes(movie.Title)) {
			alert('Movie already added on favorite list');
			return;
		}

		axios
			.get(url, '', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				console.log(response);
				checkMovie.push(movie.Title);
				localStorage.setItem('favoriteMovies', JSON.stringify(checkMovie));
				window.open('/users/' + localStorage.getItem('user'), '_self');
				alert('Movie added to your favorites!');
			});
	}

	render() {
		const { movie } = this.props;

		return (
			<Container>
				<div className="movie-view">
					<Row>
						<Link to={`/`}>
							<Button sm={1} variant="danger">
								Back
							</Button>
						</Link>
						<Col sm={8}>
							<div className="movie-title">
								<span className="label">Title </span>{' '}
								<span className="value">{movie.Title}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col sm={2}>
							<div className="movie-genre">
								<span className="label">Genre</span>{' '}
							</div>
						</Col>
						<Link to={`/genres/${movie.Genre.Name}`}>
							<Col sm={6}>
								<div className="movie-genre">
									<span className="value">{movie.Genre.Name}</span>
								</div>
							</Col>
						</Link>
					</Row>

					<Row>
						<Col sm={2}>
							<div className="movie-direction">
								<span className="label">Direction</span>{' '}
							</div>
						</Col>
						<Link to={`/directors/${movie.Director.Name}`}>
							<Col sm={6}>
								<div className="movie-direction">
									<span className="value">{movie.Director.Name}</span>
								</div>
							</Col>
						</Link>
					</Row>
					<div>
						<Button
							variant="danger"
							size="sm"
							onClick={() => this.addFavorite(movie)}
						>
							Add to Favorites
						</Button>
					</div>

					<Row>
						<Col>
							<div className="movie-description">
								<span className="label">Description </span>{' '}
								<span className="value">{movie.Description}</span>
							</div>
						</Col>
					</Row>

					<Media>
						<img
							className="movie-poster"
							src={movie.ImagePath}
							alt="This is a poster from the movie."
						/>
					</Media>
				</div>
			</Container>
		);
	}
}
