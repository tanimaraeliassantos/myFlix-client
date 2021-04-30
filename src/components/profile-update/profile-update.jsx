import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function ProfileUpdate(props) {
	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const [Email, setEmail] = useState('');
	const [Birthday, setBirthday] = useState('');

	const [usernameError, setUsernameError] = useState({});
	const [passwordError, setPasswordError] = useState({});
	const [emailError, setEmailError] = useState({});
	const [birthdayError, setBirthdayError] = useState({});

	const handleUpdate = (e) => {
		e.preventDefault();

		const isValid = formValidation();

		const url =
			'https://myflix-movies-app.herokuapp.com/users/' +
			localStorage.getItem('user');

		if (isValid) {
			const token = localStorage.getItem('token');
			axios
				.put(
					url,
					{
						Username: Username,
						Password: Password,
						Email: Email,
						Birthday: Birthday,
					},
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				.then((response) => {
					const data = response.data;
					localStorage.setItem('user', data.Username);
					alert('Your profile was update successfully');
					window.open('/', '_self');
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	const formValidation = () => {
		const usernameError = {};
		const passwordError = {};
		const emailError = {};
		const birthdayError = {};
		const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		const checkEmail = emailReg.test(Email);
		let isValid = true;

		if (Username.trim().length < 5) {
			usernameError.usernameShort = 'Username must be at least 5 characters';
			isValid = false;
		}

		if (Username.trim().length > 10) {
			usernameError.usernameLog = 'Username must be maximum 10 characters';
			isValid = false;
		}

		if (Password.trim().length < 5) {
			passwordError.passwordMissing = 'Password must be at least 5 characters';
			isValid = false;
		}

		if (Password.trim().length > 20) {
			passwordError.usernameLog = 'Password must be maximum 10 characters';
			isValid = false;
		}

		if (!checkEmail) {
			emailError.emailInvalid = 'Invalid email';
			isValid = false;
		}

		if (Birthday === null) {
			birthdayError.selectDate = 'Please select date';
		}

		setUsernameError(usernameError);
		setPasswordError(passwordError);
		setEmailError(emailError);
		setBirthdayError(birthdayError);
		return isValid;
	};

	return (
		<Container>
			<h3> Update your account</h3>
			<Form className="registration-form">
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						value={Username}
						placeholder="Enter username"
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
					{Object.keys(usernameError).map((key) => {
						return (
							<div key={key} style={{ color: red }}>
								{usernameError[key]}
							</div>
						);
					})}
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={Password}
						placeholder="Enter password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					{Object.keys(passwordError).map((key) => {
						return (
							<div key={key} style={{ color: 'red' }}>
								{passwordError[key]}
							</div>
						);
					})}
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={Email}
						placeholder="name@example.com"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					{Object.keys(emailError).map((key) => {
						return (
							<div key={key} style={{ color: 'red' }}>
								{emailError[key]}
							</div>
						);
					})}
				</Form.Group>
				<Form.Group>
					<Form.Label>Date of Birth</Form.Label>
					<Form.Control
						type="date"
						value={Birthday}
						placeholder="Select Birthday"
						required
						onChange={(e) => setBirthday(e.target.value)}
					/>
					{Object.keys(birthdayError).map((key) => {
						return (
							<div key={key} style={{ color: 'red' }}>
								{birthdayError[key]}
							</div>
						);
					})}
				</Form.Group>
				<Link to={`/users/`}>
					<Button variant="danger" type="submit" onClick={handleUpdate}>
						{' '}
						Update
					</Button>
				</Link>
			</Form>
		</Container>
	);
}
