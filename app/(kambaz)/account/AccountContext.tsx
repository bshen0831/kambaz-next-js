"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as client from "./client";
import usersJson from "../database/users.json";

export type User = (typeof usersJson)[number];

type AccountContextValue = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
    /** true once the initial session check against the server has finished */
    loaded: boolean;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    // Restore the signed-in user from the server session on first load.
    useEffect(() => {
        let cancelled = false;
        client
            .profile()
            .then((user) => {
                if (!cancelled && user) setCurrentUser(user);
            })
            .catch(() => {
                // 401 / network error: nobody is signed in
            })
            .finally(() => {
                if (!cancelled) setLoaded(true);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <AccountContext.Provider value={{ currentUser, setCurrentUser, loaded }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccountContext() {
    const value = useContext(AccountContext);
    if (!value) {
        throw new Error("useAccountContext must be used inside AccountProvider");
    }
    return value;
}