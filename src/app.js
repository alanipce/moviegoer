import JSXComponent from "metal-jsx";

import MovieSelector from "./MovieSelector";

import TMDB from './models/tmdb';

import "./app.scss";


class App extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
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
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                    <div>Step 1: Select your movie</div>
                </header>
                <main>
                    <MovieSelector movies={movies} selectedMovieIndex={selectedMovieIndex} events={{movieSelected: this.handleMovieSelected}} />
                </main>
            </div>
        );
    }

    handleMovieSelected(e) {
        this.state.selectedMovieIndex = this.state.movies.indexOf(e.movie);
    }
}

App.STATE = {
    movies: {
        value: null
    },
    selectedMovieIndex: {
        value: null
    }
};

export {App};
export default App;