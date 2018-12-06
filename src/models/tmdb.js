import Movie from './movie';
import {buildUrl} from '../utility/network';

import moment from 'moment';
import { formatDate } from '../utility/formatters';

const API_KEY = "0f07480086543adf4e6e3898c5c50c0f";
const API_BASE_URL = "https://api.themoviedb.org/3";

let config = null;

// release type constants
const RELEASE_TYPE_PREMIER = 1;
const RELEASE_TYPE_LIMITED_THEATRICAL = 2;
const RELEASE_TYPE_THEATRICAL = 3;
const RELEASE_TYPE_DIGITAL = 4;
const RELEASE_TYPE_PHYSICAL = 5;
const RELEASE_TYPE_TV = 6;

const TMDb = {
    fetchTheatricalReleases: function () {
        const afterDate = moment().subtract(2, 'weeks');
        const beforeDate = moment().add(2, 'weeks');

        const movieFilterOptions = {
            "release_date.gte": formatDate(afterDate, {inputFormat: true}),
            "release_date.lte": formatDate(beforeDate, {inputFormat: true}),
            "with_release_type": `${RELEASE_TYPE_THEATRICAL}|${RELEASE_TYPE_LIMITED_THEATRICAL}`,
        };

        const fetchMoviesPromise = _get("/discover/movie", movieFilterOptions);
        const fetchBackdropConfigUrlPromise = _fetchBackdropResourceBaseUrl();

        return Promise.all([fetchMoviesPromise, fetchBackdropConfigUrlPromise])
            .then((values) => {
                const json = values[0];
                const backdropResourceBaseUrl = values[1];

                return json.results.map((movieJSON) => {
                    const {
                        title,
                        overview,
                        backdrop_path: backdropPath, 
                        release_date: releaseDate, 
                        vote_average: voteAverage
                    } = movieJSON;

                    const artworkUrl = (backdropPath) ? buildUrl(backdropResourceBaseUrl, backdropPath) : null;

                    return new Movie(title, overview, artworkUrl, releaseDate, voteAverage);
                })
            });
    },
    
};

function _get(path, params) {
    if (!API_KEY) {
        console.error("TMDb API key is missing!");

        return;
    }

    return fetch(_buildApiUrl(path, params)).then(resp => resp.json());
}

function _buildApiUrl(path, params) {
    return buildUrl(API_BASE_URL, path, Object.assign({}, params, {"api_key": API_KEY}));
}

function _fetchBackdropResourceBaseUrl() {
    if (config === null) {
        return _configure().then(_buildBackdropResourceBaseUrl);
    } else {
        return Promise.resolve(_buildBackdropResourceBaseUrl(config));
    }
}
function _buildBackdropResourceBaseUrl(configuration) {
    const baseUrl = configuration.images.base_url;
    const size = configuration.images.backdrop_sizes[0];

    return `${baseUrl}/${size}`;
}

function _configure() {
    return fetch(_buildApiUrl("/configuration"))
            .then((resp) => resp.json())
            .then((json) => {
                config = json;
                return config;
            });
}

export default TMDb;