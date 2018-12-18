import JSXComponent from 'metal-jsx';

import MovieListing from './MovieListing';
import FeaturedMovie from './FeaturedMovie';

import TMDb from './models/tmdb';
import ModalCoordinator from './utility/modal';

class FeaturedMovieCollection extends JSXComponent {
    created() {
        this.handleSelectedMovie = this.handleSelectedMovie.bind(this);
    }

    async attached() {
        this.state.movies = await TMDb.fetchTheatricalReleases();
    }
    
    render() {
        const {movies} = this.state;

        if (movies === null) {
            return <p>Loading movie selections...</p>;
        }

        return (
            <div class="featured-movie-overview">
                {movies.map((m) => <FeaturedMovie movie={m} events={{movieSelected: this.handleSelectedMovie}} />)}  
            </div>
        );
    }

    async handleSelectedMovie(payload) {
        console.log("selected movie from collection...");
        ModalCoordinator.showModal(<MovieListing movie={payload.movie} />);

        const movieDetails = await TMDb.fetchMovieDetails(payload.movie.id);
        console.log(movieDetails);
    }
}

FeaturedMovieCollection.STATE = {
    movies: {
        value: null
    }
}

export default FeaturedMovieCollection;