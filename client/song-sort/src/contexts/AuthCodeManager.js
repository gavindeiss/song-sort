import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../backend/useAuth';

const CodeContext = createContext();

export const useCode = () => useContext(CodeContext);

export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract code from URL
    const urlCode = new URLSearchParams(window.location.search).get('code');
    console.log("urlCode", urlCode)
    if (urlCode) {
      setCode(urlCode);
      //const code = useCode().code;
      console.log("Dashboard code: ", code.code, code)
      const accessToken = useAuth(code);
      setAccessToken(accessToken);
      navigate('/home');
    }
  }, []);

  const setCodeValue = (newCode) => {
    setCode(newCode);
  };

  return (
    <CodeContext.Provider value={{ code, setCode: setCodeValue, accessToken }}>
      {children}
    </CodeContext.Provider>
  );
};

