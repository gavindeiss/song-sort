import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Cookies from 'js-cookie';


export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    //const navigate = useNavigate();

    // Initial login
    useEffect(() => {
        if (!code) return;
        console.log("useAuth.js -- Logging in");
        axios
            .post('http://localhost:3001/login', {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);  
                Cookies.set('accessToken', res.data.accessToken);
                window.history.pushState({}, null, "/"); // Remove code from the URL
                //navigate('/home');
            }).catch(() => {
                // window.location = "/";
            })
    }, [code])

    // Refresh token
    useEffect(() => {
        console.log("useAuth.js -- Refreshing");
        if (!refreshToken || !expiresIn || !code) return
        const interval = setInterval(() => {
            axios
                .post('http://localhost:3001/refresh', {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn); 
                    window.history.pushState({}, null, "/"); // Remove code from the URL
                    //navigate('/home');
                })
                .catch(() => {
                    //navigate('/');
                })
            }, [(expiresIn - 60) * 1000]) // Refresh ~1 minute before hourly timeout

            return () => clearInterval(interval);
        }, [refreshToken, expiresIn])


    return accessToken 
};