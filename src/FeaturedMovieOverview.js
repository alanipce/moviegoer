import JSXComponent from 'metal-jsx';

import TMDd from './models/tmdb';
import FeaturedMovie from './FeaturedMovie';

class FeaturedMovieOverview extends JSXComponent {
    async attached() {
        this.state.movies = await TMDd.fetchTheatricalReleases();
    }
    
    render() {
        const {movies} = this.state;

        if (movies === null) {
            return <p>Loading movie selections...</p>;
        }

        return (
            <div class="featured-movie-overview">
                {movies.map((m) => <FeaturedMovie movie={m} />)}  
            </div>
        );
    }
}

FeaturedMovieOverview.STATE = {
    movies: {
        value: null
    }
}

export default FeaturedMovieOverview;