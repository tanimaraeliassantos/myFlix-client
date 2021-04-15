import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

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
			this.getProfile(accessToken);
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

	logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState = {
			user: null,
		};
		console.log('logout successful');
		alert('You have been successfully logged out');
		window.open('/', '_self');
	}

	render() {
		const { movies, user } = this.state;

		if (!movies) return <div className="main-view" />;

		return (
			<Router>
				{' '}
				<Button variant="danger" onClick={() => this.logOut()}>
					Log Out
				</Button>
				<Row className="main-view">
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
						exact
						path="/users/:userId"
						render={({}) => {
							if (!user)
								return (
									<LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
								);
							if (movies.length === 0) return;
							return <ProfileView movies={movies} />;
						}}
					/>

					<Route
						path="/genres/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return (
								<GenreView
									genre={movies.find((m) => m.Genre.Name === match.params.name)}
									movies={movies}
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
									director={movies.find(
										(m) => m.Director.Name === match.params.name
									)}
									movies={movies}
								/>
							);
						}}
					/>
				</Row>
			</Router>
		);
	}
}
