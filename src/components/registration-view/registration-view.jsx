import axios from 'axios';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleRegister = (e) => {
		e.preventDefault();
		axios
			.post('https://myflix-movies-app.herokuapp.com/users', {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday,
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form>
			<h2> Join myFlix now!</h2>
			<Form.Group controlId="formUsername">
				<Form.Label className="text-base">Username:</Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formEmail">
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</Form.Group>
			<Form.Group controlId="formBirthday">
				<Form.Label>Date of Birth:</Form.Label>
				<Form.Control
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
				/>
			</Form.Group>
			<Button variant="danger" type="submit" onClick={handleRegister}>
				{' '}
				Register{' '}
			</Button>
			<Form.Group className="text-center">
				<span>Already have an account?</span>
				<Link to="/">
					<Button variant="link" className="text-xs">
						Login
					</Button>
				</Link>
			</Form.Group>
		</Form>
	);
}
