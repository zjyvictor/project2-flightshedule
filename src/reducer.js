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
        case Action.EnterEditMode:
            return{
                ...state,
                flights: state.flights.map(flight => {
                    if(flight.id === action.payload.id){
                        return {...flight, isEditing: true};
                    }else{
                        return flight;
                    }
                }),
            };
         case Action.LeaveEditMode:
            return{
                ...state,
                flights: state.flights.map(flight => {
                    if(flight.id === action.payload.id){
                        return {...flight, isEditing: undefined};
                    }else{
                        return flight;
                    }
                }),
            };
    default:
        return state;
    }
}

export default reducer;