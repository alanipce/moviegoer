(function () {
    console.log("Hello world! I welcome you from app.js");

    function getRandomInt(min, max) {
        min = Math.floor(min);
        max = Math.ceil(max);

        return min + Math.floor((max - min + 1) * Math.random());
    }

    function Movie(title) {
        this.title = title;
    }

    Movie.prototype.computeRelevanceScore = function () {
        return getRandomInt(0, 5);
    };

    const antMan = new Movie("Ant man");
    const infinityWar = new Movie("Avengers infinity war");
    const venom = new Movie("Venom");
    const predator = new Movie("Predator");

    const movies = [antMan, infinityWar, venom, predator];
    movies.forEach((m) => console.log(m.title));


    const showcaseElement = document.getElementById("movie-showcase");
    // movies.forEach((m) => {
    //     const movieItemElement = document.createElement("li");
    //     movieItemElement.innerText = `${m.title} - score of ${m.computeRelevanceScore()}`;

    //     showcaseElement.appendChild(movieItemElement);
    // });
})();