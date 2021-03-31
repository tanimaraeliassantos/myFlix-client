import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;

		return (
			<div
				className="movie-card"
				onClick={() => {
					onClick(movie);
				}}
			>
				{movie.Title}
			</div>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string,
			Birth: PropTypes.string,
			Death: PropTypes.string,
		}),
		ImagePath: PropTypes.string.isRequired,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
