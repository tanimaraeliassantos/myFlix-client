import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
<<<<<<< Updated upstream
			movies: [],
			selectedMovie: null,
=======
>>>>>>> Stashed changes
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

	// 	/* When a movie is clicked this function is invoked and updates the state
	//  of the selectedMovie property to that movie */
	// 	onMovieClick(movie) {
	// 		this.setState({
	// 			selectedMovie: movie,
	// 		});
	// 	}
	// 	/*When Back button is clicked, the selectedMovie goes null and the list of movies is shown*/
	// 	onBackClick() {
	// 		this.setState({
	// 			selectedMovie: null,
	// 		});
	// 	}

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

<<<<<<< Updated upstream
	render() {
		const { movies, user } = this.state;

		/* If there is no user, the LoginView is rendered. If there
	is a user logged in, the user details are *passed as a prop to the LoginView */
=======
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

	/* When a user successfully logs in, this function updates the user property
 in state to that particular user */

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
>>>>>>> Stashed changes

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

let mapStateToProps = (state) => {
	return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
