import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SimPage from './SimPage';
import NavBar from './NavBar';


function App(){
  return (
    <Router>
      <div>
        <NavBar />

        <hr className='line'/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Simulation" element={<SimPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
