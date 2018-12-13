import JSXComponent from 'metal-jsx';
import uniqueId from './utility/uniqueid';

class MovieOption extends JSXComponent {
    created() {
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    willAttach() {
        this.inputId = uniqueId('movieoption');
    }

    render() {
        const {movie, isSelected} = this.props;
        const inputId = this.inputId;
        
        return (
            <div class={`movie-option${movie.isRecommended? ' recommended' : ''}`}>
                <div class="movie-option__container">
                    {movie.previewArtworkUrl && <img class="movie-option__artwork" src={movie.previewArtworkUrl} alt="Movie artwork" />}
                    <input class="movie-option__input" id={inputId} type="radio" name="movie-selection" checked={isSelected} data-onchange={this.handleSelectionChange}/>
                    <label class="movie-option__label" for={inputId} data-onclick={this.handleSelectionChange}>{movie.title}</label>
                </div>
            </div>
        );
    }

    handleSelectionChange() {
        this.emit('movieSelected', {
            movie: this.props.movie
        });
    }
}

MovieOption.PROPS = {
    movie: {
        value: null
    },
    isSelected: {
        value: false
    }
};

export default MovieOption;