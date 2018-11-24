import moment from 'moment';

function determineRecommendation(releaseDate, voteAverage) {
    // Note: moment treats the current week from Sunday to Saturday, so sunday  is the start of the week
    // Recommended rules: if released last week and has great ratings or is released this week it is recommended
    const thisSunday = moment().day(0);
    const lastSunday = moment().day(-7);

    if (releaseDate.isAfter(thisSunday)) {
        return true;
    } else if (releaseDate.isBetween(lastSunday, thisSunday) && voteAverage > 6) {
        return true;
    } else {
        return false;
    }
}

function Movie(title, overview, artworkUrl, releaseDate, voteAverage) {
    this.title = title;
    this.overview = overview;
    this.artworkUrl = artworkUrl;
    this.releaseDate = moment(releaseDate);
    this.voteAverage = voteAverage;

    this.isRecommended = determineRecommendation(this.releaseDate, this.voteAverage);
}

export {Movie};
export default Movie;