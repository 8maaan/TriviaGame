import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>         
          <Route index element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
