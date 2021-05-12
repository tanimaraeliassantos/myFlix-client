import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { NavLink, Link } from 'react-router-dom';

const Navigation = ({ user, logOut }) => {
	const renderLogout = () => {
		return user === null ? (
			<div></div>
		) : (
			<div>
				<NavLink as={Link} to="/">
					<Button onClick={logOut} variant="danger">
						Logout
					</Button>
				</NavLink>
			</div>
		);
	};
	return (
		<Navbar bg="dark" variant="dark" expand="lg" fixed="top" margin="20px">
			<Navbar.Brand className="font-italic font-weight-bold h2" href={'/'}>
				myFlix
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
				{user && (
					<div>
						<Nav className="mr-auto">
							<Nav.Link href={'/users'}>Profile</Nav.Link>
							<div>{renderLogout()}</div>
						</Nav>
					</div>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigation;
