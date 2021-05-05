import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		/* Send a request to the server for authentication */
		axios
			.post('https://myflix-movies-app.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch((e) => {
				console.log('no such user');
			});
	};

	return (
		<Form>
			<h1>Welcome to myFlix!</h1>

			<Form.Group controlId="formUsername">
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Button variant="danger" type="submit" onClick={handleSubmit}>
				Login
			</Button>
			<Form.Group className="text-center">
				<span>Not yet a member?</span>
				<Link to="/register">
					<Button variant="link" className="text-xs">
						Register Now
					</Button>
				</Link>
			</Form.Group>
		</Form>
	);
}
