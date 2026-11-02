"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";

export default function Profile() {
    const { currentUser, setCurrentUser } = useAccountContext();
    const [profile, setProfile] = useState<User | null>(currentUser);
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/account/signin");
        }
    }, [currentUser, router]);

    const signout = () => {
        setCurrentUser(null);
        router.push("/account/signin");
    };

    if (!profile) return null;
    return (
        <div id="wd-profile-screen" className="max-w-sm">
            <h3>Profile</h3>
            <input
                id="wd-username"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <input
                id="wd-password"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                type="password"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <input
                id="wd-first-name"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
            <input
                id="wd-last-name"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
            <input
                id="wd-email"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <input
                id="wd-role"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            />

            <button
                type="button"
                onClick={signout}
                id="wd-signout-btn"
                className="mb-2 block w-full rounded bg-red-600 px-3 py-2 text-center text-white"
            >
                Sign out
            </button>
        </div>
    );
}