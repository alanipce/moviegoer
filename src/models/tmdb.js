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

// Image asset size classes
const IMAGE_SIZE_SMALLEST = -1;
const IMAGE_SIZE_LARGEST = -2;
const IMAGE_SIZE_ORIGINAL = -3;

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
        const fetchConfiguration = _fetchConfiguration();

        return Promise.all([fetchMoviesPromise, fetchConfiguration])
            .then((values) => {
                const json = values[0];
                const configuration = values[1];

                console.log(configuration);
                return json.results.map((movieJSON) => {
                    const {
                        title,
                        overview,
                        backdrop_path: backdropPath, 
                        release_date: releaseDate, 
                        vote_average: voteAverage
                    } = movieJSON;

                    const previewArtworkUrl = _buildBackdropResourceUrl(configuration, IMAGE_SIZE_SMALLEST, backdropPath);
                    const heroArtworkUrl = _buildBackdropResourceUrl(configuration, IMAGE_SIZE_LARGEST, backdropPath);
            
                    const movie =  new Movie(title, overview, releaseDate, voteAverage);

                    if (previewArtworkUrl) {
                        movie.setPreviewArtworkUrl(previewArtworkUrl);
                    }

                    if (heroArtworkUrl) {
                        movie.setHeroArtworkUrl(heroArtworkUrl);
                    }

                    return movie;
                });
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

function _buildBackdropResourceUrl(configuration, sizeClass, path) {
    if (!path) {
        return null;
    }

    const baseUrl = configuration.images.base_url;
    let sizeIndex = 0;

    if (sizeClass === IMAGE_SIZE_SMALLEST) {
        sizeIndex = 0;
    } else if (sizeClass === IMAGE_SIZE_LARGEST) {
        sizeIndex = Math.floor(configuration.images.backdrop_sizes.length - 2, 0);
    } else if (sizeClass === IMAGE_SIZE_ORIGINAL) {
        sizeIndex = Math.floor(configuration.images.backdrop_sizes.length - 1, 0);
    }
     else {
        sizeIndex = sizeClass;
    }
    
    const size = configuration.images.backdrop_sizes[sizeIndex];

    return buildUrl(baseUrl, `${size}/${path}`);
}

function _fetchConfiguration() {
    if (config === null) {
        return fetch(_buildApiUrl("/configuration"))
            .then((resp) => resp.json())
            .then((json) => {
                config = json;
                return config;
            });
    } else {
        return Promise.resolve(config);
    }
    
}

export default TMDb;