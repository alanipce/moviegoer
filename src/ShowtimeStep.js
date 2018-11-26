import JSXComponent from 'metal-jsx';
import MovieOverview from './MovieOverview';
import AMCApi from './models/amc';

class ShowtimeStep extends JSXComponent {
    created() {
        this.handleUserLocationAcquired = this.handleUserLocationAcquired.bind(this);
        this.handleUserLocationError = this.handleUserLocationError.bind(this);
    }

    attached() {
        const locationServicesAvailable = "geolocation" in navigator;

        if (locationServicesAvailable) {
            navigator.geolocation.getCurrentPosition(this.handleUserLocationAcquired, this.handleUserLocationError);
        } else {
            this.state.geolocationError = "Location services disabled!";
        }
    }

    render() {
        const {geolocationError, currentPosition} = this.state;

        if (geolocationError === false) {
            return (<p>{geolocationError}</p>);
        }

        if (currentPosition === null) {
            return (<p>Locating nearby theatres...</p>);
        }

        return (<p>Got your position! You are at {currentPosition.coords.latitude}, {currentPosition.coords.longitude}</p>);
    }

    handleUserLocationAcquired(position) {
        this.state.currentPosition = position;

        AMCApi.getMovieShowtimes(this.props.movie.title, this.props.date, this.state.currentPosition.coords);
    }

    handleUserLocationError(error) {
        this.state.geolocationError = error.message;
    }
}

ShowtimeStep.PROPS = {
    movie: {
        value: null
    },
    date: {
        value: null
    }
}

ShowtimeStep.STATE = {
    currentPosition: {
        value: null
    },
    geolocationError: {
        value: null
    }
}

export default ShowtimeStep;