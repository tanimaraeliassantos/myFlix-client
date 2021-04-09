import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
		};
	}

	componentDidMount() {
		axios
			.get('https://myflix-movies-app.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	/* When a movie is clicked this function is invoked and updates the state
 of the selectedMovie property to that movie */
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}

	onBackClick() {
		this.setState({
			selectedMovie: null,
		});
	}

	/* When a user successfully logs in, this function updates the user property
 in state to that particular user */

	onLoggedIn(user) {
		this.setState({
			user,
		});
	}

	render() {
		const { movies, selectedMovie, user } = this.state;

		/* If there is no user, the LoginView is rendered. If there
	is a user logged in, the user details are *passed as a prop to the LoginView */
		if (!user)
			return (
				<React.Fragment>
					<RegistrationView onLoggedIn={(user) => this.onLoggedIn(user)} />
					<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
				</React.Fragment>
			);

		/* Before the movies have been loaded */

		if (!movies) return <div className="main-view" />;
		return (
			<Row className="main-view justify-content-md-center">
				{selectedMovie ? (
					<Col md={8}>
						<MovieView
							movie={selectedMovie}
							onBackClick={() => this.onBackClick()}
						/>
					</Col>
				) : (
					movies.map((movie) => (
						<Col md={3}>
							<MovieCard
								key={movie._id}
								movie={movie}
								onClick={(movie) => this.onMovieClick(movie)}
							/>
						</Col>
					))
				)}
			</Row>
		);
	}
}
