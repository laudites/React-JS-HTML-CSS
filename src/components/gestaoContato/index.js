import Footer from '../footer';
import '../../js/dashboard';
import { useEffect, useState } from 'react';
import './gestaoContato.css';
import QuantidadeContatosNovos from '../../Services/API/QtdContatosNovos';
import QuantidadeContatosAndamento from '../../Services/API/QtdContatosAndamento';
import QuantidadeContatosPendentes from '../../Services/API/QtdContatosPendentes';

function GestaoContato(content) {
    let usuario = localStorage.getItem('user').toUpperCase();

    const [ListaContatoNovo, setListaContatoNovo] = useState();
    const [percentContatoNovo, setPercentContatoNovo] = useState();
    const [listaEmAndamento, setListaEmAndamento] = useState();
    const [percentListaEmAndamento, setPercentListaEmAndamento] = useState();
    const [listaPendente, setListaPendente] = useState();
    const [percentContatoPendente, setPercentContatoPendente] = useState();

    useEffect(() => {
        setPercentContatoNovo(`${(ListaContatoNovo?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
        setPercentListaEmAndamento(`${(listaEmAndamento?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
        setPercentContatoPendente(`${(listaPendente?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
    }, [ListaContatoNovo?.length, listaEmAndamento?.length, listaPendente?.length]);

    useEffect(() => {
        QuantidadeContatosNovos().then(itens => { setListaContatoNovo(itens) });
        QuantidadeContatosAndamento().then(itens => { setListaEmAndamento(itens) });
        QuantidadeContatosPendentes().then(itens => { setListaPendente(itens) });
    }, []);
    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
                    {/*Primeira divisao*/}
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="row">
                                <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                    <h3 className="font-weight-bold">Bem vindo {usuario}</h3>
                                    <h6 className="font-weight-normal mb-0">Segue as informações do sistema Integra </h6>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div id='hd01' className="" >
                        {/*<div className="col-md-12 grid-margin stretch-card"></div>*/}

                        <div id='hd05' className="card" >
                            <div className="card-body">
                                <p className="card-title">Contatos</p>
                                <div className="charts-data">
                                    <div className="mt-3">
                                        <p className="mb-0">Novos</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${percentContatoNovo}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{ListaContatoNovo?.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Em andamento</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${percentListaEmAndamento}` }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{listaEmAndamento?.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Pendentes</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${percentContatoPendente}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{listaPendente?.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='hd05' className="card" >
                            <div className="card data-icon-card-primary" id='hd04'>
                                <div className="card-body">
                                    <p className="card-title text-white">Numeros de Contatos</p>
                                    <div className="row">
                                        <div className="col-8 text-white">
                                            <h3>{`${ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length}`}</h3>
                                            <p className="text-white font-weight-500 mb-0">Cadastrados no sistema Integra</p>
                                        </div>
                                        <div className="col-4 background-icon">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Footer></Footer>
            </div>
        </>
    )
}
export default GestaoContato;