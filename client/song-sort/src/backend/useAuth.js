import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    const navigate = useNavigate();

    // Initial login
    useEffect(() => {
        console.log("useAuth.js -- Logging in");
        console.log("Code while logging in", code)
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
                // window.location = "/";
                navigate('/home');
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
                    navigate('/home');
                })
            }, [(expiresIn - 60) * 1000]) // Refresh ~1 minute before hourly timeout

            return () => clearInterval(interval);
        }, [refreshToken, expiresIn])


    return accessToken 
};