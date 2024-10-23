import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Login } from './components/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Signup } from './components/Signup';
import { CatalogPage } from './components/CatalogPage';
import { Header } from './components/Header';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { Logout } from './components/Logout';


const AuthenticatedRoute = ({children}: {children: any}) => {
  const {isAutheticated} = useAuth();

  if (isAutheticated) {
    return children;
  }

  return <Navigate to="/login"></Navigate>
}

function App() {
  return (
    <AuthProvider>
    <div className="d-flex justify-content-center flex-column">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/products" element={
            <AuthenticatedRoute> <CatalogPage /> </AuthenticatedRoute>
          } />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthProvider>
  );
}

export default App;
