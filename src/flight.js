import React from 'react';

export function Flight(props) {
    const flight = props.flight;

    return (
        
        <div className="flight">

            <div className="airlines">{flight.airlines}</div>
            <div className="flightnumber">{flight.flightnumber}</div>
            <div className="origin">{flight.departure}</div>
            <div className="destination">{flight.arrival}</div>
            <div className="delete-button" onClick = {() => props.remove(flight.id)}>&#x2716;</div>
            
        </div>
    );
}