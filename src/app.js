import JSXComponent from "metal-jsx";

import MultiStepIndicator from './MultiStepIndicator';
import MovieStep from './MovieStep';
import DateStep from "./DateStep";


import "./app.scss";

const MOVIE_STEP = 0;
const DATE_STEP = 1;
const SHOWTIME_STEP = 2;

class App extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
    }

    render() {
        const {selectedMovie, steps, currentStep} = this.state;

        return (
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                    <MultiStepIndicator steps={steps} currentStep={currentStep} />
                </header>
                <main class="card">
                    {(currentStep === MOVIE_STEP) && 
                        <MovieStep
                            events={{movieSelected: this.handleMovieSelected}} />
                    }
                    {(currentStep === DATE_STEP) &&
                         <DateStep movie={selectedMovie}/>
                    }
                    {(currentStep === SHOWTIME_STEP) && <div>Last step</div>}
                </main>
            </div>
        );
    }

    navigateToDateStep() {
        this.state.currentStep = DATE_STEP;
    }

    handleMovieSelected(e) {
        this.state.selectedMovie = e.movie;
        this.navigateToDateStep();
    }

}

App.STATE = {
    selectedMovie: {
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