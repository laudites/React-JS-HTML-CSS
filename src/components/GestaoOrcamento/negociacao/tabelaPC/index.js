import { useEffect, useState } from "react";
import './tebelaPC.css';
import QuantidadeOrcamento from '../../../../Services/API/QtdOrcamento';



function TabelaNegociacao(content) {
    const [ListaOrcamentoNegociacao, setListaOrcamentoNegociacao] = useState();
    const [DadosOrcamentoNegociacao, setDadosOrcamentoNegociacao] = useState();

    useEffect(() => {
        QuantidadeOrcamento('Negociação', '%').then(itens => { setListaOrcamentoNegociacao(itens) });
    }, []);



    //----------------------------//----------------------------//----------------

    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);
    const Result = (content.content.content)
    const pedidoFiltrado = ListaOrcamentoNegociacao?.filter(e => e.numeroOrcamento.includes(Result))
    const [numPedido, setNumPedido] = useState();
    const [loading, setLoading] = useState(false);

    async function SubPedido(status, numorcamento) {
        await QuantidadeOrcamento(status, numorcamento).then(itens => { setDadosOrcamentoNegociacao(itens) });
        setLoading(true);
        setNumPedido(numorcamento);

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

    const containsDollarSign = DadosOrcamentoNegociacao?.filter(value => value.lista.includes('$'))


    return (
        <table id="example" className="display expandable-table" style={{ width: "100%" }}>

            <thead>
                <tr>
                    <th>N° Orçamento</th>
                    <th>Nome fantasia</th>
                    <th>UF</th>
                    <th>Cidade</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pedidoFiltrado?.map((e) => (

                    <>
                        <tr key={e.numeroOrcamento} className={showPedidoArrow} onClick={() => SubPedido('Negociação', e.numeroOrcamento)} id="barraProgresso">
                            {<td>{e.numeroOrcamento}</td>}
                            {<td>{e.nomeFantasia}</td>}
                            {<td>{e.uf}</td>}
                            {<td>{e.municipio}</td>}
                            {<td>{e.status}</td>}
                            <td className="details-control" ></td>
                        </tr>
                        {loading && e.numeroOrcamento === numPedido && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}
                        {showPedido && e.numeroOrcamento === numPedido &&
                            <tr className={`${showPedidoArrow + 1}`}>
                                <td colSpan="8">
                                    <table cellPadding="5" cellSpacing="0" border="0" style={{ width: "100%" }}>
                                        <tbody>
                                            <tr className="expanded-row">
                                                <td colSpan={8} className="row-bg">
                                                    <div>

                                                        <div className="d-flex justify-content-between">
                                                            <div className="cell-hilighted subtelaroxo" style={{ display: "grid", margin: "5px", minWidth: "200px" }}>
                                                                {/*} <div className="d-flex mb-2"> */}
                                                                <div className="mr-2 min-width-cell" style={{ display: "grid" }}>
                                                                    <div>
                                                                        <h6 id="st-01">Razão social</h6>
                                                                        <p style={{ fontSize: "0.7rem" }}>{DadosOrcamentoNegociacao[0].razaoSocial}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h6 id="st-01">Loja</h6>
                                                                        <p style={{ fontSize: "0.7rem" }}>{DadosOrcamentoNegociacao[0].loja}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <h6 id="st-01">Lista de preço</h6>
                                                                        <p style={{ margin: "5px" }}>{DadosOrcamentoNegociacao[0].lista}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <h6 id="st-01">Valor de lista</h6>
                                                                        {containsDollarSign ?
                                                                            <p style={{ margin: "5px" }}>{`R$ ${parseFloat(DadosOrcamentoNegociacao[0].valor_lista).toFixed(2)}`}</p>
                                                                            :
                                                                            <p style={{ margin: "5px" }}>{`US$ ${parseFloat(DadosOrcamentoNegociacao[0].valor_lista).toFixed(2)}`}</p>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <h6 id="st-01">Valor calculado</h6>
                                                                        {containsDollarSign ?
                                                                            <p style={{ margin: "5px" }}>{`R$ ${parseFloat(DadosOrcamentoNegociacao[0].valor_Calculado).toFixed(2)}`}</p>
                                                                            :
                                                                            <p style={{ margin: "5px" }}>{`US$ ${parseFloat(DadosOrcamentoNegociacao[0].valor_Calculado).toFixed(2)}`}</p>
                                                                        }
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
                        }

                    </>)
                )
                }
            </tbody>
        </table >
    )

}

export default TabelaNegociacao;