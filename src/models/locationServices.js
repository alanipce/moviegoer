import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = "AIzaSyC_gNwWVNbM1vcsOESuHcQ-oK0WtSfiFNg";

export function requestUserLocation() {
    return new Promise((resolve, reject) => {
        const locationServicesAvailable = "geolocation" in navigator;

        if (locationServicesAvailable) {
            navigator.geolocation.getCurrentPosition((position) => {
                    console.log(`Obtained user positiion at (${position.coords.latitude}, ${position.coords.longitude})`);

                    GoogleMapsLoader.load((google) => {
                        let geocoder = new google.maps.Geocoder();

                        // reverse geocode user position
                        geocoder.geocode({ 'location': {lat: position.coords.latitude, lng: position.coords.longitude}}, (results, status) => {
                            if (status === "OK") {
                                if (results[0]) {
                                    const cityComponent = results[0].address_components.find((component) => {
                                        return component.types.includes("locality");
                                    });

                                    const location = {
                                        city: cityComponent.long_name,
                                        position: position
                                    };

                                    resolve(location);
                                } else {
                                    reject("City not found!");
                                }
                            } else {
                                reject(status);
                            }
                        });
                    });
                }, (error) => {
                    reject(error.message);
                });


        } else {
            reject("Location services disabled!");
        }
    });
    
};