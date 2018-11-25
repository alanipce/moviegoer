import JSXComponent from 'metal-jsx';
import MovieOverview from './MovieOverview';

class DateStep extends JSXComponent {
    render() {
        const {movie} = this.props;

        return (<MovieOverview movie={movie} />);
    }
}

DateStep.PROPS = {
    movie: {
        value: null
    }
};

export default DateStep;