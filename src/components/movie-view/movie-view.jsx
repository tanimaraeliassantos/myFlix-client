import React from 'react';

export class MovieView extends React.Component {
	componentDidMount() {
		document.addEventListener('keypress', (event) => {
			console.log(event.key);
		});
	}

	render() {
		const { movie, onBackClick } = this.props;

		return (
			<div className="movie-view">
				<img className="movie-poster" src={movie.ImagePath} />
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>
				<button
					onClick={() => {
						onBackClick(null);
					}}
				>
					Back
				</button>
			</div>
		);
	}
}
