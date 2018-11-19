let autoIncrementingNumber = 0;
export default function(prefix = 'id') {
    ++autoIncrementingNumber;

    return `${prefix}-${autoIncrementingNumber}`;
}