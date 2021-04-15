import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
	render() {
		const { movie, onBackClick } = this.props;

		return (
			<Container>
				<div className="movie-view">
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
						<Col sm={8}>
							<div className="movie-title">
								<span className="label">Title </span>{' '}
								<span className="value">{movie.Title}</span>
							</div>
						</Col>
					</Row>

					<Row>
						<Col sm={2}>
							<div className="movie-genre">
								<span className="label">Genre</span>{' '}
							</div>
						</Col>
						<Link to={`/genres/${movie.Genre.Name}`}>
							<Col sm={6}>
								<div className="movie-genre">
									<span className="value">{movie.Genre.Name}</span>
								</div>
							</Col>
						</Link>
					</Row>

					<Row>
						<Col sm={2}>
							<div className="movie-direction">
								<span className="label">Direction</span>{' '}
							</div>
						</Col>
						<Link to={`/directors/${movie.Director.Name}`}>
							<Col sm={6}>
								<div className="movie-direction">
									<span className="value">{movie.Director.Name}</span>
								</div>
							</Col>
						</Link>
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
