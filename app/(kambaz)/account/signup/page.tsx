import Link from "next/link";

export default function Signup() {
    return (
        <div id="wd-signup-screen"
            className="max-w-sm">
            <h3>Sign Up</h3>
            <input
                id="wd-username"
                placeholder="Username"
                className="wd-username mb-2 w-full rounded border border-neutral-300 px-3 py-2"
            />
            <br />
            <input
                placeholder="Password"
                type="password"
                className="wd-password  mb-2 w-full rounded border border-neutral-300 px-3 py-2"
                defaultValue=""
            />
            <br />
            <input
                placeholder="Verify Password"
                type="password"
                className="wd-password-verify mb-2 w-full rounded border border-neutral-300 px-3 py-2"
            />
            <Link
                id="wd-signin-btn"
                href="/account/signin"
                className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white no-underline"
            >
                Sign in
            </Link>
            <Link id="wd-signup-link"
                href="/account/profile"
                className="mb-2 block w-full rounded bg-gray-600 px-3 py-2 text-center text-white no-underline">
                Sign up
            </Link>
        </div>
    );
}