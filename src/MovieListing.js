import JSXComponent from 'metal-jsx';
import MovieSummary from './MovieSummary';

class MovieListing extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (
            <div class="movie-listing">
                <section class="movie-listing__section">
                    <div class="hero" style={{backgroundImage: `url(${movie.heroArtworkUrl})`}}>
                        <h2 class="hero__title">{movie.title}</h2>
                    </div>
                </section>
                <MovieSummary movie={movie} />
            </div>
        );
    }
}

MovieListing.PROPS = {
    movie: {
        value: null
    }
};

export default MovieListing;