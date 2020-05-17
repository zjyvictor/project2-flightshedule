import React, { useEffect } from 'react';
import './App.css';
import {Flight} from './flight'
import {useSelector, useDispatch} from 'react-redux';
import {OneFlight, startAddingFlight, loadAllLiveFlights} from './actions';



const oneFlight = new OneFlight("", "", "", "");
const newAirlines = oneFlight.airlines;
const newFlightNumber = oneFlight.flightnumber;
const newDeparture = oneFlight.departure;
const newArrival = oneFlight.arrival;


function App() {

  const flights = useSelector(state => state.flights);
  const dispatch = useDispatch();

  useEffect (() =>{
    dispatch(loadAllLiveFlights());
  },[dispatch]);


  const onAdd = () =>{
    dispatch(startAddingFlight(newAirlines, newFlightNumber, newDeparture, newArrival));
  }

  const onLoadAll = () =>{
    dispatch(loadAllLiveFlights());
  }

  return (
    <div id="flights-root">
      <div id="table-name">
        <div className="airlines-column">Airlines</div>
        <div className="flightnumber-column">Flight No.</div>
        <div className="departure-column">Departure</div>
        <div className="arrival-column">Arrival</div>
        <div className="edit"></div>
        <div className="delete-operation"></div>
      </div>


      <div id="add-and-load">
        <div id="add"><button onClick = {onAdd}>Add a new flight</button></div>
        <div id="load-all"><button onClick = {onLoadAll}>Load all live flights</button></div>
      </div>
      
      <div id="flights">
        {flights.map(flight => <Flight key = {flight.id} flight={flight} />)}
      </div>
      
    </div>
  );
}

export default App;
