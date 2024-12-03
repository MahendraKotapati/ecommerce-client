import { createContext, ReactNode, useContext, useState } from "react"
import { apiClient, DataService } from "../services/data.service";

export interface AuthState {
    isAutheticated: boolean;
    email: string;
    login: (email: string, password: string) => {};
    logout: () => void;
    setIsAuthenticated: (isAutheticated: boolean) => any;
    setEmail: (email: string) => any;
    token: string;
}

export const AuthContext = createContext({} as AuthState);
export const useAuth = () => useContext(AuthContext);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {
    const [isAutheticated, setIsAuthenticated] = useState(false); // false
    const [email, setEmail] = useState(""); // "mahendra@gmail.com"
    const [token, setToken] = useState("");

    const dataService = new DataService();


    const login = async (email: string, password: string) => {
        let response;
        try {
            response = await dataService.login(email, password);
            if (response.success) {
                const token = response.data.token;
                apiClient.interceptors.request.use((config) => { 
                    config.headers.Authorization = token;
                    return config;
                });

                setIsAuthenticated(true);
                setEmail(email);
                setToken(token);
                return response;
            }
            else {
                setIsAuthenticated(false);
                setEmail("");
                return response;
            }
        } catch {
            setIsAuthenticated(false);
            setEmail("");
            return response;
        }

        console.log('login response: ', response);
    } 

    const logout = () => {
        setIsAuthenticated(false);
        setEmail("");
    }

    return (
        <AuthContext.Provider value={{isAutheticated, setIsAuthenticated, setEmail , email, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    )
}