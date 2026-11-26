"use client";
import axios from "axios";
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Connection() {
    const [status, setStatus] = useState<unknown>(null);
    const [error, setError] = useState("");
    const readConnectionStatus = async () => {
        setError("");
        try {
            const response = await axios.get(`${HTTP_SERVER}/lab6/connection`);
            setStatus(response.data);
        } catch (e) {
            setStatus(null);
            setError(`Could not reach ${HTTP_SERVER}: ${(e as Error).message}`);
        }
    };
    return (
        <div id="wd-lab6-connection">
            <h3>MongoDB connection</h3>
            <p>
                Students set <code>DATABASE_CONNECTION_STRING</code> on Express. This demo
                checks the server&apos;s database connection status.
            </p>
            <button type="button" id="wd-read-connection-status" onClick={readConnectionStatus}>
                Read connection status
            </button>
            {status !== null && <pre>{JSON.stringify(status, null, 2)}</pre>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <hr />
        </div>
    );
}
