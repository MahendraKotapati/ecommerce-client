import { useState } from "react";
import { useAuth } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const {login} = useAuth();
  const navigate = useNavigate();

  const loginUser = async () => {

    if (!email || !password) {
      setError(true);
      return ;
    }

    const loginResponse: any = await login(email, password);


    if (loginResponse.success) {
      if (loginResponse.data.role == "admin") {
        navigate(`/admin`);
      } else {
        navigate(`/products`);
      }
      setError(false);
    } else {
      setError(true);
    }
  }

  


  return (
    <div className="d-flex justify-content-center" style={{paddingTop: 72, paddingBottom: 60, paddingLeft: 80, paddingRight: 80, height: 'fit-content'}}>
        <div className="flex-column" style={{display: 'flex', width: 200, gap: 12}}>
            <input type="email" className="form-control"  value={email} onChange={(e) => setEmail(e.target.value!) } placeholder="Email" />
            <input type="password" className="form-control"  value={password} onChange={(e) => setPassword(e.target.value!) } placeholder="Password" />

            <button onClick={loginUser} className="btn" style={{backgroundColor: '#0000ffa3', color: 'white'}} > Login </button>
            {error && <div className="text-danger"> Invalid credentials </div>}
            <p className="text-secondary" style={{fontSize: 14, textAlign: "right"}}> <Link className="nav-link" to="/signup">Register Here</Link>  </p>
        </div>
      </div>
    )
}