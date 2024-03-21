import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import '../../../src/js/dashboard';
import QuantidadePedidos from '../../Services/API/QtdPedidos';
import { useEffect, useState } from 'react';
import PedidosGeral from '../../Services/API/PedidosGeral';
import './dashboard.css';






function Parcial(content) {
    let usuario = localStorage.getItem('user').toUpperCase();
    const [naoIniciado, setNaoIniciado] = useState()
    const [emAndamento, setemAndamento] = useState()
    const [concluido, setconcluido] = useState()
    const [total, setTotal] = useState()
    //const [filtroPedido, setFiltroPedido] = useState();
    //const [pesquisa, setPesquisa] = useState('');
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
            navigate('/pedido/finalizado')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "EM PROCESSO") {
            navigate('/pedido/andamento')
            sessionStorage.setItem("pedidoPesquisa", pedido);
        }
        else if (status === "NÃO INICIADO") {
            navigate('/pedido/naoiniciado')
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
                    {/*FIM DA Primeira divisao*/}
                    {/*sexta divisao*/}
                    <div className="row">
                        <div className="col-md-4 stretch-card grid-margin" id='dashTdPedido'>
                            <div className="card">
                                <div className="card-body " id='pp001'>
                                    <p className="card-title mb-0">Todos pedidos</p>
                                    <div className="table-responsive">
                                        <table className="table table-borderless">
                                            <thead>
                                                {/*<tr>
                                                    <th className="border-bottom pb-2">Pedido</th>
                                                    <th className="pl-0  pb-2 border-bottom">Cidade</th>
                                                    <th className="border-bottom pb-2">Progresso</th>
                                                </tr>*/}
                                                <tr>
                                                    <th>
                                                        <input className='inds01' placeholder='Pedido'></input>
                                                    </th>
                                                    <th><input className='inds01' placeholder='Cidade'></input></th>
                                                    <th><input className='inds01' placeholder='Progresso'></input></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedidoFiltrado?.map((e) =>
                                                    <tr className='ds01' key={e.numeroPedido} onClick={() => BuscarPedido(e.numeroPedido, e.progressoDesc)}>
                                                        {<td>{e.numeroPedido}</td>}
                                                        {<td>{e.cidade}</td>}
                                                        {<td>{e.progressoDesc}</td>}
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
                                            <p className="card-title">Grafico</p>
                                            <div className="charts-data">
                                                <div className="mt-3">
                                                    <p className="mb-0">Não iniciado</p>
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
                                                    <p className="mb-0">Finalizado</p>
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
                                </div>
                                <div className="col-md-12 stretch-card grid-margin grid-margin-md-0">
                                    <div className="card data-icon-card-primary">
                                        <div className="card-body">
                                            <p className="card-title text-white">Numeros de pedidos</p>
                                            <div className="row">
                                                <div className="col-8 text-white">
                                                    <h3>{`${total}`}</h3>
                                                    <p className="text-white font-weight-500 mb-0">Numero de pedidos cadastrados no sistema Integra</p>
                                                </div>
                                                <div className="col-4 background-icon">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-4 stretch-card grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-title">Notificações</p>
                                    <ul className="icon-data-list">
                                        <li>
                                            <div className="d-flex">
                                                <img src={face1} alt="user" />
                                                <div>
                                                    <p className="text-info mb-1">Luciano Cebula</p>
                                                    <p className="mb-0">O pedido 196-009/22 teve um atraso na produção dos expositores</p>
                                                    <small>9:30 am</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <img src={face2} alt="user" />
                                                <div>
                                                    <p className="text-info mb-1">Gilson Guimarães</p>
                                                    <p className="mb-0">O pedido 196-007/22 teve um atraso em camaras</p>
                                                    <small>10:30 am</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <img src={face3} alt="user" />
                                                <div>
                                                    <p className="text-info mb-1">Willian Marques</p>
                                                    <p className="mb-0">Pedido XPTO foi finalizado</p>
                                                    <small>11:30 am</small>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                                                </div>*/}
                    </div>
                    {/*FIM DA SERXTA  divisao*/}
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}
export default Parcial;