import JSXComponent from 'metal-jsx';
import MovieOverview from './MovieOverview';
import AMCApi from './models/amc';
import GoogleMapsLoader from 'google-maps';

class ShowtimeStep extends JSXComponent {
    attached() {
        const locationServicesAvailable = "geolocation" in navigator;

        if (locationServicesAvailable) {
            navigator.geolocation.getCurrentPosition((position) => {
                    this.state.currentPosition = position;

                    console.log(`Obtained user positiion at (${position.coords.latitude}, ${position.coords.longitude})`);

                    GoogleMapsLoader.KEY = "AIzaSyC_gNwWVNbM1vcsOESuHcQ-oK0WtSfiFNg";
                    GoogleMapsLoader.load((google) => {
                        let geocoder = new google.maps.Geocoder();

                        // reverse geocode user position
                        geocoder.geocode({ 'location': {lat: position.coords.latitude, lng: position.coords.longitude}}, (results, status) => {
                            if (status === "OK") {
                                if (results[0]) {
                                    const cityComponent = results[0].address_components.find((component) => {
                                        return component.types.includes("locality");
                                    });

                                    this.state.currentCity = cityComponent.long_name;
                                } else {
                                    this.state.error = "City not found!";
                                }
                            } else {
                                this.state.error = status;
                            }
                        });
                    });
                    // AMCApi.getMovieShowtimes(this.props.movie.title, this.props.date, this.state.currentPosition.coords);
                }, (error) => {
                    this.state.error = error.message;
                });


        } else {
            this.state.error = "Location services disabled!";
        }
    }

    render() {
        const {error, currentPosition, currentCity} = this.state;

        if (error === false) {
            return (<p>{error}</p>);
        }

        if (currentPosition === null || currentCity === null) {
            return (<p>Locating nearby theatres...</p>);
        }

        return (<p>Got your address! You are at {currentCity}</p>);
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
    currentCity: {
        value: null
    },
    error: {
        value: null
    }
}

export default ShowtimeStep;