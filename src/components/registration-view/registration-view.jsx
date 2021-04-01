import axios from 'axios';
import React, { useState } from 'react';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

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
		<form>
			<label>
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<label>
				Email:
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				Birthday:
				<input
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
				/>
			</label>
			<button type="submit" onClick={handleSubmit}>
				{' '}
				Submit{' '}
			</button>
		</form>
	);
}
