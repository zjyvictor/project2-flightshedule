import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Flight} from './flight'
import {useSelector, useDispatch} from 'react-redux';
import {loadRoute, OneFlight, Route, startAddingFlight, 
  loadFlightNumber, loadDeparture, loadArrival, Arrival, loadAllLiveFlights} from './actions';


const route = new Route("NRT", "PVG");
const departure = route.departure;
const arrival = route.arrival;

const searchArrival = new Arrival("PVG");
const searchCurrentArrival = searchArrival.arrival;

const oneFlight = new OneFlight("", "", "", "");
const newAirlines = oneFlight.airlines;
const newFlightNumber = oneFlight.flightnumber;
const newDeparture = oneFlight.departure;
const newArrival = oneFlight.arrival;


function App() {

  // const removeFlight = id =>{
  //   setFlights(flights => flights.filter(flight => flight.id !== id));
  // }


  const flights = useSelector(state => state.flights);
  const dispatch = useDispatch();

  useEffect (() =>{
    // dispatch(loadRoute(departure, arrival));
    // dispatch(loadArrival(searchCurrentArrival));
    dispatch(loadAllLiveFlights());
  },[dispatch]);


  const onAdd = () =>{
    dispatch(startAddingFlight(newAirlines, newFlightNumber, newDeparture, newArrival));
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

      <div id="add"><button onClick = {onAdd}>Add a new flight</button></div>
      

      <div id="flights">
        {flights.map(flight => <Flight key = {flight.id} flight={flight} />)}
      </div>
      
    </div>
  );
}

export default App;
