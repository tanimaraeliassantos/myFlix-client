import React from 'react';

export class MovieCard extends React.Component {
	render() {
		const { movie, onMovieClick } = this.props;

		return (
			<div onClick={() => onMovieClick(movie)} className="movie-card">
				{movie.Title}
			</div>
		);
	}
}
