import JSXComponent from 'metal-jsx';

class FeaturedMovie extends JSXComponent {
    render() {
        const {movie} = this.props;
        
        return (
            <div class={`featured-movie${movie.isRecommended? ' recommended' : ''}`}>
                <button class="featured-movie__button" style={{backgroundImage: `url(${movie.artworkUrl})`}}>
                    {movie.title}
                </button>
            </div>
        );
    }
}

FeaturedMovie.PROPS = {
    movie: {
        value: null
    }
}

export default FeaturedMovie;