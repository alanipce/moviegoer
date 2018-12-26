import JSXComponent from 'metal-jsx';

import MovieSummary from './MovieSummary';

class MovieBoxOffice extends JSXComponent {
    created() {
        this.handleCancellation = this.handleCancellation.bind(this);
    }
    render() {
        const {movie} = this.props;

        return (
            <div class="box-office">
                <div class="box-office__backdrop" data-onclick={this.handleCancellation}></div>
                <div class="box-office__content">
                    <h2>Purchase Tickets</h2>
                    <MovieSummary movie={movie} />
                </div>
            </div>
        );
    }

    handleCancellation() {
        this.emit('purchaseCancelled');
    }
}

MovieBoxOffice.PROPS = {
    movie: {
        value: null
    }
};

export default MovieBoxOffice;