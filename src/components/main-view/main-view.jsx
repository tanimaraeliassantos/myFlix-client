import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: null,
			selectedMovie: null,
		};
	}

	componentDidMount() {
		axios
			.get('https://myflix-movies-app.herokuapp.com/movies/')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}

	removeSelectedMovie() {
		this.setState({
			selectedMovie: null,
		});
	}

	render() {
		const { movies, selectedMovie } = this.state;

		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<div className="main-view">
				{selectedMovie ? (
					<MovieView
						movie={selectedMovie}
						removeSelectedMovie={() => this.removeSelectedMovie()}
					/>
				) : (
					movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onMovieClick={(movie) => this.onMovieClick(movie)}
						/>
					))
				)}
			</div>
		);
	}
}
