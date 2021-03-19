import axios from 'axios';

export class MainView extends React.Component {
	componentDidMount() {
		axios
			.get('<https://myflix-movies-app.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					Movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { Movies } = this.state;
		if (!Movies) return <div className="main-view" />;

		return (
			<div className="main-view">
				{Movies.map((Movie) => (
					<div className="movie-card" key={Movie._id}>
						{Movie.Title}
					</div>
				))}
			</div>
		);
	}
}
