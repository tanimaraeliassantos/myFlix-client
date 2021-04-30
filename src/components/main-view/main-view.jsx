import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-update/profile-update';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import {
	FormControl,
	Form,
	Nav,
	Navbar,
	Button,
	Row,
	Link,
} from 'react-bootstrap';

class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			user: null,
		};
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

	// Get movies with a GET request to Heroku

	getMovies(token) {
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

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.User.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.User.Username);
		localStorage.setItem(
			'favoriteMovies',
			JSON.stringify(authData.User.FavoriteMovies)
		);
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
		// Destructure
		let { movies } = this.props;
		let { user } = this.state;

		return (
			<Router>
				<Navbar bg="light" expand="lg" fixed="top" margin-bottom="20px">
					<Navbar.Brand href={'/'}>myFlix</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href={'/'}>Home</Nav.Link>
							<Nav.Link href={'/users/' + user}>Profile</Nav.Link>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Button variant="danger">Search</Button>
						</Form>
						<Form inline>
							<Button variant="danger" onClick={() => this.logOut()}>
								Logout
							</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
				<div className="main-view pt-5">
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
							path="/users/:Username"
							render={() => {
								if (movies.length === 0) return <div className="main-view" />;
								return <ProfileView movies={movies} />;
							}}
						/>

						<Route
							path="/users/update/:Username"
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

let mapStateToProps = (state) => {
	return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
