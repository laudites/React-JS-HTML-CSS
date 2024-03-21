import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraLateral from "../../components/barraLateral";
import HomeDashBoard from '../../components/homeDashborad';
import CheckToken from "../../Services/CheckToken";
import './GestaoContato.css';
import { default as logo } from '../../images/integra_v2.jpg';
import { default as logoMini } from '../../images/icone_eletrofrio.png';

import { BiLogOutCircle } from 'react-icons/bi';
import GestaoContato from "../../components/gestaoContato";

function TelaGestaoContato() {

    const [pesquisa, setPesquisa] = useState('');
    const [mostrar, setMostrar] = useState('dropdown-menu dropdown-menu-right navbar-dropdown');
    const [showBarraLateral, setshowBarraLateral] = useState('');
    let navigate = useNavigate();
    function Mostrar_opcao() {
        if (mostrar === 'dropdown-menu dropdown-menu-right navbar-dropdown') {
            setMostrar('dropdown-menu dropdown-menu-right navbar-dropdown show');
        }
        else {
            setMostrar('dropdown-menu dropdown-menu-right navbar-dropdown');
        }
    }
    function ShowLateral() {
        if (showBarraLateral === '') {
            setshowBarraLateral('active');
        }
        else {
            setshowBarraLateral('');
        }
    }
    function Logout() {
        localStorage.removeItem('token');
        navigate("/")
        window.location.reload(false);
    }
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    useEffect(() => {

        let token = localStorage.getItem('token');

        let decodedToken = jwtDecode(token)
        let currentDate = new Date();

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            navigate('/');
            window.location.reload(false);
            alert('LOGOUT');
        }
    }, [navigate])


    return (
        <>
            {CheckToken && (
                <div>
                    <div>
                        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                                <a className="navbar-brand brand-logo mr-5" href="../Home"><img src={logo} className="mr-2" alt="logo" id='logo-navegacao' /></a>
                                <a className="navbar-brand brand-logo-mini" href="../Home"><img src={logoMini} alt="logo" /></a>
                            </div>
                            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                                <ul className="navbar-nav mr-lg-2">
                                    <li className="nav-item nav-search d-lg-block" >
                                        <div className="input-group">{/*
                                            <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                                                <span className="input-group-text" id="search">
                                                    <i className="icon-search"></i>
                                                </span>
                                            </div>
                                            
                                            <input onChange={e => setPesquisa(e.target.value)} type="text" className="form-control" id="navbar-search-input" placeholder="Procurar pedido" aria-label="search" aria-describedby="search" value={pesquisa} />
*/}
                                        </div>
                                    </li>
                                </ul>
                                <ul className="navbar-nav navbar-nav-right">
                                    <li className="nav-item nav-profile dropdown" >
                                        <div className='nav-link_1' onClick={() => Mostrar_opcao()}>
                                            {/*<ImMenu size={30} color={"#4B49AC"}></ImMenu>*/}
                                            <BiLogOutCircle className="IconeLogOut" size={40} color={"#6610f2"}></BiLogOutCircle>
                                        </div>
                                        <div className={mostrar} aria-labelledby="profileDropdown" aria-expanded='true' >
                                            {/*<a className="dropdown-item" href="_blank">
                                                <i className="ti-settings text-primary"></i>
                                                Settings
                                            </a>*/}
                                            <button className="dropdown-item" onClick={() => Logout()}>
                                                <i className="ti-power-off text-primary"></i>
                                                Sair
                                            </button>

                                        </div>
                                    </li>
                                </ul>
                                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={() => ShowLateral()}>
                                    <span className="icon-menu"></span>
                                </button>
                            </div>
                        </nav>
                        {width < 600 && (
                            <BarraLateral content="GestaoContato" content3={showBarraLateral}></BarraLateral>
                        )}
                    </div>
                    <div className="container-fluid page-body-wrapper">
                        <BarraLateral content="GestaoContato"></BarraLateral>
                        <GestaoContato content={pesquisa}></GestaoContato>
                    </div>
                </div>
            )}
        </>
    )

}
export default TelaGestaoContato;