import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class GenreView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { genre, movies } = this.props;
		if (!genre) return <div className="main-view" />;

		return (
			<div className="genre-view">
				<Button
					sm={1}
					variant="danger"
					onClick={() => {
						onBackClick();
					}}
				>
					Back
				</Button>{' '}
				<Row>
					<div className="genre-name">
						<span className="label h2">Name </span>{' '}
						<span className="value">{genre.Genre.Name}</span>
					</div>
				</Row>
				<Row>
					<div className="genre-description">
						<span className="label">Description</span>{' '}
						<span className="value">{genre.Genre.Description}</span>
					</div>
				</Row>
				<Row>
					<div className="genre-movies">
						<span className="label">
							{' '}
							Movies in the {genre.Genre.Name} genre:{' '}
						</span>
					</div>

					<div className=" d-flex row mp-5 mx-3">
						{movies.map((movie) => {
							if (movie.Genre.Name === genre.Genre.Name) {
								return (
									<div key={movie._id}>
										<Card className="mb-5 mr-5 h-20" style={{ width: '15rem' }}>
											<Card.Img variant="top" src={movie.ImagePath} />
											<Card.Body>
												<Link
													className="text-muted"
													to={`/movies/${movie._id}`}
												>
													<Card.Title>{movie.Title}</Card.Title>
												</Link>
												<Card.Text>
													{movie.Description.substring(0, 50)}...
												</Card.Text>
											</Card.Body>
											<Card.Footer className="bg-white">
												<Link to={`/movies/${movie._id}`}>
													<Button variant="Link" className="read-more-link">
														Read More
													</Button>
												</Link>
											</Card.Footer>
										</Card>
									</div>
								);
							}
						})}
					</div>
				</Row>
			</div>
		);
	}
}

GenreView.propTypes = {
	Movie: PropTypes.shape({
		Genre: {
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string,
		},
	}),
};
