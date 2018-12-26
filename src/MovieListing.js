import JSXComponent from 'metal-jsx';
import MovieRuntime from './MovieRuntime';

class MovieListing extends JSXComponent {
    created() {
        this.handlePurchaseAction = this.handlePurchaseAction.bind(this);
    }

    render() {
        const {movie} = this.props;

        return (
            <div class="movie-listing">
                <section class="movie-listing-section movie-listing-section--no-padding">
                    <div class="hero" style={{backgroundImage: `url(${movie.heroArtworkUrl})`}}>
                        <h2 class="hero__title">{movie.title}</h2>
                        <div class="hero__actions">
                            <button class="button button--rounded" data-onclick={this.handlePurchaseAction}>Purchase Tickets</button>
                        </div>
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

    handlePurchaseAction() {
        this.emit('purchaseInitiated', {movie: this.props.movie});
    }
}

MovieListing.PROPS = {
    movie: {
        value: null
    }
};

export default MovieListing;