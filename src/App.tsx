import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import './assets/styles/sass/index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
