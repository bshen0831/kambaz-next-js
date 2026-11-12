"use client";

import { redirect } from "next/navigation";
import { useAccountContext } from "./AccountContext";

export default function AccountPage() {
    const { currentUser, loaded } = useAccountContext();
    if (!loaded) return null;
    if (!currentUser) {
        redirect("/account/signin");
    } else {
        redirect("/account/profile");
    }
}