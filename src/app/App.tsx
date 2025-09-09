import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Venues from '../features/venues/Venues';
import Venue from '../features/venues/Venue';
import Events from '../features/events/Events';
import Event from '../features/events/Event';
import { FavoritesProvider } from '../context/FavoritesContext';
import Nav from '../components/Nav/Nav';

const App: React.FC = () => (
  <FavoritesProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/venues" Component={Venues} />
        <Route path="/venues/:venueId" Component={Venue} />
        <Route path="/events" Component={Events} />
        <Route path="/events/:eventId" Component={Event} />
      </Routes>
    </Router>
  </FavoritesProvider>
);



export default App;
