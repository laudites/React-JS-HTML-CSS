//import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import '../../js/dashboard';
//import QuantidadePedidos from '../../Services/API/QtdPedidos';
import { useEffect, useState } from 'react';
import PedidosGeral from '../../Services/API/PedidosGeral';
import './dashboard.css';
import QuantidadeOrcamento from '../../Services/API/QtdOrcamento';
import QuantidadeContatosNovos from '../../Services/API/QtdContatosNovos';
import QuantidadeContatosAndamento from '../../Services/API/QtdContatosAndamento';
import QuantidadeContatosPendentes from '../../Services/API/QtdContatosPendentes';




function Parcial(content) {
    let usuario = localStorage.getItem('user').toUpperCase();


    //Orcamento
    const [ListaOrcamento, setListaOrcamento] = useState();
    const [OrcamentoEmAberto, setOrcamentoEmAberto] = useState();
    const [porcentOrcamentoEmAberto, setPorcentOrcamentoEmAberto] = useState();
    const [OrcamentoFechado, setOrcamentoFechado] = useState();
    const [porcentOrcamentoFechado, setPorcentOrcamentoFechado] = useState();
    const [OrcamentoPerdido, setOrcamentoPerdido] = useState();
    const [porcentOrcamentoPerdido, setPorcentOrcamentoPerdido] = useState();
    const [OrcamentoCancelado, setOrcamentoCancelado] = useState();
    const [porcentOrcamentoCancelado, setPorcentOrcamentoCancelado] = useState();
    const [OrcamentoNegociacao, setOrcamentoNegociacao] = useState();
    const [porcentOrcamentoNegociacao, setPorcentOrcamentoNegociacao] = useState();
    //Pedido
    const [ListaPedido, setListaPedido] = useState();
    const [pedidoNaoIniciado, setPedidoNaoIniciado] = useState();
    const [porcentPedidoNaoIniciado, setPorcentPedidoNaoIniciado] = useState();
    const [pedidoEmAndamento, setPedidoEmAndamento] = useState();
    const [porcentPedidoEmAndamento, setPorcentPedidoEmAndamento] = useState();
    const [pedidoFinalizado, setPedidoFinalizado] = useState();
    const [porcentPedidoFinalizado, setPorcentPedidoFinalizado] = useState();
    //Contato
    const [ListaContatoNovo, setListaContatoNovo] = useState();
    const [percentContatoNovo, setPercentContatoNovo] = useState();
    const [listaEmAndamento, setListaEmAndamento] = useState();
    const [percentListaEmAndamento, setPercentListaEmAndamento] = useState();
    const [listaPendente, setListaPendente] = useState();
    const [percentContatoPendente, setPercentContatoPendente] = useState();


    useEffect(() => {
        if (ListaOrcamento !== undefined && ListaOrcamento !== null) {
            setOrcamentoEmAberto(ListaOrcamento.filter(produto => produto.status === "Em aberto"));
            setOrcamentoFechado(ListaOrcamento.filter(produto => produto.status === "Fechado"));
            setOrcamentoPerdido(ListaOrcamento.filter(produto => produto.status === "Perdido"));
            setOrcamentoCancelado(ListaOrcamento.filter(produto => produto.status === "Cancelado"));
            setOrcamentoNegociacao(ListaOrcamento.filter(produto => produto.status === "Negociação"));

            setPorcentOrcamentoEmAberto(`${(OrcamentoEmAberto?.length * 100 / ListaOrcamento.length).toFixed(2)}%`);
            setPorcentOrcamentoFechado(`${(OrcamentoFechado?.length * 100 / ListaOrcamento.length).toFixed(2)}%`);
            setPorcentOrcamentoPerdido(`${(OrcamentoPerdido?.length * 100 / ListaOrcamento.length).toFixed(2)}%`);
            setPorcentOrcamentoCancelado(`${(OrcamentoCancelado?.length * 100 / ListaOrcamento.length).toFixed(2)}%`);
            setPorcentOrcamentoNegociacao(`${(OrcamentoNegociacao?.length * 100 / ListaOrcamento.length).toFixed(2)}%`);
            //Fim dos orcamentos

        }
    }, [ListaOrcamento, OrcamentoCancelado?.length, OrcamentoEmAberto?.length, OrcamentoFechado?.length, OrcamentoNegociacao?.length, OrcamentoPerdido?.length]);

    useEffect(() => {
        if (ListaPedido !== undefined && ListaPedido !== null) {
            setPedidoNaoIniciado(ListaPedido.filter(produto => produto.progressoDesc === "NÃO INICIADO"));
            setPedidoEmAndamento(ListaPedido.filter(produto => produto.progressoDesc === "EM PROCESSO"));
            setPedidoFinalizado(ListaPedido.filter(produto => produto.progressoDesc === "CONCLUÍDO"));

            setPorcentPedidoNaoIniciado(`${(pedidoNaoIniciado?.length * 100 / ListaPedido.length).toFixed(2)}%`);
            setPorcentPedidoEmAndamento(`${(pedidoEmAndamento?.length * 100 / ListaPedido.length).toFixed(2)}%`);
            setPorcentPedidoFinalizado(`${(pedidoFinalizado?.length * 100 / ListaPedido.length).toFixed(2)}%`);
        }
    }, [ListaPedido, pedidoEmAndamento?.length, pedidoFinalizado?.length, pedidoNaoIniciado?.length]);

    useEffect(() => {
        setPercentContatoNovo(`${(ListaContatoNovo?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
        setPercentListaEmAndamento(`${(listaEmAndamento?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
        setPercentContatoPendente(`${(listaPendente?.length * 100 / (ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length)).toFixed(2)}%`);
    }, [ListaContatoNovo?.length, listaEmAndamento?.length, listaPendente?.length]);


    useEffect(() => {
        QuantidadeOrcamento("%", '%').then(items => { setListaOrcamento(items) });
        PedidosGeral("%").then(items => { setListaPedido(items) });
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




                    <div id='hd01' className="">
                        {/*<div className="col-md-12 grid-margin stretch-card"></div>*/}
                        <div id='hd02' className="card" >
                            <div className="card-body">
                                <p className="card-title">Gestão de contato</p>
                                <div className="charts-data">
                                    <div className="mt-3">
                                        <p className="mb-0">Novo</p>
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
                                        <p className="mb-0">Pendente</p>
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
                        <div className="card" id='hd02'>
                            <div className="card-body">
                                <p className="card-title">Orçamento</p>
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
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentOrcamentoCancelado}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{OrcamentoCancelado?.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Negociação</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentOrcamentoNegociacao}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{OrcamentoNegociacao?.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card" id='hd02'>
                            <div className="card-body">
                                <p className="card-title">Gestão de pedidos</p>
                                <div className="charts-data">
                                    <div className="mt-3">
                                        <p className="mb-0">Não iniciado</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentPedidoNaoIniciado}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{pedidoNaoIniciado?.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Em andamento</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentPedidoEmAndamento}` }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{pedidoEmAndamento?.length}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Finalizado</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentPedidoFinalizado}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{pedidoFinalizado?.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='hd03' className="">
                            <div id='hd04' className="card data-icon-card-primary" >
                                <div className="card-body">
                                    <h1 className="card-title text-white">Valores total</h1>
                                    <div className="row">
                                        <div className="col-8 text-white">
                                            <h4>{`Contato: ${ListaContatoNovo?.length + listaEmAndamento?.length + listaPendente?.length}`}</h4><br />
                                            <h4>{`Orçamento: ${ListaOrcamento?.length}`}</h4><br />
                                            <h4>{`Pedido: ${ListaPedido?.length}`}</h4>
                                            {/*} <p className="text-white font-weight-500 mb-0">Numero de pedidos cadastrados no sistema Integra</p>*/}
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
export default Parcial;