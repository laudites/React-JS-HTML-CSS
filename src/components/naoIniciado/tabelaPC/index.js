import { useEffect, useState } from "react";
import PedidosGeral from "../../../Services/API/PedidosGeral";
import PedidosDetalhes from "../../../Services/API/PedidosDetalhes"
import './tebelaPC.css';



function TabelaNaoIniciado(content) {

    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);
    const [pedidoNaoIniciado, setPedidoNaoIniciado] = useState();
    const Result = (content.content.content)
    const pedidoFiltrado = pedidoNaoIniciado?.filter(e => e.numeroPedido.includes(Result))

    const [detalhesExpositor, setDetalhesExpositor] = useState([{ "progressoPorcent": "NÂO EXISTE" }]);
    const [detalhesInstalacoes, setDetalhesInstalacoes] = useState([{ "progressoPorcent": "NÂO EXISTE" }]);
    const [detalhesSMR, setDetalhesSMR] = useState([{ "progressoPorcent": "NÂO EXISTE" }]);
    const [detalhesCamaras, setDetalhesCamaras] = useState([{ "progressoPorcent": "NÂO EXISTE" }]);

    const [numPedido, setNumPedido] = useState();
    const [porcent, setPorcent] = useState();
    const [loading, setLoading] = useState(false);

    async function SubPedido(numPedidos, porcentagem) {
        setLoading(true);
        setNumPedido(numPedidos);
        const resultExpositor = await PedidosDetalhes("NÃO INICIADO", numPedidos, "EXPOSITOR")
        const resultInstalacoes = await PedidosDetalhes("NÃO INICIADO", numPedidos, "INSTALAÇÕES")
        const resultSMR = await PedidosDetalhes("NÃO INICIADO", numPedidos, "SMR")
        const resultCamaras = await PedidosDetalhes("NÃO INICIADO", numPedidos, "CÂMARAS")

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
        PedidosGeral("NÃO INICIADO")
            .then(items => {
                setPedidoNaoIniciado(items);
            })
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
                {pedidoFiltrado?.map((e) => (

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
                                                                    {<div className="progress">
                                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: porcent + "%" }}>{porcent} %</div>
                                                                    </div>}
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
                                                                    <div className="bp01">
                                                                        <p id="st-01">Linha: Expositores</p>
                                                                        <div id="st-02">{detalhesExpositor[0].progressoPorcent !== "NÂO EXISTE" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesExpositor[0].progressoPorcent + "%" }}>{detalhesExpositor[0].progressoPorcent} %</div>
                                                                            </div>}
                                                                            {detalhesExpositor[0].progressoPorcent === "NÂO EXISTE" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesExpositor[0].progressoPorcent !== "NÂO EXISTE" &&
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
                                                                        <div id="st-02">{detalhesCamaras[0].progressoPorcent !== "NÂO EXISTE" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesCamaras[0].progressoPorcent + "%" }}>{detalhesCamaras[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesCamaras[0].progressoPorcent === "NÂO EXISTE" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesCamaras[0].progressoPorcent !== "NÂO EXISTE" &&
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
                                                                        <div id="st-02">{detalhesSMR[0].progressoPorcent !== "NÂO EXISTE" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesSMR[0].progressoPorcent + "%" }}>{detalhesSMR[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesSMR[0].progressoPorcent === "NÂO EXISTE" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesSMR[0].progressoPorcent !== "NÂO EXISTE" &&
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
                                                                        <div id="st-02">{detalhesInstalacoes[0].progressoPorcent !== "NÂO EXISTE" &&
                                                                            <div className="progress">
                                                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                    style={{ width: detalhesInstalacoes[0].progressoPorcent + "%" }}>{detalhesInstalacoes[0].progressoPorcent} %</div>
                                                                            </div>
                                                                        }
                                                                            {detalhesSMR[0].progressoPorcent === "NÂO EXISTE" && <h6 style={{ margin: "5px" }}>Não contém</h6>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {detalhesSMR[0].progressoPorcent !== "NÂO EXISTE" &&
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

                    </>)
                )
                }
            </tbody>
        </table>
    )

}

export default TabelaNaoIniciado;