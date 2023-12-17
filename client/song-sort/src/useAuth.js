import { useState, useEffect } from 'react';
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // Initial login
    useEffect(() => {
        console.log("useAuth.js -- Logging in");
        axios
            .post('http://localhost:3001/login', {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);  
                window.history.pushState({}, null, "/"); // Remove code from the URL
            }).catch(() => {
                window.location = "/";
            })
    }, [code])

    // Refresh token
    useEffect(() => {
        console.log("useAuth.js -- Refreshing");
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post('http://localhost:3001/refresh', {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn); 
                    window.history.pushState({}, null, "/"); // Remove code from the URL
                })
                .catch(() => {
                    window.location = "/";
                })
            }, [(expiresIn - 60) * 1000]) // Refresh ~1 minute before hourly timeout

            return () => clearInterval(interval);
        }, [refreshToken, expiresIn])


    return accessToken 
};