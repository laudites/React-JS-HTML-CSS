import { useEffect, useState } from "react";
import PedidosGeral from "../../../Services/API/PedidosGeral";
import PedidosDetalhes from "../../../Services/API/PedidosDetalhes"
import './tabelaMobile.css';

function TabelaFinalizadoMobile(content) {

    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);
    const [showExpositor, setShowExpositor] = useState(false);
    const [showInstalacoes, setShowInstalacoes] = useState(false);
    const [showSMR, setShowSMR] = useState(false);
    const [showCamaras, setShowCamaras] = useState(false);

    const [pedidoFinalizado, setPedidoFinalizado] = useState();
    const Result = (content.content.content)
    const pedidoFiltrado = pedidoFinalizado?.filter(e => e.numeroPedido.includes(Result))

    const [detalhesExpositor, setDetalhesExpositor] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesInstalacoes, setDetalhesInstalacoes] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesSMR, setDetalhesSMR] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);
    const [detalhesCamaras, setDetalhesCamaras] = useState([{ "progressoPorcent": "CONCLUÍDO" }]);

    const [numPedido, setNumPedido] = useState();
    const [porcent, setPorcent] = useState()

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
            setShowExpositor(true);
        } if (resultInstalacoes.length > 0) {
            setDetalhesInstalacoes(resultInstalacoes);
            setShowInstalacoes(true);
        } if (resultSMR.length > 0) {
            setDetalhesSMR(resultSMR);
            setShowSMR(true);
        } if (resultCamaras.length > 0) {
            setDetalhesCamaras(resultCamaras);
            setShowCamaras(true);
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
                    <th>Cidade</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pedidoFiltrado?.map((e) =>
                    <>

                        <tr className="nd01 ps01">
                            <td className="nd01">
                                {loading && e.numeroPedido === numPedido && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={3} id="barra-mobile">
                                <div className="progress" id="prg01">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: e.progressoPorcent + "%", padding: 0 }}>{e.progressoPorcent} %</div>
                                </div>
                            </td>
                        </tr>


                        <tr key={e.numeroPedido} className={showPedidoArrow} id='cbp01' >

                            {<td>{e.numeroPedido}</td>}
                            {<td>{e.cidade}</td>}
                            <td className="details-control" onClick={() => SubPedido(e.numeroPedido, e.progressoPorcent)}></td>
                        </tr>




                        {showPedido && e.numeroPedido === numPedido &&
                            <tr>
                                <td colSpan="8">
                                    <table cellPadding="5" cellSpacing="0" border="0" style={{ width: "100%" }}>
                                        <tbody >
                                            <tr className="expanded-row" >
                                                <td colSpan={8} className="row-bg" >
                                                    <div >
                                                        <div className="d-flex justify-content-between c-tabela" >

                                                            {/*<div className="cell-hilighted">
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
                                                    </div>*/}



                                                            <div className="expanded-table-normal-cell">
                                                                {showExpositor &&
                                                                    <>
                                                                        <div className="mr-2 mb-4">
                                                                            <h5>Linha: Expositores</h5>
                                                                            <p>{detalhesExpositor[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                                <div className="progress">
                                                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                        style={{ width: detalhesExpositor[0].progressoPorcent + "%" }}>{detalhesExpositor[0].progressoPorcent} %</div>
                                                                                </div>
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                        <div className="mr-2 mb-4">
                                                                            <h6>Data cadastrada</h6>
                                                                            <p>{detalhesExpositor[0].dataCadastro}</p>
                                                                            <h6>Data requerida</h6>
                                                                            <p>{detalhesExpositor[0].dataRequerida}</p>
                                                                            <h6>Data planejada</h6>
                                                                            <p>{detalhesExpositor[0].dataPlanejada}</p>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {showCamaras &&
                                                                    <>
                                                                        <div className="mr-2 mb-4">
                                                                            <h5>Linha: Camaras</h5>
                                                                            <p>{detalhesCamaras[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                                <div className="progress">
                                                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                        style={{ width: detalhesCamaras[0].progressoPorcent + "%" }}>{detalhesCamaras[0].progressoPorcent} %</div>
                                                                                </div>
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                        <div className="mr-2 mb-4">
                                                                            <h6>Data cadastrada</h6>
                                                                            <p>{detalhesCamaras[0].dataCadastro}</p>
                                                                            <h6>Data requerida</h6>
                                                                            <p>{detalhesCamaras[0].dataRequerida}</p>
                                                                            <h6>Data planejada</h6>
                                                                            <p>{detalhesCamaras[0].dataPlanejada}</p>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {showSMR &&
                                                                    <>
                                                                        <div className="mr-2 mb-4">
                                                                            <h5>Linha: SMR</h5>
                                                                            <p>{detalhesSMR[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                                <div className="progress">
                                                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                        style={{ width: detalhesSMR[0].progressoPorcent + "%" }}>{detalhesSMR[0].progressoPorcent} %</div>
                                                                                </div>
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                        <div className="mr-2 mb-4">
                                                                            <h6>Data cadastrada</h6>
                                                                            <p>{detalhesSMR[0].dataCadastro}</p>
                                                                            <h6>Data requerida</h6>
                                                                            <p>{detalhesSMR[0].dataRequerida}</p>
                                                                            <h6>Data planejada</h6>
                                                                            <p>{detalhesSMR[0].dataPlanejada}</p>
                                                                        </div>
                                                                    </>
                                                                }

                                                                {showInstalacoes &&
                                                                    <>
                                                                        <div className="mr-2 mb-4">
                                                                            <h5>Linha: Instalações</h5>
                                                                            <p>{detalhesInstalacoes[0].progressoPorcent !== "CONCLUÍDO" &&
                                                                                <div className="progress">
                                                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                                                                                        style={{ width: detalhesInstalacoes[0].progressoPorcent + "%" }}>{detalhesInstalacoes[0].progressoPorcent} %</div>
                                                                                </div>
                                                                            }
                                                                            </p>
                                                                        </div>
                                                                        <div className="mr-2 mb-4">
                                                                            <h6>Data cadastrada</h6>
                                                                            <p>{detalhesInstalacoes[0].dataCadastro}</p>
                                                                            <h6>Data requerida</h6>
                                                                            <p>{detalhesInstalacoes[0].dataRequerida}</p>
                                                                            <h6>Data planejada</h6>
                                                                            <p>{detalhesInstalacoes[0].dataPlanejada}</p>
                                                                        </div>
                                                                    </>
                                                                }
                                                                <div className="mr-2 mb-4">
                                                                    <h5>Porcentagem TOTAL</h5>
                                                                    {
                                                                        <div className="progress">
                                                                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: porcent + "%" }}>{e.progressoPorcent} %</div>
                                                                        </div>
                                                                    }
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
                        }
                    </>

                )


                }


            </tbody>
        </table>
    )
}
export default TabelaFinalizadoMobile;