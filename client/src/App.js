import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import { AuthContextProvider } from './Context-and-Routes/AuthContext';
import ProtectedRoute from './Context-and-Routes/ProtectedRoute';
import GuestRoute from './Context-and-Routes/GuestRoute';
import TriviaPage from './Pages/TriviaPage';


function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {/* GUEST ROUTES */}
            <Route index element={<GuestRoute><LoginPage/></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><RegisterPage/></GuestRoute>} />

            {/* PROTECTED ROUTES */}
            <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />

            {/* TBD */}
            <Route path="/trivia" element={<TriviaPage/>} />
          </Routes>
        </BrowserRouter>     
      </AuthContextProvider>
    </div>
  );
}

export default App;
