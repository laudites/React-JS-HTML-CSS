import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import '../../js/dashboard';
import QuantidadePedidos from '../../Services/API/QtdPedidos';
import { useEffect, useState } from 'react';
import PedidosGeral from '../../Services/API/PedidosGeral';
import './gestaoPedido.css';

function GestaoPedido(content) {
    let usuario = localStorage.getItem('user').toUpperCase();
    const [naoIniciado, setNaoIniciado] = useState()
    const [emAndamento, setemAndamento] = useState()
    const [concluido, setconcluido] = useState()
    const [total, setTotal] = useState()
    const [pedidoNaoIniciado, setPedidoNaoIniciado] = useState();
    const porcentNaoIniciado = `${(naoIniciado * 100 / total).toFixed(2)}%`;
    const porcentEmAndamento = `${(emAndamento * 100 / total).toFixed(2)}%`;
    const porcentConcluido = `${(concluido * 100 / total).toFixed(2)}%`;
    let navigate = useNavigate();
    const Result = (content.content)
    const pedidoFiltrado = pedidoNaoIniciado?.filter(e => e.numeroPedido.includes(Result))
    useEffect(() => {
        QuantidadePedidos("NÃO INICIADO").then(items => { setNaoIniciado(items[0].qtd) });
        QuantidadePedidos("EM PROCESSO").then(items => { setemAndamento(items[0].qtd) });
        QuantidadePedidos("CONCLUÍDO").then(items => { setconcluido(items[0].qtd) });;
        setTotal(Number(naoIniciado) + Number(emAndamento) + Number(concluido));
    }, [naoIniciado, emAndamento, concluido])


    useEffect(() => {
        let valor = true;
        PedidosGeral("")
            .then(items => {
                if (valor) {
                    setPedidoNaoIniciado(items);
                }
            })
        return () => valor = false;
    }, [])

    function BuscarPedido(pedido, status) {
        if (status === "CONCLUÍDO") {
            navigate('/home/finalizado')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "EM PROCESSO") {
            navigate('/home/andamento')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "NÃO INICIADO") {
            navigate('/home/naoiniciado')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }

    }

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




                    <div className="" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        {/*<div className="col-md-12 grid-margin stretch-card"></div>*/}

                        <div className="card" style={{ width: "45%", margin: 10 }}>
                            <div className="card-body">
                                <p className="card-title">Clientes</p>
                                <div className="charts-data">
                                    <div className="mt-3">
                                        <p className="mb-0">Novos</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentNaoIniciado}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{naoIniciado}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Em andamento</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentEmAndamento}` }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{emAndamento}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="mb-0">Pendentes</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="progress progress-md flex-grow-1 mr-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${porcentConcluido}` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <p className="mb-0">{concluido}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="" style={{ margin: "10px", width: "45%" }}>
                            <div className="card data-icon-card-primary" style={{ height: "100%" }}>
                                <div className="card-body">
                                    <p className="card-title text-white">Numeros de clientes</p>
                                    <div className="row">
                                        <div className="col-8 text-white">
                                            <h3>{`${total}`}</h3>
                                            <p className="text-white font-weight-500 mb-0">Numero de clientes cadastrados no sistema Integra</p>
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
export default GestaoPedido;