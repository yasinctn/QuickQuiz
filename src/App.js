import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/EntryScreen/LoginScreen';
import Register from './components/EntryScreen/RegisterScreen';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import MyExamsPage from './components/MyExamsPage';  // Yeni ekledik

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/login" element={<Login />} />
        </Route>
        
        <Route path="/" element={<HomePage />}>
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route path="/" element={<HomePage />}>
          <Route path="/exam" element={<QuestionPage />} />
        </Route>

        <Route path="/" element={<HomePage />}>
          <Route path="myExams" element={<MyExamsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;