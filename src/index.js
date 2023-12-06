import React from 'react';
import ReactDOM from 'react-dom/client';
import './sim_styles.css';
import './nav_styles.css';
import './home_styles.css';
import App from './App';
// import express from "express";

// const app = express()

// app.listen(8800, ()=>{
//   console.log("Done")
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

