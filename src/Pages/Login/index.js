import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { default as logo } from '../../images/integra_v2.png';
import '../../vendors/feather/feather.css';
import '../../vendors/ti-icons/css/themify-icons.css';
import '../../vendors/css/vendor.bundle.base.css';
import '../../css/vertical-layout-light/style.css';
import '../../images/favicon.png';
import '../Login/Login.css';
import BuscarUser from '../../Services/API/User';
//import bcryptjs from 'bcryptjs';
import SolicitarToken from '../../Services/API/SolicitarToken';
import SalvandoRegistro from '../../Services/API/SalvandoRegistro';

function TelaLogin() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [showUser, setShowUser] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    async function Verificardor_Login() {
        setLoading(true);
        const newClicked = await BuscarUser(usuario, senha);

        //const result = bcryptjs.compareSync(senha, newClicked.senha)

        localStorage.setItem('Cod', usuario);
        if (newClicked !== undefined) {
            const result = await SolicitarToken(newClicked.usuario);
            await SalvandoRegistro(newClicked.cod_representante, "LogIn", result);
            navigate("/home")
        }
        else {
            setShowUser(true);
        }

    }

    return (
        <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
                <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                            <img id='login-logo' src={logo} alt="logo" />
                        </div>
                        {loading && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}

                        {showUser && <Alert variant='danger'>
                            <p>Usuario ou senha invalido!</p>
                        </Alert>}
                        <h4>Bem vindo!</h4>
                        <h6 className="font-weight-light">Entrar para continuar.</h6>
                        <form className="pt-3">
                            <div className="form-group">
                                <input className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Codigo representante"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <div type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => Verificardor_Login()}>ENTRAR</div>
                            </div>
                            {/*<div className="my-2 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                </div>
                                <a href="_blank" className="auth-link text-black">Esqueceu a senha?</a>
                            </div>
                            } <div className="text-center mt-4 font-weight-light">
                                Nao tem uma conta? <a href="register.html" className="text-primary">Criar</a>
    </div>*/}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TelaLogin;