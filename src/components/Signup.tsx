import { useState } from "react";
import { DataService } from "../services/data.service";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const Signup = () => {   

    const dataService = new DataService();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {isAutheticated, setIsAuthenticated, setEmail: setLoggedUserEmail} = useAuth();

    const registerUser = async () => {
        let response;
        try {
            response = await dataService.registerUser(fullName, email, password);
            console.log('response: ', response);
            setError(false);
            if (response.success) {
                setIsAuthenticated(true);
                setEmail(email);
                navigate(`/products`);   
            }
        } catch {
            setError(true);
            setIsAuthenticated(false);
            setLoggedUserEmail("");
        }
    }

    return (
        <div className="d-flex justify-content-center" style={{paddingTop: 72, paddingBottom: 60, paddingLeft: 80, paddingRight: 80, height: 'fit-content'}}>
            <div className="flex-column" style={{display: 'flex', width: 200, gap: 12}}>
                <input type="text" className="form-control" placeholder="FullName" value={fullName} onChange={(e) => setFullName(e.target.value!) } />
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value!) } />
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value!) } />
    
                <button onClick={registerUser} className="btn" style={{backgroundColor: '#0000ffa3', color: 'white'}}> Register </button>
                {error && <div className="text-danger"> Error In Creating User </div>}
                <p className="text-secondary" style={{fontSize: 14, textAlign: "right"}}> <Link className="nav-link" to="/login">Login Here</Link>  </p>
            </div>
          </div>
        )
}