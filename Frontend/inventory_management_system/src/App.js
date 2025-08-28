import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import RegistrationSuccess from './components/RegistrationSuccess';
import AuthCallback from './components/AuthCallback';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';




function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar title="IMS" about="About"></Navbar>
          <Routes>
            {/* Public Routes */}
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-success" element={<RegistrationSuccess />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected Routes */}
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/insertproduct" element={<PrivateRoute><InsertProduct /></PrivateRoute>} />
            <Route path="/updateproduct/:id" element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
