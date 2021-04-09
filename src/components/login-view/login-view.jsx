import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const handleSubmit = (e) => {
	e.preventDefault();
	axios
		.post('https://myflix-movies-app.herokuapp.com/login', {
			Username: username,
			Password: password,
		})
		.then((response) => {
			const data = response.data;
			props.onLoggedInd(data);
		})
		.catch((e) => {
			console.log('no such user');
		});
};

return (
	<Form>
		<Form.Group controlId="formUsername">
			<Form.Label>Username:</Form.Label>
			<Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
		</Form.Group>

		<Form.Group controlId="formPassword">
			<Form.Label>Password:</Form.Label>
			<Form.Control
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
		</Form.Group>
		<Button variant="danger" type="submit" onClick={handleSubmit}>
			Submit
		</Button>
	</Form>
);
