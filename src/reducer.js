
const initialState = {
    isWaiting: false,
    
    flights : [
        {id: 3, airlines: "Air China", flightnumber: "CA988", origin: "LAX", destination: "PEK"},
        {id: 2, airlines: "China Southern", flightnumber: "CZ682", origin: "ICN", destination: "SHE"},
        {id: 1, airlines: "China Eastern", flightnumber: "MU588", origin: "JFK", destination: "PVG"},
      ],
};

function reducer(state = initialState, action){
    return state;
}

export default reducer;