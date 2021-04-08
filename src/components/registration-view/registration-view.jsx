import axios from 'axios';
import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
	const [username, setUsername] = useState('test1');
	const [password, setPassword] = useState('test1');
	const [email, setEmail] = useState('test1@mail.com');
	const [birthday, setBirthday] = useState('1990-01-01');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('SUBMIT', username, password, email, birthday);
		axios
			.post('https://myflix-movies-app.herokuapp.com/users', {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday,
			})
			.then((response) => {
				console.log('RESPONSE', response.data);
				props.onLoggedIn(response.data);
			});
	};

	return (
		<Form>
			<Form.Group as={Row} controlId="formUsername">
				<Form.Label column sm="2">
					Username
				</Form.Label>
				<Col sm="10">
					<Form.Control
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="formPassword">
				<Form.Label column sm="2">
					Password
				</Form.Label>
				<Col sm="10">
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="formEmail">
				<Form.Label column sm="2">
					Email
				</Form.Label>
				<Col sm="10">
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} controlId="formBirthday">
				<Form.Label column sm="2">
					Date of Birth
				</Form.Label>
				<Col sm="10">
					<Form.Control
						type="date"
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
					/>
				</Col>
			</Form.Group>
			<Button variant="danger" type="submit" onClick={handleSubmit}>
				{' '}
				Register{' '}
			</Button>
		</Form>
	);
}
