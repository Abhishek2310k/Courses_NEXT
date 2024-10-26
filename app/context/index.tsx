// function to provide app with a central state
"use client"
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const AppContext = createContext<any>(undefined);
export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<boolean | null>(false);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setState(true);
        } else {
            setState(false);
        }
    }, []);
    return (
        <AppContext.Provider value={{
            state,setState
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
