import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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
	getMovies(token) {
		axios
			.get('https://myflix-movies-app.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	/* When a movie is clicked this function is invoked and updates the state
 of the selectedMovie property to that movie */
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}
	/*When Back button is clicked, the selectedMovie goes null and the list of movies is shown*/
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

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.User.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.User.Username);
		this.getMovies(authData.token);
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
