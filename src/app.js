import JSXComponent from "metal-jsx";

import MultiStepIndicator from './MultiStepIndicator';
import MovieStep from './MovieStep';
import DateStep from "./DateStep";

import TMDB from './models/tmdb';

import "./app.scss";

const MOVIE_STEP = 0;
const DATE_STEP = 1;
const SHOWTIME_STEP = 2;

class App extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
        this.handleMovieConfirmation = this.handleMovieConfirmation.bind(this);
    }

    async attached() {
        this.state.movies = await TMDB.fetchTheatricalReleases();
    }

    render() {
        const {movies, selectedMovieIndex, steps, currentStep} = this.state;

        if (movies === null) {
            return <p>Loading movie selections...</p>;
        }

        return (
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                    <MultiStepIndicator steps={steps} currentStep={currentStep} />
                </header>
                <main class="card">
                    {(currentStep === MOVIE_STEP) && 
                        <MovieStep movies={movies}
                            selectedMovieIndex={selectedMovieIndex} 
                            events={{movieSelected: this.handleMovieSelected, movieConfirmed: this.handleMovieConfirmation}} />
                    }
                    {(currentStep === DATE_STEP) &&
                         <DateStep movie={movies[selectedMovieIndex]}/>
                    }
                    {(currentStep === SHOWTIME_STEP) && <div>Last step</div>}
                </main>
            </div>
        );
    }

    navigateToDateStep() {
        this.state.currentStep = DATE_STEP;
    }

    handleMovieConfirmation() {
        this.navigateToDateStep();
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
    },
    steps: {
        value: [
            {
                name: "Movie"
            },
            {
                name: "Date"
            },
            {
                name: "Showtime"
            }
        ]
    },
    currentStep: {
        value: MOVIE_STEP
    }
};

export {App};
export default App;