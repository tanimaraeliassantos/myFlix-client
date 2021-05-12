import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// React
import { Row } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

// UI Components

import Navigation from '../Navigation/Navigation';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

class MainView extends React.Component {
	// Construct the component
	constructor() {
		// Call on React.Component
		super();

		// Initialise for the component
		this.state = {};
	}

	// When component is mounted to the DOM
	componentDidMount() {
		// Define a way to get token from localStorage
		let accessToken = localStorage.getItem('token');

		// If token has a value
		if (accessToken !== null) {
			this.setState({
				// set user state with this value
				user: localStorage.getItem('user'),
			});

			// Pass value to other functions
			this.getMovies(accessToken);
			this.getUser(accessToken);
		}
	}

	// Get movies with a token
	getMovies(token) {
		// Fetch data from server side
		axios
			.get('https://myflix-movies-app.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign result to the state
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Get user with a token
	getUser(token) {
		// Define a way to get user from localStorage
		const user = localStorage.getItem('user');

		// Fetch user data from server side
		axios
			.get(`https://myflix-movies-app.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign result to the state
				this.setState({ user: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// On log in, take in authentication Data
	onLoggedIn(authData) {
		console.log(authData);

		//set state to the value of authentication
		this.setState({
			user: authData.User.Username,
		});

		// set item token, user and favoriteMovies to localStorage
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.User.Username);
		localStorage.setItem(
			'favoriteMovies',
			JSON.stringify(authData.User.FavoriteMovies)
		);

		// send token to getMovies and getUser
		this.getMovies(authData.token);
		this.getUser(authData.token);
	}

	// When user logs out
	logOut() {
		// Remove token and user from localStorage
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState = {
			user: null,
		};
		console.log('logout successful');
		alert('You have been successfully logged out');
		window.open('/', '_self');
	}

	// Render the component
	render() {
		// Destructure the props
		let { movies } = this.props;
		let { user } = this.state;

		return (
			<Router>
				<Navigation user={user} logOut={() => this.logOut()} />
				<div className="main-view pt-5 m-5">
					<Row className="pt-3">
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
								return <MoviesList movies={movies} />;
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
							path="/users/"
							render={() => {
								if (movies.length === 0) return <div className="main-view" />;
								return <ProfileView movies={movies} />;
							}}
						/>

						<Route
							path="/users/update/"
							render={() => {
								if (movies.length === 0) return <div className="main-view" />;
								return <ProfileUpdate movies={movies} />;
							}}
						/>

						<Route
							path="/genres/:name"
							render={({ match }) => {
								if (movies.length === 0) return <div className="main-view" />;
								return (
									<GenreView
										genre={movies.find(
											(m) => m.Genre.Name === match.params.name
										)}
										movies={movies}
									/>
								);
							}}
						/>

						<Route
							path="/directors/:name"
							render={({ match }) => {
								if (movies.length === 0) return <div className="main-view" />;
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
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return { movies: state.movies };
};

export default connect(mapStateToProps, {
	setMovies,
})(MainView);
