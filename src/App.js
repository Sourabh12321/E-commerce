import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dishes from './pages/Dishes';
import VegPage from './pages/VegPage';
import NonVegPage from './pages/NonVegPage';
import CartPage from './pages/CartPage';
import UserLoginSignup from './pages/UserLoginSignup';
import OrderPlace from './pages/OrderPage';
import OrderDetails from './pages/OrderDetails';
import AdminFeatures from './pages/AdminFeaturesPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const state = useSelector((state) => state?.auth?.data?.admin);

  useEffect(() => {
    setIsAdmin(!!state);
  }, [state]);

  return (
    <div className='App' style={{ backgroundColor: 'blue', width: '100%' }}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/dishes' element={<Dishes />} />
          <Route path='/veg' element={<VegPage />} />
          <Route path='/nonveg' element={<NonVegPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/signupLogin' element={<UserLoginSignup />} />
          <Route path='/order' element={<OrderPlace />} />
          <Route path='/orderDetails' element={<OrderDetails />} />
          <Route element={<ProtectedRoute isAdmin={isAdmin} />}>
            <Route path='/admin' element={<AdminFeatures />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
