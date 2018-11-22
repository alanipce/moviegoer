import JSXComponent from 'metal-jsx';
import MovieListing from './MovieListing';

class MovieSelector extends JSXComponent {
    created() {
        this.handleSelectedMovie = this.handleSelectedMovie.bind(this);
    }

    render() {
        const {movies, selectedMovieIndex} = this.props;

        return (
            <div class="movie-selector">
                {movies.map((m, i) => <MovieListing movie={m} isSelected={i === selectedMovieIndex} events={{movieSelected: this.handleSelectedMovie}} />)}
            </div>
        );
    }

    handleSelectedMovie(e) {
        this.emit('movieSelected', e);
    }
}

MovieSelector.PROPS = {
    movies: {
        value: []
    },
    selectedMovieIndex: {
        value: null
    }
};

export default MovieSelector;