import JSXComponent from 'metal-jsx';
import MovieOverview from './MovieOverview';

import moment from 'moment';

const DATE_FORMAT = "YYYY-MM-DD";

class DateStep extends JSXComponent {
    created() {
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.today = moment();
        this.nextMonth = this.today.clone().add(1, 'month');
    }

    render() {
        const {movie} = this.props;
        const {date} = this.state;

        const todayFormatted = this.today.format(DATE_FORMAT);
        const nextMonthFormatted = this.nextMonth.format(DATE_FORMAT);
        const dateFormatted = date.format(DATE_FORMAT);

        return (
            <form data-onsubmit={this.handleSubmission}>
                <h3>Your selection</h3>
                <MovieOverview movie={movie} />
                <h3>Pick a date</h3>
                <input 
                    type="date" 
                    min={todayFormatted} 
                    max={nextMonthFormatted} 
                    value={dateFormatted} 
                    data-onchange={this.handleDateChange}
                    aria-label="Enter a date to view showtimes for"/>
                <button class="button" type="submit" disabled={!date.isValid()}>Pick a Showtime</button>
            </form>
        );
    }

    handleSubmission(e) {
        e.preventDefault();

        this.emit('dateSelected', {date: this.state.date});
    }
    handleDateChange(e) {
        this.state.date = moment(e.target.value);
    }
}

DateStep.PROPS = {
    movie: {
        value: null
    }
};

DateStep.STATE = {
    date: {
        value: moment()
    }
};

export default DateStep;