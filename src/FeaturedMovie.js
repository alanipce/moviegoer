import JSXComponent from 'metal-jsx';

class FeaturedMovie extends JSXComponent {
    created() {
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {movie} = this.props;
        
        return (
            <div class={`featured-movie${movie.isRecommended? ' recommended' : ''}`}>
                <button data-onclick={this.handleClick} class="featured-movie__button" style={{backgroundImage: `url(${movie.previewArtworkUrl})`}}>
                    {movie.title}
                </button>
            </div>
        );
    }

    handleClick(e) {
        this.emit('movieSelected', {movie: this.props.movie});
    }
}

FeaturedMovie.PROPS = {
    movie: {
        value: null
    }
}

export default FeaturedMovie;