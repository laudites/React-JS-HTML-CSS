
//import { IoIosCheckmarkCircleOutline, IoMdRemoveCircleOutline, IoIosArrowDropright } from 'react-icons/io';
import { BiLogOutCircle, BiSpreadsheet, BiGitPullRequest } from 'react-icons/bi';
import { MdOutlinePermContactCalendar } from 'react-icons/md'
import { RiHome2Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import React, { useState } from 'react';

import './barraLateral.css';
function BarraLateral(content) {
    // eslint-disable-next-line
    const [subMenu, setSubMenu] = useState('');
    function Logout() {
        localStorage.removeItem('token');
    }
    function ShowSubMenu(mostrar) {
        sessionStorage.setItem("pedidoPesquisa", "");
        setSubMenu(mostrar);

    }
    console.log(content)
    return (
        <nav className={`sidebar sidebar-offcanvas ${content.content3}`} id="sidebar">
            <ul className="nav">

                <li className="nav-item">
                    <a className="nav-link" href="../Home" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                        {/* <i className="icon-grid menu-icon"></i> */}
                        <RiHome2Line className='icone' size={20}></RiHome2Line>
                        {(content.content === "Home") ?
                            <span className={`menu-title`} style={{ fontWeight: "bold", color: "black" }}>Inicio</span>
                            :
                            <span className={`menu-title`}>Inicio</span>
                        }

                        <i className="menu-arrow"></i>
                    </a>
                </li>

                <li className="nav-item">
                    {(content.content === "GestaoContato") ?
                        <a className="nav-link" href="../gestaocontato" onClick={() => ShowSubMenu('Contato')}>
                            <MdOutlinePermContactCalendar className='icone' size={20}></MdOutlinePermContactCalendar>
                            <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Gestão contato</span>
                            <IoIosArrowDown size={20}></IoIosArrowDown>
                        </a>
                        :
                        <a className="nav-link" href="../gestaocontato" onClick={() => ShowSubMenu('Contato')}>
                            <MdOutlinePermContactCalendar className='icone' size={20}></MdOutlinePermContactCalendar>
                            <span className="menu-title">Gestão contato</span>
                            <i className="menu-arrow"></i>
                        </a>
                    }

                </li>
                <li className="nav-item teste">
                    {(content.content === "GestaoContato") ?
                        <a className="nav-link" id='subItem' href="../gestaocontato/novo" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {/*<span className="menu-title">Novos</span>*/}
                            {(content.content2 === 'gestaocontatoNovos') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Novos</span>
                                :
                                <span className="menu-title" >Novos</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "GestaoContato") ?
                        <a className="nav-link" id='subItem' href="../gestaocontato/andamento" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {/*<span className="menu-title">Em andamento</span>*/}
                            {(content.content2 === 'gestaocontatoAndamento') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Em andamento</span>
                                :
                                <span className="menu-title" >Em andamento</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "GestaoContato") ?
                        <a className="nav-link" id='subItem' href="../gestaocontato/pendentes" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {/*<span className="menu-title">Pendentes</span>*/}
                            {(content.content2 === 'gestaocontatoPendentes') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Pendentes</span>
                                :
                                <span className="menu-title" >Pendentes</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>

                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" href="../orcamento" onClick={() => ShowSubMenu('Orcamento')}>
                            <BiSpreadsheet className='icone' size={20}></BiSpreadsheet>
                            <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Orçamento</span>
                            <IoIosArrowDown size={20}></IoIosArrowDown>
                        </a>
                        :
                        <a className="nav-link" href="../orcamento" onClick={() => ShowSubMenu('Orcamento')}>
                            <BiSpreadsheet className='icone' size={20}></BiSpreadsheet>
                            <span className="menu-title">Orçamento</span>
                            <i className="menu-arrow"></i>
                        </a>
                    }

                </li>

                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" id='subItem' href="../orcamento/aberto" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'orcamentoaberto') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Aberto</span>
                                :
                                <span className="menu-title" >Aberto</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" id='subItem' href="../orcamento/fechado" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'orcamentofechado') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Fechado</span>
                                :
                                <span className="menu-title" >Fechado</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" id='subItem' href="../orcamento/perdido" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'orcamentoperdido') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Perdido</span>
                                :
                                <span className="menu-title" >Perdido</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" id='subItem' href="../orcamento/cancelado" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'orcamentocancelado') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Cancelado</span>
                                :
                                <span className="menu-title" >Cancelado</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "Orcamento") ?
                        <a className="nav-link" id='subItem' href="../orcamento/negociacao" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'orcamentonegociacao') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Negociação</span>
                                :
                                <span className="menu-title" >Negociação</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>


                <li className="nav-item">
                    {(content.content === "GestaoPedidos") ?
                        <a className="nav-link" href="../pedido" onClick={() => ShowSubMenu('GestaoPedidos')}>
                            <BiGitPullRequest className='icone' size={20}></BiGitPullRequest>
                            <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Gestão pedidos</span>
                            <IoIosArrowDown size={20}></IoIosArrowDown>
                        </a>
                        :
                        <a className="nav-link" href="../pedido" onClick={() => ShowSubMenu('GestaoPedidos')}>
                            <BiGitPullRequest className='icone' size={20}></BiGitPullRequest>
                            <span className="menu-title">Gestão pedidos</span>
                            <i className="menu-arrow"></i>
                        </a>
                    }

                </li>

                <li className="nav-item">
                    {(content.content === "GestaoPedidos") ?
                        <a className="nav-link" id='subItem' href="../Pedido/naoiniciado" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'gestaopedidonaoiniciado') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Não iniciado</span>
                                :
                                <span className="menu-title" >Não iniciado</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "GestaoPedidos") ?
                        <a className="nav-link" id='subItem' data-toggle="collapse" href="../Pedido/andamento" aria-expanded="false" aria-controls="ui-basic" onClick={sessionStorage.setItem("pedidoPesquisa", "")}>
                            {(content.content2 === 'gestaopedidoemprocesso') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Em processo</span>
                                :
                                <span className="menu-title">Em processo</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>
                <li className="nav-item">
                    {(content.content === "GestaoPedidos") ?
                        <a className="nav-link" id='subItem' data-toggle="collapse" href="../Pedido/finalizado" aria-expanded="false" aria-controls="form-elements">
                            {(content.content2 === 'gestaopedidofinalizado') ?
                                <span className="menu-title" style={{ fontWeight: "bold", color: "black" }}>Finalizado</span>
                                :
                                <span className="menu-title">Finalizado</span>
                            }
                            <i className="menu-arrow"></i>
                        </a>
                        :
                        <></>
                    }
                </li>

                <li className="nav-item nav-LogOut" onClick={() => Logout()}>
                    <a className="nav-link" href="../">
                        <BiLogOutCircle className='icone' size={20}></BiLogOutCircle>
                        <span className="menu-title">Sair</span>
                        <i className="menu-arrow"></i>
                    </a>
                </li>
            </ul>
        </nav>
    )



}
export default BarraLateral;