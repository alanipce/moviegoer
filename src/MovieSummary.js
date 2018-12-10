import JSXComponent from 'metal-jsx';

class MovieSummary extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (
            <div class="movie-summary">
                <img class="movie-summary__thumbnail" src={movie.artworkUrl} alt="Movie backdrop image"/>
                <div class="movie-summary__content">
                    <h3 class="movie-summary__title">{movie.title}</h3>
                    <div class="movie-summary__description">{movie.overview}</div>
                </div>
            </div>
        );
    }
}

MovieSummary.PROPS = {
    movie: {
        value: null
    }
}

export default MovieSummary;