import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';

export class UserView extends React.Component {
	render() {
		const { user, onBackClick } = this.props;

		return (
			<Container>
				<div className="user-view">
					<Row>
						<Button
							sm={1}
							variant="danger"
							onClick={() => {
								onBackClick();
							}}
						>
							Back
						</Button>{' '}
						<Col sm={6}>
							<div className="username">
								<span className="label"> Username </span>{' '}
								<span className="value">{user.Username}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col sm={6}>
							<div className="password">
								<span className="label">Password</span>{' '}
							</div>
						</Col>
						<Col sm={6}>
							<div className="password">
								<span className="value">{user.Password}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col sm={6}>
							<div className="password">
								<span className="label">Password</span>{' '}
							</div>
						</Col>
						<Col sm={6}>
							<div className="password">
								<span className="value">{user.Password}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col sm={2}>
							<div className="movie-direction">
								<span className="label">Direction</span>{' '}
							</div>
						</Col>
						<Col sm={6}>
							<div className="movie-direction">
								<span className="value">{movie.Director.Name}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col>
							<div className="movie-description">
								<span className="label">Description </span>{' '}
								<span className="value">{movie.Description}</span>
							</div>
						</Col>
					</Row>

					<Media>
						<img
							className="movie-poster"
							src={movie.ImagePath}
							alt="This is a poster from the movie."
						/>
					</Media>
				</div>
			</Container>
		);
	}
}
