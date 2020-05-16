import {Action} from './actions';
const initialState = {
    isWaiting: false,
    
    flights : [],
};

function reducer(state = initialState, action){
    switch (action.type) {
        case Action.LoadFlights:
            return{
                ...state,
                flights: action.payload,
            };
        case Action.FinishAddingFlight:
            return{
                ...state,
                flights: [action.payload, ...state.flights],
            };
    default:
        return state;
    }
}

export default reducer;