export function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.ceil(max);

    return min + Math.floor((max - min + 1) * Math.random());
}

export function flipACoin() {
    return getRandomInt(0, 1);
}