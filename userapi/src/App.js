import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Components/Register'; // ajusta esta ruta si tu carpeta es distinta
import Login from './Components/Login';
import { useDispatch } from 'react-redux';
import { loadFromStorage } from './slices/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <nav>
        <Link to="/register">Ir a Registro</Link>
        {/* Puedes agregar más links aquí */}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

// Simple componente Home de ejemplo
const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '3rem' }}>
    <h2>Bienvenido</h2>
    <p>Usa el menú para navegar</p>
  </div>
);

export default App;
