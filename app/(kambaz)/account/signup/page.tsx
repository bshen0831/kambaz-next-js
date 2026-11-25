"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as client from "../client";
import { useAccountContext } from "../AccountContext";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setCurrentUser } = useAccountContext();
    const router = useRouter();

    const [error, setError] = useState("");

    const signup = async () => {
        if (!username || !password) return;
        try {
            const user = await client.signup({
                username,
                password,
                firstName: "",
                lastName: "",
                email: "",
                role: "STUDENT",
                loginId: "",
                section: "",
                lastActivity: "",
                totalActivity: "",
            });
            setCurrentUser(user);
            router.push("/account/profile");
        } catch (e) {
            setError(
                axios.isAxiosError(e) && e.response?.data?.message
                    ? e.response.data.message
                    : "Unable to sign up. Try again later."
            );
        }
    };

    return (
        <div id="wd-signup-screen" className="max-w-sm">
            <h3>Sign up</h3>
            {error && <div id="wd-signup-error" className="mb-2 text-red-600">{error}</div>}
            <input
                id="wd-username"
                placeholder="Username"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                id="wd-password"
                placeholder="Password"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                onClick={signup}
                id="wd-signup-btn"
                className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
            >
                Sign up
            </button>
            <Link
                href="/account/signin"
                id="wd-signin-link"
                className="block text-blue-600"
            >
                Sign in
            </Link>
        </div>
    );
}