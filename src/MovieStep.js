import JSXComponent from 'metal-jsx';
import MovieSelector from "./MovieSelector";

class MovieStep extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
        this.handleMovieConfirmation = this.handleMovieConfirmation.bind(this);
    }

    render() {
        const {movies, selectedMovieIndex} = this.props;

        return (
            <form data-onsubmit={this.handleMovieConfirmation}>
                {(selectedMovieIndex !== null) && <button type="submit">Continue</button>}
                <MovieSelector 
                    movies={movies} 
                    selectedMovieIndex={selectedMovieIndex} 
                    events={{movieSelected: this.handleMovieSelected}} />
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