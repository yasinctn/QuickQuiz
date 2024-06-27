import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from './firebase'; // Firebase config dosyanızı import edin
import Login from './components/EntryScreen/LoginScreen';
import Register from './components/EntryScreen/RegisterScreen';
import HomePage from './components/HomePage';
import QuizScreen from

 './components/QuizScreen';
import MyExamsPage from './components/MyExamsPage';  // Yeni ekledik

const auth = getAuth(app);

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="quiz" element={
            <PrivateRoute user={user}>
              <QuizScreen />
            </PrivateRoute>
          } />
          <Route path="myExams" element={
            <PrivateRoute user={user}>
              <MyExamsPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;