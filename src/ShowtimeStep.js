import JSXComponent from 'metal-jsx';
import MovieSummary from './MovieSummary';
import AMCApi from './models/amc';
import {requestUserLocation} from './models/locationServices';

class ShowtimeStep extends JSXComponent {
    attached() {
        requestUserLocation()
            .then((location) => {
                this.state.currentLocation = location;
            })
            .catch((error) => {
                this.state.error = error;
            });
    }

    render() {
        const {error, currentLocation} = this.state;

        if (error === false) {
            return (<p>{error}</p>);
        }

        if (currentLocation === null) {
            return (<p>Locating nearby theatres...</p>);
        }

        return (<p>Got your address! You are at {currentLocation.city}</p>);
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
    currentLocation: {
        value: null
    },
    error: {
        value: null
    }
}

export default ShowtimeStep;