const DATE_FORMAT = "MM-DD-YYYY";
const HTML_INPUT_DATE_FORMAT = "YYYY-MM-DD";

const HOURS_UNIT_STRING = "HR";
const MIN_UNIT_STRING = "MIN";

function formatDate(momentDate, options={}) {
    const {inputFormat = false} = options;
    const format = (inputFormat)? HTML_INPUT_DATE_FORMAT : DATE_FORMAT;

    return momentDate.format(format);
}

function formatTimeHrsMin(minutes) {
    return `${Math.floor(minutes/60)} ${HOURS_UNIT_STRING} ${minutes % 60} ${MIN_UNIT_STRING}`;
}

export {formatDate, formatTimeHrsMin};