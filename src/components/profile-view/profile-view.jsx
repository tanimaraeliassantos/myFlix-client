import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';

export class ProfileView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Username: '',
			Password: '',
			Email: '',
			Birthday: '',
			FavoriteMovies: [],
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
		const url = `https://myflix-movies-app.herokuapp.com/users/${user}/movies/$?${movie._id}`;
		axios
			.delete(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert('Movie was removed from your Favorites List.');
				this.componentDidMount();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	// Delete user from users list
	handleDeregister() {
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

		return (
			<Container className="profile-view">
				<Tabs
					defaultActiveKey="profile"
					transition={false}
					className="profile-tabs"
				>
					<Tab className="tab-item" eventKey="profile" title="Profile">
						<Form style={{ width: '20rem', float: 'left' }}>
							<h3 style={{ textAlign: 'left' }}>Profile Details</h3>
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
							<Form.Group controlId="FavoriteMovies">
								<h5>Favorite Movies</h5>
								{FavoriteMovies.map((movie) => {
									return (
										<div key={movie._id}>
											<Card>
												<Card.Img variant="top" src={movie.ImagePath} />
												<Card.Body>
													<Link to={`/movies/${movie._id}`}>
														<Card.Title>{movie.Title}</Card.Title>
													</Link>
												</Card.Body>
											</Card>
											<Button onClick={() => this.removeFavorite(movie)}>
												Remove
											</Button>
										</div>
									);
								})}
							</Form.Group>

							<Link to={`/update/${this.state.Username}`}>
								<Button variant="outline-red" type="link" size="sm" block>
									Edit Profile
								</Button>
							</Link>
							<Button
								variant="danger"
								size="sm"
								block
								onClick={() => this.handleDeregister()}
							>
								Delete Account
							</Button>
						</Form>
					</Tab>
					<Tab className="tab-item" eventKey="delete" title="Delete Profile">
						<Card className="update-card" border="danger">
							<Card.Title className="profile-title">
								{' '}
								Delete your profile
							</Card.Title>
							<Card.Body>
								<Button
									className="button"
									variant="danger"
									onClick={(e) => this.handleDeregister(e)}
								>
									Click here to delete your account.
								</Button>
							</Card.Body>
						</Card>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}
