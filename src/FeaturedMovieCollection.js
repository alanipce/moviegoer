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
            <div class="featured-movie-collection">
                {movies.map((m) => <FeaturedMovie movie={m} events={{movieSelected: this.handleSelectedMovie}} />)}  
            </div>
        );
    }

    async handleSelectedMovie(payload) {
        // render modal with basic movie with no details
        ModalCoordinator.showModal(<MovieListing movie={payload.movie} />);

        const movieDetails = await TMDb.fetchMovieDetails(payload.movie.id);
        
        // update state to update movie with details
        this.state.movies.map((m) => {
            if (m.id === payload.movie.id) {
                m.setDetails(movieDetails);
                console.log(m);
            }

            return m;
        });

        // re-render the modal with new movie
        ModalCoordinator.showModal(<MovieListing movie={payload.movie} />);
    }
}

FeaturedMovieCollection.STATE = {
    movies: {
        value: null
    }
}

export default FeaturedMovieCollection;