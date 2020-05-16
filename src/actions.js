export const Action = Object.freeze({
    LoadFlights: 'LoadFlights',
    FinishAddingFlight: 'FinishAddingFlight',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
});

export function loadFlights(flights){
    return {
        type: Action.LoadFlights,
        payload: flights,
    }
}

export function finishAddingFlight(flight){
    return {
        type: Action.FinishAddingFlight,
        payload: flight,
    }
}

export function enterEditMode(flight){
    return {
        type: Action.EnterEditMode,
        payload: flight,
    }
}

export function leaveEditMode(flight){
    return {
        type: Action.LeaveEditMode,
        payload: flight,
    }
}

export class Route {
    constructor(origin, destination) {
        this.origin = origin;
        this.destination = destination;
    }
}

export class OneFlight {
    constructor(airlines, flightNumber, origin, destination){
        this.airlines = airlines;
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
    }
}

function checkForErrors(response) {
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = "https://flightschedule.duckdns.org:8444";

export function loadRoute(origin, destination){
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

export function startAddingFlight(airlines, flightnumber, departure, arrival){
    const flight = {airlines, flightnumber, departure, arrival};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
    }
    return dispatch =>{
        fetch(`${host}/flights`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    flight.id = data.id;
                    dispatch(finishAddingFlight(flight));
                }
            })
            .catch(e => console.error(e));
    };
}