import {formatTimeHrsMin} from './utility/formatters';

const MovieRuntime = ({minutes}) => {
    return <div>{formatTimeHrsMin(minutes)}</div>;
};

export default MovieRuntime;