import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode, startSavingFlight, startDeletingFlight} from './actions';
export function Flight(props) {
    const flight = props.flight;
    const dispatch = useDispatch();

    const [airlines, setAirlines] = useState(flight.airlines);
    const [flightnumber, setFlightnumber] = useState(flight.flightnumber);
    const [departure, setDeparture] = useState(flight.departure);
    const [arrival, setArrival] = useState(flight.arrival);

    const onEdit = () =>{
        dispatch(enterEditMode(flight));
    }

    const onCancel = () =>{
        dispatch(leaveEditMode(flight));
    }

    const onSave = () =>{
        dispatch(startSavingFlight({
            id: flight.id,
            airlines,
            flightnumber,
            departure,
            arrival,
        }));
    }

    const onDelete = () =>{
        dispatch(startDeletingFlight(flight));
    }

    if(flight.isEditing){
        return (
            <div className="flight">
                <div className="airlines"><input type="text" value={airlines} onChange={e =>
                    setAirlines(e.target.value)
                }/></div>
                <div className="flightnumber"><input type="text" value={flightnumber} onChange={e =>
                    setFlightnumber(e.target.value)
                }/></div>
                <div className="origin"><input type="text" value={departure} onChange={e =>
                    setDeparture(e.target.value)
                }/></div>
                <div className="destination"><input type="text" value={arrival} onChange={e =>
                    setArrival(e.target.value)
                }/></div>
                    <div className="save">
                        <button onClick={onSave}>save</button>
                    </div> 
                    <div className="cancel">
                        <button onClick={onCancel}>cancel</button>
                    </div>
            </div>
        );
    }else{
        return (
            <div className="flight">
                <div className="airlines">{flight.airlines}</div>
                <div className="flightnumber">{flight.flightnumber}</div>
                <div className="origin">{flight.departure}</div>
                <div className="destination">{flight.arrival}</div>
                <div className="edit" onClick = {onEdit}><button>Edit</button></div>
                <div className="delete-button" onClick = {onDelete}>&#x2716;</div>
            </div>
        );
    }
   
}