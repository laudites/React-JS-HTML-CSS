import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import '../../js/dashboard';
import QuantidadeOrcamento from '../../Services/API/QtdOrcamento';
import { useEffect, useState } from 'react';
import './gestaoOrcamento.css'

function GestaoOrcamento(content) {
    let usuario = localStorage.getItem('user').toUpperCase();

    const [ListaOrcamento, setListaOrcamento] = useState();
    const [OrcamentoEmAberto, setOrcamentoEmAberto] = useState();
    const [OrcamentoFechado, setOrcamentoFechado] = useState();
    const [OrcamentoPerdido, setOrcamentoPerdido] = useState();
    const [OrcamentoCancelado, setOrcamentoCancelado] = useState();
    const [OrcamentoNegociacao, setOrcamentoNegociacao] = useState();

    const porcentOrcamentoEmAberto = `${(OrcamentoEmAberto?.length * 100 / ListaOrcamento?.length).toFixed(2)}%`;
    const porcentOrcamentoFechado = `${(OrcamentoFechado?.length * 100 / ListaOrcamento?.length).toFixed(2)}%`;
    const porcentOrcamentoPerdido = `${(OrcamentoPerdido?.length * 100 / ListaOrcamento?.length).toFixed(2)}%`;
    const porcentOrcamentoCancelado = `${(OrcamentoCancelado?.length * 100 / ListaOrcamento?.length).toFixed(2)}%`;
    const porcentOrcamentoNegociacao = `${(OrcamentoNegociacao?.length * 100 / ListaOrcamento?.length).toFixed(2)}%`;

    useEffect(() => {
        QuantidadeOrcamento('%', '%').then(itens => { setListaOrcamento(itens) });
        QuantidadeOrcamento('Em aberto', '%').then(itens => { setOrcamentoEmAberto(itens) });
        QuantidadeOrcamento('Fechado', '%').then(itens => { setOrcamentoFechado(itens) });
        QuantidadeOrcamento('Perdido', '%').then(itens => { setOrcamentoPerdido(itens) });
        QuantidadeOrcamento('Cancelado', '%').then(itens => { setOrcamentoCancelado(itens) });
        QuantidadeOrcamento('Negociação', '%').then(itens => { setOrcamentoNegociacao(itens) });
    }, []);
    const Result = (content.content)
    const pedidoFiltrado = ListaOrcamento?.filter(e => e.numeroOrcamento.includes(Result))
    let navigate = useNavigate();
    function BuscarPedido(pedido, status) {
        if (status === "Em aberto") {
            navigate('/orcamento/aberto')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "Fechado") {
            navigate('/orcamento/fechado')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "Perdido") {
            navigate('/orcamento/perdido')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "Cancelado") {
            navigate('/orcamento/cancelado')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "Negociação") {
            navigate('/orcamento/negociacao')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
    }

    return (
        <>
            <div className="main-panel">
                <div className="content-wrapper">
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
                    <div className="row">
                        <div className="col-md-4 stretch-card grid-margin" id='dashTdPedido'>
                            <div className="card">
                                <div className="card-body " id='pp001'>
                                    <p className="card-title mb-0">Todos Orçamentos</p>
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th><input className='inds01' placeholder='Nº Orçamento'></input></th>
                                                    <th><input className='inds01' placeholder='Nome Fantasia'></input></th>
                                                    <th><input className='inds01' placeholder='Status'></input></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedidoFiltrado?.map((e) =>
                                                    <tr className='ds01' key={e.numeroOrcamento} onClick={() => BuscarPedido(e.numeroOrcamento, e.status)}>
                                                        {<td>{e.numeroOrcamento}</td>}
                                                        {<td>{e.nomeFantasia}</td>}

                                                        {<td>{e.status}</td>}
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 stretch-card grid-margin">
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <p className="card-title">Status</p>
                                            <div className="charts-data">
                                                <div className="mt-3">
                                                    <p className="mb-0">Em aberto</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="progress progress-md flex-grow-1 mr-4">
                                                            <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentOrcamentoEmAberto}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mb-0">{OrcamentoEmAberto?.length}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="mb-0">Fechado</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="progress progress-md flex-grow-1 mr-4">
                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentOrcamentoFechado}` }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mb-0">{OrcamentoFechado?.length}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="mb-0">Perdido</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="progress progress-md flex-grow-1 mr-4">
                                                            <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentOrcamentoPerdido}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mb-0">{OrcamentoPerdido?.length}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="mb-0">Cancelado</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="progress progress-md flex-grow-1 mr-4">
                                                            <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentOrcamentoCancelado}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mb-0">{OrcamentoCancelado?.length}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="mb-0">Negociação</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="progress progress-md flex-grow-1 mr-4">
                                                            <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentOrcamentoNegociacao}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                        <p className="mb-0">{OrcamentoNegociacao?.length}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 stretch-card grid-margin grid-margin-md-0">
                                    <div className="card data-icon-card-primary">
                                        <div className="card-body">
                                            <p className="card-title text-white">Numeros de orçamentos</p>
                                            <div className="row">
                                                <div className="col-8 text-white">
                                                    <h3>{`${ListaOrcamento?.length}`}</h3>
                                                    <p className="text-white font-weight-500 mb-0">Numero de orçamentos cadastrados no sistema Integra</p>
                                                </div>
                                                <div className="col-4 background-icon">
                                                </div>
                                            </div>
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
export default GestaoOrcamento; 