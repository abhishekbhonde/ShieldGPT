
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'
import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
              <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
