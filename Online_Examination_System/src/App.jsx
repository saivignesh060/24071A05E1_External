import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Exam from './pages/Exam';
import Result from './pages/Result';
import ExamsList from './pages/ExamsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exams" element={<ExamsList />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
