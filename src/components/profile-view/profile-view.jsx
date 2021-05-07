import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
	Container,
	Button,
	Card,
	Tab,
	Tabs,
	Row,
	Form,
	Col,
} from 'react-bootstrap';

export class ProfileView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Username: '',
			Password: '',
			Email: '',
			Birthday: '',
			FavoriteMovies: [],
			movies: '',
		};
	}

	componentDidMount() {
		let token = localStorage.getItem('token');
		this.getProfile(token);
	}

	formatDate(date) {
		if (date) date = date.substring(0, 10);
		return date;
	}

	getProfile(token) {
		let url =
			'https://myflix-movies-app.herokuapp.com/users/' +
			localStorage.getItem('user');
		axios
			.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				const { movies } = this.props;

				const FavoriteMovies = movies.filter((movie) => {
					return response.data.FavoriteMovies.includes(movie._id);
				});
				console.log(FavoriteMovies);
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: this.formatDate(response.data.Birthday),
					FavoriteMovies: FavoriteMovies,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	// Remove Movie from list of favorites
	removeFavorite(movie) {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		const url = `https://myflix-movies-app.herokuapp.com/users/${user}/movies/${movie._id}`;
		axios
			.delete(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				const favMovies =
					JSON.parse(localStorage.getItem('favoriteMovies')) || [];
				localStorage.setItem(
					'favoriteMovies',
					JSON.stringify(favMovies.filter((id) => id !== movie._id))
				);
				alert('Movie was removed from your Favorites List.');
				this.componentDidMount();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Delete user from users list
	handleUnregister() {
		const token = localStorage.getItem('token');
		const user = localStorage.getItem('user');
		axios
			.delete(`https://myflix-movies-app.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				alert('Your account has been deleted.');
				window.location.pathname = '/';
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;
		if (Username === '') return <p>Loading...</p>;
		console.log(this.state.FavoriteMovies);

		return (
			<div className="align-items-center">
				<Form>
					<div className="text-center">
						<h2 className="mt-5 mb-5">Profile Details</h2>
						<Form.Group controlId="formBasicUsername">
							<h5>Username</h5>
							<Form.Label>{Username}</Form.Label>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<h5>Password</h5>
							<Form.Label>{Password}</Form.Label>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<h5>Email</h5>
							<Form.Label>{Email}</Form.Label>
						</Form.Group>
						<Form.Group controlId="formBasicDate">
							<h5>Date of Birth</h5>
							<Form.Label>{Birthday}</Form.Label>
						</Form.Group>
					</div>

					<div className="text-center">
						<Link to={`update/${Username}`}>
							<Button variant="danger" type="link">
								Update my Profile
							</Button>
						</Link>
					</div>
					<hr className="m-5" />
					<div className="text-center">
						<h2 className="mt-5 mb-5">My Favorite Movies</h2>
						<div className="container d-flex flex-wrap justify-content-center mb-1">
							{FavoriteMovies.map((movie) => {
								return (
									<div
										className="d-flex flex-column align-items-center m-2"
										key={movie._id}
									>
										<Card>
											<Card.Img
												className="movie-card-img"
												src={movie.ImagePath}
											/>
											<Card.Body>
												<Link to={`/movies/${movie._id}`}>
													<Card.Title>{movie.Title}</Card.Title>
												</Link>
											</Card.Body>
											<Card.Footer>
												<Button
													variant="secondary"
													onClick={() => this.removeFavorite(movie)}
												>
													Remove from favorite
												</Button>
											</Card.Footer>
										</Card>
									</div>
								);
							})}
						</div>
					</div>
					<div>
						<Link to={`/`}>
							<Button
								className="m-2"
								variant="light"
								type="link"
								size="md"
								block
							>
								Back to Movies
							</Button>
						</Link>
					</div>
					<div className="text-center">
						<hr className="m-5" />
						<h2 className="text-center"> DANGER ZONE</h2>
						<p className="m-3 text-center">
							Warning: The following action cannot be undone.
						</p>
						<Button
							className="m-3"
							variant="danger"
							size="md"
							onClick={() => this.handleUnregister()}
						>
							Delete Account
						</Button>
					</div>
				</Form>
			</div>
		);
	}
}
