"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import * as client from "./client";

export default function HttpClient() {

    const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
    const [welcomeOnClick, setWelcomeOnClick] = useState("");
    const fetchWelcomeOnClick = async () => {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnClick(message);
    };
    const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
    const fetchWelcomeOnLoad = async () => {
        const welcome = await client.fetchWelcomeMessage();
        setWelcomeOnLoad(welcome);
    };
    useEffect(() => {
        fetchWelcomeOnLoad();
    }, []);
    return (<>
        <button type="button" onClick={fetchWelcomeOnClick}>Fetch Welcome</button>
        <p>Response from server: <b>{welcomeOnClick}</b></p>
        <br />
        <p>Response from server on load: <b>{welcomeOnLoad}</b></p>
    </>);




}