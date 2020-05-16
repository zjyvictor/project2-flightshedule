import React from 'react';
import {useDispatch} from 'react-redux';
import {enterEditMode, leaveEditMode} from './actions';
export function Flight(props) {
    const flight = props.flight;
    const dispatch = useDispatch();

    const onEdit = () =>{
        dispatch(enterEditMode(flight));
    }

    const onCancel = () =>{
        dispatch(leaveEditMode(flight));
    }

    if(flight.isEditing){
        return (
            <div className="flight">
                <div className="airlines"><input type="text"/></div>
                <div className="flightnumber"><input type="text"/></div>
                <div className="origin"><input type="text"/></div>
                <div className="destination"><input type="text"/></div>
                    <div className="save">
                        <button>save</button>
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
                <div className="delete-button" onClick = {() => props.remove(flight.id)}>&#x2716;</div>
            </div>
        );
    }
   
}