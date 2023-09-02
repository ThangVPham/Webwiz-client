import "./App.css";
import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Form from "./pages/Form";
import Tournament from "./components/Tournament";
import Footer from "./components/Footer";
import AddPlayers from "./components/AddPlayers";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<Form />} />
        <Route path="/tournaments/:id" element={<Tournament />} />
        <Route path="/tournaments/addplayers/:id" element={<AddPlayers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
