export const Action = Object.freeze({
    LoadFlights: 'LoadFlights',
});

export function loadFlights(flights){
    return {
        type: Action.LoadFlights,
        payload: flights,
    }
}