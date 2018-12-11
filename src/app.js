import JSXComponent from "metal-jsx";

import FeaturedMovieOverview from './FeaturedMovieOverview';
import MultiStepIndicator from './MultiStepIndicator';
import MovieStep from './MovieStep';
import DateStep from "./DateStep";

import "./app.scss";
import ShowtimeStep from "./ShowtimeStep";

const MOVIE_STEP = 0;
const DATE_STEP = 1;
const SHOWTIME_STEP = 2;

class App extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
    }

    render() {
        const {selectedMovie, selectedDate, steps, currentStep} = this.state;

        return (
            <div class="container">
                <header>
                    <h1>moviegoer</h1>
                    {/* <MultiStepIndicator steps={steps} currentStep={currentStep} /> */}
                </header>
                <main>
                    <FeaturedMovieOverview />
                    {/* {(currentStep === MOVIE_STEP) && 
                        <MovieStep
                            events={{movieSelected: this.handleMovieSelected}} />
                    }
                    {(currentStep === DATE_STEP) &&
                        <DateStep movie={selectedMovie}
                            events={{dateSelected: this.handleDateSelected}}/>
                    }
                    {(currentStep === SHOWTIME_STEP) &&
                        <ShowtimeStep movie={selectedMovie}
                            date={selectedDate}/>
                    } */}
                </main>
            </div>
        );
    }

    navigateToDateStep() {
        this.state.currentStep = DATE_STEP;
    }

    navigateToShowtimeStep() {
        this.state.currentStep = SHOWTIME_STEP;
    }

    handleMovieSelected(e) {
        this.state.selectedMovie = e.movie;
        this.navigateToDateStep();
    }

    handleDateSelected(e) {
        this.state.selectedDate = e.date;
        this.navigateToShowtimeStep();
    }
}

App.STATE = {
    selectedMovie: {
        value: null
    },
    selectedDate: {
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