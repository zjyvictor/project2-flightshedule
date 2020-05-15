import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Flight} from './flight'
import {useSelector, useDispatch} from 'react-redux';
import {loadFlights} from './actions';

function App() {

 

  // const removeFlight = id =>{
  //   setFlights(flights => flights.filter(flight => flight.id !== id));
  // }


  const flights = useSelector(state => state.flights);
  const dispatch = useDispatch();

  useEffect (() =>{
    dispatch(loadFlights([
      {id: 3, airlines: "Air China", flightnumber: "CA988", origin: "LAX", destination: "PEK"},
      {id: 2, airlines: "China Southern", flightnumber: "CZ682", origin: "ICN", destination: "SHE"},
      {id: 1, airlines: "China Eastern", flightnumber: "MU588", origin: "JFK", destination: "PVG"},
    ]));
  },[dispatch]);

  return (
    <div id="flights-root">
      <div id="table-name">
        <div className="airlines-column">Airlines</div>
        <div className="flightnumber-column">Flight No.</div>
        <div className="departure-column">Departure</div>
        <div className="arrival-column">Arrival</div>
        <div className="delete-operation"></div>
      </div>

      <div id="flights">
        {flights.map(flight => <Flight key = {flight.id} flight={flight} />)}
      </div>
      
    </div>
  );
}

export default App;
