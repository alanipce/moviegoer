import {flipACoin} from '../utility/random';

function Movie(title, artworkUrl) {
    this.title = title;
    this.artworkUrl = artworkUrl;
}

Movie.prototype.isRecommended = function () {
    return true;
};

export {Movie};
export default Movie;