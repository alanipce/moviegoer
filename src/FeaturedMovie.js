import JSXComponent from 'metal-jsx';
import MovieSummary from './MovieSummary';

import ModalCoordinator from './utility/modal';

class FeaturedMovie extends JSXComponent {
    created() {
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {movie} = this.props;
        
        return (
            <div class={`featured-movie${movie.isRecommended? ' recommended' : ''}`}>
                <button data-onclick={this.handleClick} class="featured-movie__button" style={{backgroundImage: `url(${movie.artworkUrl})`}}>
                    {movie.title}
                </button>
            </div>
        );
    }

    handleClick(e) {
        console.log("clicked featured movie component.");
        ModalCoordinator.showModal(<MovieSummary movie={this.props.movie} />);
    }
}

FeaturedMovie.PROPS = {
    movie: {
        value: null
    }
}

export default FeaturedMovie;