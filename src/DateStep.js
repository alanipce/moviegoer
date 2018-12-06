import JSXComponent from 'metal-jsx';
import MovieOverview from './MovieOverview';

import moment from 'moment';
import {formatDate} from './utility/formatters';

class DateStep extends JSXComponent {
    created() {
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    render() {
        const {movie} = this.props;

        const minAvailableDate = this.getEarliestViewingDate();
        const maxAvailableDate = this.getLatestViewingDate();
        const viewingDate = this.getCurrentViewingDate();

        const minAvailableDateFormatted = formatDate(minAvailableDate, {inputFormat: true});
        const maxAvailableDateFormatted = formatDate(maxAvailableDate, {inputFormat: true});
        const viewingDateFormatted = formatDate(viewingDate, {inputFormat: true});

        return (
            <form data-onsubmit={this.handleSubmission}>
                <div class="date-step">
                    <div class="date-step__selection">
                        <h3>Your Selection</h3>
                        <MovieOverview movie={movie} />
                    </div>
                    <div class="data-step__datepicker">
                        <div>
                            <h3>Pick a date</h3>
                            <input
                                type="date" 
                                min={minAvailableDateFormatted} 
                                max={maxAvailableDateFormatted} 
                                value={viewingDateFormatted} 
                                data-onchange={this.handleDateChange}
                                aria-label="Enter a date to view showtimes for"/>
                        </div>
                        <button class="button" type="submit" disabled={!viewingDate.isValid()}>Continue</button>
                    </div>
                </div>
            </form>
        );
    }

    handleSubmission(e) {
        e.preventDefault();

        this.emit('dateSelected', {date: this.getCurrentViewingDate()});
    }
    handleDateChange(e) {
        this.state.selectedDate = moment(e.target.value);
    }

    getCurrentViewingDate() {
        return this.state.selectedDate || this.getEarliestViewingDate();    
    }

    getEarliestViewingDate() {
        const {movie} = this.props;

        const today = moment();
        const releaseDate = movie.releaseDate.clone();

        return moment.max(today, releaseDate);
    }

    getLatestViewingDate() {
        return this.props.movie.releaseDate.clone().add(3, 'month');
    }

}

DateStep.PROPS = {
    movie: {
        value: null
    }
};

DateStep.STATE = {
    selectedDate: {
        value: null
    }
};

export default DateStep;