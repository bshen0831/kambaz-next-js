"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as client from "../client";
import { useAccountContext, type User } from "../AccountContext";

export default function Profile() {
    const { currentUser, loaded } = useAccountContext();
    const router = useRouter();

    useEffect(() => {
        if (loaded && !currentUser) {
            router.push("/account/signin");
        }
    }, [loaded, currentUser, router]);

    if (!currentUser) return null;
    return <ProfileForm initialProfile={currentUser} />;
}

function ProfileForm({ initialProfile }: { initialProfile: User }) {
    const { setCurrentUser } = useAccountContext();
    const [profile, setProfile] = useState<User>(initialProfile);
    const router = useRouter();

    const updateProfile = async () => {
        try {
            const updatedProfile = await client.updateUser(profile);
            setCurrentUser(updatedProfile);
            setProfile(updatedProfile);
        } catch (error) {
            console.error("Update profile failed", error);
        }
    };

    const signout = async () => {
        try {
            await client.signout();
        } catch (error) {
            console.error("Sign out failed", error);
        }
        setCurrentUser(null);
        router.push("/account/signin");
    };

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
                placeholder="Password"
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <input
                id="wd-first-name"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.firstName}
                placeholder="First Name"
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
            <input
                id="wd-last-name"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.lastName}
                placeholder="Last Name"
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
            <input
                id="wd-email"
                className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                value={profile.email}
                placeholder="Email"
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
                onClick={updateProfile}
                id="wd-update-profile-btn"
                className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white"
            >
                Update Profile
            </button>
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