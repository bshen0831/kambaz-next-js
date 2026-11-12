"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useAccountContext } from "../AccountContext";

export default function Signin() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();
    const { setCurrentUser } = useAccountContext();
    const signin = async () => {
        try {
            const user = await client.signin(credentials);
            if (!user) return;
            setCurrentUser(user);
            router.push("/account/profile");
        } catch (error) {
            console.error("Sign in failed", error);
        }
    };

    return (
        <div id="wd-signin-screen" className="max-w-sm">
            <h3>Sign in</h3>
            <input
                placeholder="Username"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                id="wd-username"
                value={credentials.username}
                onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                }
            />
            <input
                placeholder="Password"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                type="password"
                id="wd-password"
                value={credentials.password}
                onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                }
            />
            <button
                type="button"
                onClick={signin}
                id="wd-signin-btn"
                className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
            >
                Sign in
            </button>
            <Link
                href="/account/signup"
                id="wd-signup-link"
                className="block text-blue-600"
            >
                Sign up
            </Link>
        </div>
    );
}