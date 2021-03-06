export const Action = Object.freeze({
    LoadFlights: 'LoadFlights',
    FinishAddingFlight: 'FinishAddingFlight',
    EnterEditMode: 'EnterEditMode',
    LeaveEditMode: 'LeaveEditMode',
    FinishSavingFlight: 'FinishSavingFlight',
    FinishDeletingFlight: 'FinishDeletingFlight',
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

export function finishSavingFlight(flight){
    return {
        type: Action.FinishSavingFlight,
        payload: flight,
    }
}

export function finishDeletingFlight(flight){
    return {
        type: Action.FinishDeletingFlight,
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
    constructor(departure, arrival) {
        this.departure = departure;
        this.arrival = arrival;
    }
}

export class FlightNumber {
    constructor(flightnumber){
        this.flightnumber = flightnumber;
    }
}

export class Arrival {
    constructor(arrival){
        this.arrival = arrival;
    }
}

export class Departure {
    constructor(departure){
        this.departure = departure;
    }
}

export class OneFlight {
    constructor(airlines, flightnumber, departure, arrival){
        this.airlines = airlines;
        this.flightnumber = flightnumber;
        this.departure = departure;
        this.arrival = arrival;
    }
}

function checkForErrors(response) {
    if(!response.ok){
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

const host = "https://flightschedule.duckdns.org:8444";


export function loadAllLiveFlights(){
    return dispatch =>{
        fetch(`${host}/allliveflights`)
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

export function loadAirlines(airlines){
    return dispatch =>{
        fetch(`${host}/airlines/${airlines}`)
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

export function loadArrival(destination){
    return dispatch =>{
        fetch(`${host}/destination/${destination}`)
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

export function loadDeparture(origin){
    return dispatch =>{
        fetch(`${host}/origin/${origin}`)
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

export function loadFlightNumber(flightNumber){
    return dispatch =>{
        fetch(`${host}/flightschedule/${flightNumber}`)
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

export function startSavingFlight(flight){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(flight),
    }
    return dispatch =>{
        fetch(`${host}/flights/${flight.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(finishSavingFlight(flight));
                }
            })
            .catch(e => console.error(e));
    };
}

export function startDeletingFlight(flight){
    const options = {
        method: 'DELETE',
    };

    return dispatch =>{
        fetch(`${host}/flights/${flight.id}`, options)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if(data.ok){
                    dispatch(finishDeletingFlight(flight));
                }
            })
            .catch(e => console.error(e));
    };
}