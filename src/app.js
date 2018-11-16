(function () {
    console.log("Hello world! I welcome you from app.js");

    function getRandomInt(min, max) {
        min = Math.floor(min);
        max = Math.ceil(max);

        return min + Math.floor((max - min + 1) * Math.random());
    }

    function flipACoin() {
        return getRandomInt(0, 1);
    }

    function Movie(title, artwork) {
        this.title = title;
        this.artwork = artwork;
    }

    Movie.prototype.isRecommended = function () {
        return flipACoin();
    };

    const antMan = new Movie("Ant man", "https://cdn.arstechnica.net/wp-content/uploads/2018/07/antman2-logo-800x450.png");
    const infinityWar = new Movie("Avengers infinity war", "https://cdn.arstechnica.net/wp-content/uploads/2018/04/aveng-infinwar-logo-800x417.jpg");
    const venom = new Movie("Venom", "https://cdn.vox-cdn.com/thumbor/rdTQ7js8JX4shgtbxNRsE-LbAe0=/0x0:947x444/1820x1213/filters:focal(399x147:549x297):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/61654289/Screen_Shot_2018_02_08_at_10.46.30_AM.0.png");
    const predator = new Movie("Predator", "https://static1.srcdn.com/wordpress/wp-content/uploads/2017/05/Predator-Blu-ray-cover.jpg?q=50&fit=crop&w=798&h=407&dpr=1.5");

    const movies = [antMan, infinityWar, venom, predator, antMan, infinityWar, venom, predator, antMan, infinityWar, venom, predator, antMan, infinityWar, venom, predator];
    movies.forEach((m) => console.log(m.title));


    const showcaseElement = document.getElementById("movie-showcase");
    movies.forEach((m) => {
        const movieItemElement = document.createElement("li");
        
        if (m.isRecommended()) {
            movieItemElement.classList.add("movie-listing", "recommended");
        } else {
            movieItemElement.classList.add("movie-listing");
        }


        const movieContentElement = document.createElement("div");
        movieContentElement.classList.add("movie-content");

        const movieArtwork = document.createElement("img");
        movieArtwork.src = m.artwork;
        movieArtwork.alt = `${m.title} movie artwork`;

        movieContentElement.appendChild(movieArtwork);
        movieItemElement.appendChild(movieContentElement);
        showcaseElement.appendChild(movieItemElement);
    });
})();