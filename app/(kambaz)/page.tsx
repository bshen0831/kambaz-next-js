import { redirect } from "next/navigation";

// /account sends signed-in users to Profile and everyone else to Sign in
export default function Kambaz() {
    redirect("/account");
}
