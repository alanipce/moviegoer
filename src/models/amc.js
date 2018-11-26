import { buildUrl } from "../utility/network";
import { formatDate } from '../utility/formatters';

const API_KEY = "D8D66042-877E-4F59-9029-8592C0B575F0";
const API_BASE_URL = "https://api.amctheatres.com/v2";

const AMCApi = {
    getMovieShowtimes: function(movieName, date, referenceCoordinates) {
        const url = buildUrl(
            API_BASE_URL, 
            `showtimes/views/current-location/${formatDate(date)}/${referenceCoordinates.latitude}/${referenceCoordinates.longitude}`, 
            {"movie": movieName}
        );

        return fetch(url, {headers: {"X-AMC-Vendor-Key": API_KEY }}).then((res) => res.json()).then((json) => console.log(json));
    }
}

export default AMCApi;