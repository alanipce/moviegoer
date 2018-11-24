import JSXComponent from 'metal-jsx';

class MovieOverview extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (
            <div class="movie-overview">
                <img class="movie-overview__thumbnail" src={movie.artworkUrl} alt="Movie backdrop image"/>
                <div class="movie-overview__content">
                    <h3 class="movie-overview__title">{movie.title}</h3>
                    <div class="movie-overview__description">{movie.overview}</div>
                </div>
            </div>
        );
    }
}

MovieOverview.PROPS = {
    movie: {
        value: null
    }
}

export default MovieOverview;