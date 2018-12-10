import JSXComponent from 'metal-jsx';
import MovieSelector from "./MovieSelector";

import TMDB from './models/tmdb';

class MovieStep extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
        this.handleMovieConfirmation = this.handleMovieConfirmation.bind(this);
    }

    async attached() {
        this.state.movies = await TMDB.fetchTheatricalReleases();
    }

    render() {
        const {movies, selectedMovieIndex} = this.state;

        if (movies === null) {
            return <p>Loading movie selections...</p>;
        }

        return (
            <form data-onsubmit={this.handleMovieConfirmation}>
                <div class="movie-step">
                    <div class="movie-step__overview">
                        <h2>What do you want to watch?</h2>
                    </div>
                    <div class="movie-step__selection">
                        <MovieSelector 
                            movies={movies} 
                            selectedMovieIndex={selectedMovieIndex} 
                            events={{movieSelected: this.handleMovieSelected}} />
                    </div>
                </div>
            </form>
        );
    }

    handleMovieConfirmation(event) {
        event.preventDefault();
        console.log("confirmed movie selection");
        this.emit('movieSelected', {movie: this.state.movies[this.state.selectedMovieIndex]});
    }

    handleMovieSelected(e) {
        this.state.selectedMovieIndex = this.state.movies.indexOf(e.movie);
    }
};

MovieStep.STATE = {
    movies: {
        value: null
    },
    selectedMovieIndex: {
        value: null
    }
};

export default MovieStep;