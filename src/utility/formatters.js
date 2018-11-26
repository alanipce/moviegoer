const DATE_FORMAT = "MM-DD-YYYY";
const HTML_INPUT_DATE_FORMAT = "YYYY-MM-DD";

function formatDate(momentDate, options={}) {
    const {inputFormat = false} = options;
    const format = (inputFormat)? HTML_INPUT_DATE_FORMAT : DATE_FORMAT;

    return momentDate.format(format);
}

export {formatDate};