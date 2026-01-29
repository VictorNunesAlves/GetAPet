import { createContext } from 'react';
import useAuth from '../hooks/useAuth';

export const Context = createContext();

export function UserProvider({ children }) {
    const { authenticated, register, logout, login } = useAuth();

    return (
        <Context.Provider value={{ authenticated, register, logout, login }}>
            {children}
        </Context.Provider>
    );
}
