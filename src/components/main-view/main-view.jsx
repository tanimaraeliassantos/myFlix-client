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
			movies: [],
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
	getProfile(token) {
		axios
			.get('https://myflix-movies-app.herokuapp.com/users', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					users: response.data,
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

	componentWillUnmount() {
		let onLoggingOut = localStorage.removeItem('token');
		if (onLoggingOut !== null) {
			this.state = {
				movies: null,
				selectedMovie: null,
				user: null,
			};
		}
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
		const { movies, user } = this.state;

		/* If there is no user, the LoginView is rendered. If there
	is a user logged in, the user details are *passed as a prop to the LoginView */

		/* Before the movies have been loaded */

		if (!movies) return <div className="main-view" />;
		return (
			<Router>
				<div className="main-view">
					<Route
						exact
						path="/"
						render={() => {
							if (!user)
								return (
									<React.Fragment>
										<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
									</React.Fragment>
								);
							return movies.map((m) => <MovieCard key={m._id} movie={m} />);
						}}
					/>
					<Route path="/register" render={() => <RegistrationView />} />
					<Route
						path="/movies/:movieId"
						render={({ match }) => (
							<MovieView
								movie={movies.find((m) => m._id === match.params.movieId)}
							/>
						)}
					/>
					<Route
						path="/genres/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return (
								<GenreView
									genre={
										movies.find((m) => m.Genre.Name === match.params.name).Genre
									}
								/>
							);
						}}
					/>
					<Route
						path="/directors/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return (
								<DirectorView
									director={
										movies.find((m) => m.Director.Name === match.params.name)
											.Director
									}
								/>
							);
						}}
					/>
					<Route
						path="/username/:Username"
						render={({ match }) => (
							<UserView
								user={users.find((m) => m._id === match.params.movieId)}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}
