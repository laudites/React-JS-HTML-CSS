import { useEffect, useState } from "react";
import PedidosGeral from "../../../Services/API/PedidosGeral";
import PedidosDetalhes from "../../../Services/API/PedidosDetalhes"
import './tabelaPC.css';

function TabelaFinalizado(content) {
    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);
    const [pedidoFinalizado, setPedidoFinalizado] = useState();

    const Result = (content.content.content)

    const pedidoFiltrado = pedidoFinalizado?.filter(e => e.numeroPedido.includes(Result))

    const [detalhesExpositor, setDetalhesExpositor] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesInstalacoes, setDetalhesInstalacoes] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesSMR, setDetalhesSMR] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesCamaras, setDetalhesCamaras] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);

    const [numPedido, setNumPedido] = useState();
    const [porcent, setPorcent] = useState();
    const [loading, setLoading] = useState(false);

    async function SubPedido(numPedidos, porcentagem) {
        setLoading(true);
        setNumPedido(numPedidos);
        const resultExpositor = await PedidosDetalhes("CONCLUÍDO", numPedidos, "EXPOSITOR")
        const resultInstalacoes = await PedidosDetalhes("CONCLUÍDO", numPedidos, "INSTALAÇÕES")
        const resultSMR = await PedidosDetalhes("CONCLUÍDO", numPedidos, "SMR")
        const resultCamaras = await PedidosDetalhes("CONCLUÍDO", numPedidos, "CÂMARAS")


        if (resultExpositor.length > 0) {
            setDetalhesExpositor(resultExpositor);
        } if (resultInstalacoes.length > 0) {
            setDetalhesInstalacoes(resultInstalacoes);
        } if (resultSMR.length > 0) {
            setDetalhesSMR(resultSMR);
        } if (resultCamaras.length > 0) {
            setDetalhesCamaras(resultCamaras);
        }

        setPorcent(porcentagem);
        if (showPedidoArrow === 'odd') {
            setShowPedidoArrow('odd shown')
            setShowPedido(true);
        }
        else {
            setShowPedidoArrow('odd')
            setShowPedido(false);
        }
        setLoading(false);

    }

    useEffect(() => {
        let valor = true;
        PedidosGeral("CONCLUÍDO")
            .then(items => {
                if (valor) {
                    setPedidoFinalizado(items);
                }
            })
        return () => valor = false;
    }, [])


    return (
        <table id="example" className="display expandable-table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Pedido</th>
                    <th>Estado</th>
                    <th>Cidade</th>
                    <th>Progresso</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {/* <tr className={showPedidoArrow}>
                    <td className=" select-checkbox">PED 196-001/22</td>
                    <td className="sorting_1">Curitiba</td>
                    <td>23/04/2022</td>
                    <td>18/06/2022</td>
                    <td>26/05/2022</td>
                    <td>0%</td>
                    <td className="details-control" onClick={() => SubPedido()}></td>
                </tr>
                {showPedido &&
                    <tr>
                        <td colspan="8">
                            <table cellpadding="5" cellspacing="0" border="0" style={{ width: "100%" }}>
                                <tbody>
                                    <tr className="expanded-row">
                                        <td colSpan={8} className="row-bg">
                                            <div>
                                                <div className="d-flex justify-content-between">

                                                    <div className="cell-hilighted">
                                                        <div className="d-flex mb-2">
                                                            <div className="mr-2 min-width-cell">
                                                                <p>Data de Cadastro</p>
                                                                <h6>23/04/2022</h6>
                                                            </div>
                                                            <div className="min-width-cell">
                                                                <p>Data Requerida</p>
                                                                <h6>18/06/2022</h6>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="mr-2 min-width-cell">
                                                                <p>Valor Pedido</p>
                                                                <h5>R$3.850.120,86</h5>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="expanded-table-normal-cell">
                                                        <div className="mr-2 mb-4">
                                                            <p>Numero do pedido</p>
                                                            <h6>PED 196-010/22</h6>
                                                        </div>
                                                        <div className="mr-2">
                                                            <p>Linha: Expositores</p>
                                                            <h6>Progresso: 0%</h6>
                                                        </div>
                                                    </div>
                                                    <div className="expanded-table-normal-cell">
                                                        <div className="mr-2 mb-4">
                                                            <p>Porcentagem TOTAL</p>
                                                            <h6>0%</h6>
                                                        </div>
                                                        <div className="mr-2">
                                                            <p>Linha: SMR</p>
                                                            <h6>Progresso: 0%</h6>
                                                        </div>
                                                    </div>
                                                    <div className="expanded-table-normal-cell">
                                                        <div className="mr-2 mb-3 d-flex">
                                                            <div className="highlighted-alpha"> W</div>
                                                            <div>
                                                                <p>Usuario ultima modificação</p>
                                                                <h6>Willian Laudites</h6>
                                                            </div>
                                                        </div>
                                                        <div className="mr-2 d-flex">
                                                            <div>
                                                                <p>Linha: Camaras</p>
                                                                <h6>Progresso: 0%</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                }*/}
                {/*<div className="progress-bar bg-inf0" role="progressbar" style={{ width: `${porcentNaoIniciado}` }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>*/}

                {pedidoFiltrado?.map((e) =>
                    <>
                        <tr key={e.numeroPedido} className={showPedidoArrow} onClick={() => SubPedido(e.numeroPedido, e.progressoPorcent)} id="barraProgresso">
                            {<td>{e.numeroPedido}</td>}
                            {<td>{e.uf}</td>}
                            {<td>{e.cidade}</td>}
                            {
                                <td>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: e.progressoPorcent + "%" }}>{e.progressoPorcent} %</div>
                                    </div>
                                </td>
                            }
                            <td className="details-control" ></td>
                        </tr>
                        {loading && e.numeroPedido === numPedido && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}
                        {showPedido && e.numeroPedido === numPedido &&
                            <tr className={`${showPedidoArrow + 1}`}>
                                <td colSpan="8">
                                    <table cellPadding="5" cellSpacing="0" border="0" style={{ width: "100%" }}>
                                        <tbody>
                                            <tr className="expanded-row">
                                                <td colSpan={8} className="row-bg">
                                                    <div>

                                                        <div className="d-flex justify-content-between">
                                                            <div className="cell-hilighted subtelaroxo">
                                                                {/*} <div className="d-flex mb-2"> */}
                                                                <div className="mr-2 min-width-cell">
                                                                    <p>Porcentagem TOTAL</p>
                                                                    {
                                                                        <div className="progress">
                                                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: porcent + "%" }}>{porcent} %</div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {/* </div>*/}
                                                                {/*<div className="d-flex">
                                                                        <div className="mr-2 min-width-cell">
                                                                            <p>Valor Pedido</p>
                                                                            {<h5>R${e2.totalPedido}</h5>}
                                                                        </div>
                                                                    </div>*/}
                                                            </div>


                                                            <div className="expanded-table-normal-cell">
                                                                <div className="mr-2 mb-4">
                                                                    <div>
                                                                        <p id="st-01">Linha: Expositores</p>
                                                                        <div id="st-02">{detalhesExpositor[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesExpositor[0].progressoPorcent + "%" }}>{detalhesExpositor[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesExpositor[0].progressoPorcent === "CONCLUÍDO" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesExpositor[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                    <div className="mr-2">
                                                                        <p id="st-03">Data cadastrada</p>
                                                                        <h6 id="st-02">{detalhesExpositor[0].dataCadastro}</h6>
                                                                        <p id="st-03">Data requerida</p>
                                                                        <h6 id="st-02">{detalhesExpositor[0].dataRequerida}</h6>
                                                                        <p id="st-03">Data planejada</p>
                                                                        <h6 id="st-02">{detalhesExpositor[0].dataPlanejada}</h6>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="expanded-table-normal-cell">
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <p id="st-01">Linha: Câmaras</p>
                                                                        <div id="st-02">{detalhesCamaras[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesCamaras[0].progressoPorcent + "%" }}>{detalhesCamaras[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesCamaras[0].progressoPorcent === "CONCLUÍDO" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesCamaras[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                    <div className="mr-2">
                                                                        <p id="st-03">Data cadastrada</p>
                                                                        <h6 id="st-02">{detalhesCamaras[0].dataCadastro}</h6>
                                                                        <p id="st-03">Data requerida</p>
                                                                        <h6 id="st-02">{detalhesCamaras[0].dataRequerida}</h6>
                                                                        <p id="st-03">Data planejada</p>
                                                                        <h6 id="st-02">{detalhesCamaras[0].dataPlanejada}</h6>
                                                                    </div>
                                                                }
                                                            </div>

                                                            <div className="expanded-table-normal-cell">
                                                                <div className="mr-2 mb-3 d-flex">
                                                                    {/*<div className="highlighted-alpha"> W</div>*/}
                                                                    <div className="bp01">
                                                                        <p id="st-01">Linha: SMR</p>
                                                                        <div id="st-02">{detalhesSMR[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesSMR[0].progressoPorcent + "%" }}>{detalhesSMR[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesSMR[0].progressoPorcent === "CONCLUÍDO" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesSMR[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                    <div className="mr-2">
                                                                        <p id="st-03">Data cadastrada</p>
                                                                        <h6 id="st-02">{detalhesSMR[0].dataCadastro}</h6>
                                                                        <p id="st-03">Data requerida</p>
                                                                        <h6 id="st-02">{detalhesSMR[0].dataRequerida}</h6>
                                                                        <p id="st-03">Data planejada</p>
                                                                        <h6 id="st-02">{detalhesSMR[0].dataPlanejada}</h6>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="expanded-table-normal-cell">
                                                                <div className="mr-2 mb-3 d-flex">
                                                                    <div className="bp01">
                                                                        <p id="st-01">Linha: Instalações</p>
                                                                        <div id="st-02">{detalhesInstalacoes[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesInstalacoes[0].progressoPorcent + "%" }}>{detalhesInstalacoes[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesSMR[0].progressoPorcent === "CONCLUÍDO" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesSMR[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                    <div className="mr-2">
                                                                        <p id="st-03">Data cadastrada</p>
                                                                        <h6 id="st-02">{detalhesInstalacoes[0].dataCadastro}</h6>
                                                                        <p id="st-03">Data requerida</p>
                                                                        <h6 id="st-02">{detalhesInstalacoes[0].dataRequerida}</h6>
                                                                        <p id="st-03">Data planejada</p>
                                                                        <h6 id="st-02">{detalhesInstalacoes[0].dataPlanejada}</h6>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                        }

                    </>

                )


                }



            </tbody>
        </table>
    )
}
export default TabelaFinalizado;