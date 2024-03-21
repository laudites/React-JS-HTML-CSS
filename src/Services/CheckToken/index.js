import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CheckToken() {

    let navigate = useNavigate();
    const [valido, setValido] = useState();
    useEffect(() => {
        let teste = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkludGVncmEiLCJuYmYiOjE2Njc0NzU5NTQsImV4cCI6MTY2NzQ4MzE1NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MTU5OSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjE1OTkifQ.tbeRdBX5IN8-3xGDWSEZZX9JFecvpN73FlB1oKkqtU0"
        let token = teste//localStorage.getItem('token');

        let decodedToken = jwtDecode(token)
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            setValido(false)
        } else {
            setValido(true)
        }
    }, [])
    console.log(valido)

    if (valido === false) {
        navigate('/');
        window.location.reload(false);
        alert('LOGOUT');
        return (
            false
        )
    }
    return (
        valido
    )
}
export default CheckToken;