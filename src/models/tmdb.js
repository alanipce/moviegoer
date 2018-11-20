import Movie from './movie';
import moment from 'moment';

// namespace for The movie database utility methods
const apiKey = "0f07480086543adf4e6e3898c5c50c0f";
const apiBaseUrl = "https://api.themoviedb.org/3";
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
        return Promise.all([_get("/discover/movie", {"with_release_type": `${RELEASE_TYPE_THEATRICAL}|${RELEASE_TYPE_LIMITED_THEATRICAL}`}), _fetchBackdropResourceBaseUrl()])
            .then((values) => {
                const json = values[0];
                const backdropResourceBaseUrl = values[1];

                return json.results.map((movieJSON) => {
                    const title = movieJSON.title;
                    const artworkUrl = (movieJSON.backdrop_path) ? _buildAbsoluteUrl(backdropResourceBaseUrl, movieJSON.backdrop_path) : null;

                    return new Movie(title, artworkUrl);
                })
            });
    },
    
};


function _configure() {
    return fetch(_buildApiUrl("/configuration"))
            .then((resp) => resp.json())
            .then((json) => {
                config = json;
                return config;
            });
}

function _get(path, params) {
    if (!apiKey) {
        console.error("TMDb API key is missing!");

        return;
    }

    return fetch(_buildApiUrl(path, params)).then(resp => resp.json());
}

function _fetchBackdropResourceBaseUrl() {
    if (config === null) {
        return _configure().then(() => {
            return _buildBackdropResourceBaseUrl(config);
        });
    } else {
        return Promise.resolve(_buildBackdropResourceBaseUrl(config));
    }
}
function _buildBackdropResourceBaseUrl(configuration) {
    const baseUrl = configuration.images.base_url;
    const size = configuration.images.backdrop_sizes[0];

    return `${baseUrl}/${size}`;
}

function _buildApiUrl(path, params = {}) {
    const absoluteUrl = _buildAbsoluteApiUrl(path);
    const paramQuery = _urlEncodedQueryParameters(Object.assign({}, params, {"api_key": apiKey}));

    return `${absoluteUrl}?${paramQuery}`;
}

function _buildAbsoluteApiUrl(path) {
    return _buildAbsoluteUrl(apiBaseUrl, path);
}

function _buildAbsoluteUrl(baseUrl, path) {
    var relativePath = path;
    
    // auto-append forward slash to beginning if not provided
    if (relativePath.length > 0 && relativePath.charAt(0) != "/") {    
        relativePath = "/" + relativePath;
    }

    return `${baseUrl}${relativePath}`;
}

function _urlEncodedQueryParameters(params) {
    let query = "";

    Object.getOwnPropertyNames(params).forEach((key, index) => {
        const value = encodeURIComponent(params[key]);

        if (index == 0) {
            query = `${key}=${value}`;
        } else {
            query += `&${key}=${value}`;
        }
    });

    return query;
}

export default TMDb;