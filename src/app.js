import JSXComponent from "metal-jsx";

import MovieSelector from "./MovieSelector";

import Movie from './models/movie';

import "./app.scss";


class App extends JSXComponent {
    created() {
        this.handleMovieSelected = this.handleMovieSelected.bind(this);
    }

    render() {
        const {movies, selectedMovieIndex} = this.state;

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
        value: [
            new Movie("Ant man", "https://cdn.arstechnica.net/wp-content/uploads/2018/07/antman2-logo-800x450.png"),
            new Movie("Avengers infinity war", "https://cdn.arstechnica.net/wp-content/uploads/2018/04/aveng-infinwar-logo-800x417.jpg"),
            new Movie("Venom", "https://cdn.vox-cdn.com/thumbor/rdTQ7js8JX4shgtbxNRsE-LbAe0=/0x0:947x444/1820x1213/filters:focal(399x147:549x297):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/61654289/Screen_Shot_2018_02_08_at_10.46.30_AM.0.png"),
            new Movie("Predator", "https://static1.srcdn.com/wordpress/wp-content/uploads/2017/05/Predator-Blu-ray-cover.jpg?q=50&fit=crop&w=798&h=407&dpr=1.5")
        ]
    },
    selectedMovieIndex: {
        value: null
    }
};

export {App};
export default App;