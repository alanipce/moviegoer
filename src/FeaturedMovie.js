import JSXComponent from 'metal-jsx';

class FeaturedMovie extends JSXComponent {
    render() {
        const {movie} = this.props;
        
        return (
            <button class="featured-movie" style={{backgroundImage: `url(${movie.artworkUrl})`}}>
                {movie.title}
            </button>
        );
    }
}

FeaturedMovie.PROPS = {
    movie: {
        value: null
    }
}

export default FeaturedMovie;