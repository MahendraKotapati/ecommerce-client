import { createContext, ReactNode, useContext, useState } from "react"
import { DataService } from "../services/data.service";

export interface AuthState {
    isAutheticated: boolean;
    email: string;
    login: (email: string, password: string) => {};
    logout: () => void;
    setIsAuthenticated: (isAutheticated: boolean) => any;
    setEmail: (email: string) => any;
}

export const AuthContext = createContext({} as AuthState);
export const useAuth = () => useContext(AuthContext);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {
    const [isAutheticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");

    const dataService = new DataService();


    const login = async (email: string, password: string) => {
        let response;
        try {
            response = await dataService.login(email, password);
            if (response.success) {
                setIsAuthenticated(true);
                setEmail(email);
                return true;
            }
            else {
                setIsAuthenticated(false);
                setEmail("");
                return false;
            }
        } catch {
            setIsAuthenticated(false);
            setEmail("");
            return false;
        }

        console.log('login response: ', response);
    } 

    const logout = () => {
        setIsAuthenticated(false);
        setEmail("");
    }

    return (
        <AuthContext.Provider value={{isAutheticated, setIsAuthenticated, setEmail , email, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}