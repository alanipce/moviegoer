import JSXComponent from 'metal-jsx';
import MovieSummary from './MovieSummary';

class MovieListing extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (
            <div>
                <section class="hero" style={{backgroundImage: `url(${movie.heroArtworkUrl})`}}>
                    <h2 class="hero__title">{movie.title}</h2>
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