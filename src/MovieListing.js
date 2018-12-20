import JSXComponent from 'metal-jsx';
import MovieRuntime from './MovieRuntime';

class MovieListing extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (
            <div class="movie-listing">
                <section class="movie-listing-section movie-listing-section--no-padding">
                    <div class="hero" style={{backgroundImage: `url(${movie.heroArtworkUrl})`}}>
                        <h2 class="hero__title">{movie.title}</h2>
                    </div>
                </section>
                {movie.details &&
                    <section class="movie-listing-section">
                        <div class="container">
                            <div class="movie-overview">
                                <div class="movie-overview__metadata">
                                    <div class="movie-overview__runtime"><MovieRuntime minutes={movie.details.runtime} /></div>
                                    <div class="movie-overview__genres">{movie.details.genres.join(", ")}</div>
                                </div>
                                <div class="movie-overview__intro">
                                    {movie.details.tagline && 
                                        <div class="movie-overview__tagline">{movie.details.tagline}</div> 
                                    }
                                    <div class="movie-overview__summary">{movie.overview}</div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
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