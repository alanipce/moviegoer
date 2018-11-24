import JSXComponent from 'metal-jsx';
import MovieSelector from "./MovieSelector";
import MovieOverview from './MovieOverview';

class MovieStep extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
        this.handleMovieConfirmation = this.handleMovieConfirmation.bind(this);
    }

    render() {
        const {movies, selectedMovieIndex} = this.props;

        return (
            <form data-onsubmit={this.handleMovieConfirmation}>
                <div class="movie-step">
                    <div class="movie-step__overview">
                        <h2>Step 1. Select a movie</h2>
                        {selectedMovieIndex !== null &&
                            <div>
                                <h3>Selected Movie</h3>
                                <MovieOverview movie={movies[selectedMovieIndex]} />
                                <button type="submit">Continue</button>
                            </div>
                        }
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
        this.emit('movieConfirmed');
    }

    handleMovieSelected(payload) {
        this.emit('movieSelected', payload)
    }
};

MovieStep.PROPS = {
    movies: {
        value: []
    },
    selectedMovieIndex: {
        value: null
    }
};

export default MovieStep;