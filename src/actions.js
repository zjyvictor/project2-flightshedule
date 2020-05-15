export const Action = Object.freeze({
    LoadFlights: 'LoadFlights',
});

export function loadFlights(flights){
    return {
        type: Action.LoadFlights,
        payload: flights,
    }
}

function checkForErrors(response) {
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = "https://flightschedule.duckdns.org:8444";

export function loadOne(origin, destination){
    return dispatch =>{
        fetch(`${host}/flightschedule/${origin}/${destination}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(loadFlights(data.flights));
                }
            })
            .catch(e => console.error(e));
    };
}