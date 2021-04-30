import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class DirectorView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { director, movies } = this.props;
		if (!director) return <div className="main-view" />;

		return (
			<div className="director-view">
				<Link to={`/`}>
					<Button sm={1} variant="danger">
						Back
					</Button>
				</Link>
				<Row>
					<div className="director-name">
						<span className="label h2">Name </span>{' '}
						<span className="value">{director.Director.Name}</span>
					</div>
				</Row>
				<Row>
					<div className="director-bio">
						<span className="label">Biography</span>{' '}
						<span className="value">{director.Director.Bio}</span>
					</div>
				</Row>
				<Row>
					<div className="director-birthday">
						<span className="label">Born in </span>{' '}
						<span className="value">{director.Director.Birth}</span>
					</div>
				</Row>
				<Row>
					<div className="director-movies">
						<span className="label"> Movies by {director.Director.Name} </span>
					</div>

					<div className=" d-flex row mp-5 mx-3">
						{movies.map((movie) => {
							if (movie.Director.Name === director.Director.Name) {
								return (
									<div key={movie._id}>
										<Card style={{ width: '15rem' }}>
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

DirectorView.propTypes = {
	Movie: PropTypes.shape({
		Director: {
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string,
			Birth: PropTypes.number,
			Obit: PropTypes.number,
		},
	}),
};
