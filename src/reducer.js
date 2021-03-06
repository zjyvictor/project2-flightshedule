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
                flights: [{...action.payload, isEditing: true}, ...state.flights],
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
        case Action.FinishSavingFlight:
            return{
                ...state,
                flights: state.flights.map(flight => {
                    if(flight.id === action.payload.id){
                        return action.payload;
                    }else{
                        return flight;
                    }
                }),
            };
        case Action.FinishDeletingFlight:
            return{
                ...state,
                flights: state.flights.filter(flight => flight.id !== action.payload.id),
            };          
    default:
        return state;
    }
}

export default reducer;