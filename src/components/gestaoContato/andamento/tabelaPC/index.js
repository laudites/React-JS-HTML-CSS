import { useEffect, useState } from "react";
import PedidosGeral from "../../../../Services/API/PedidosGeral";
import './tebelaPC.css';
import QuantidadeContatosAndamento from '../../../../Services/API/QtdContatosAndamento';
import DadosContatos from '../../../../Services/API/DadosContatos';



function TabelaEmAndamento(content) {
    const [ListaContatoAndamento, setListaContatoAndamento] = useState();
    const [DadosContatoAndamento, setDadosContatoAndamento] = useState();

    useEffect(() => {
        QuantidadeContatosAndamento().then(itens => { setListaContatoAndamento(itens) });
    }, []);


    //----------------------------//----------------------------//----------------

    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);
    const [pedidoNaoIniciado, setPedidoNaoIniciado] = useState();
    const Result = (content.content.content)

    const [numPedido, setNumPedido] = useState();
    const [loading, setLoading] = useState(false);

    async function SubPedido(cnpj) {
        await DadosContatos(cnpj).then(itens => { setDadosContatoAndamento(itens) });
        setLoading(true);
        setNumPedido(cnpj);

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
                    <th>CNPJ</th>
                    <th>Razão social</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ListaContatoAndamento?.map((e) => (

                    <>
                        <tr key={e.cnpj} className={showPedidoArrow} onClick={() => SubPedido(e.cnpj)} id="barraProgresso">
                            {<td>{e.cnpj}</td>}
                            {<td>{e.razao_social}</td>}
                            <td className="details-control" ></td>
                        </tr>
                        {loading && e.cnpj === numPedido && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}
                        {showPedido && e.cnpj === numPedido &&
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
                                                                        <h6 id="st-01">Nome fantasia</h6>
                                                                        <p style={{ fontSize: "0.7rem" }}>{DadosContatoAndamento[0].nomE_FANTASIA}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h6 id="st-01">Porte</h6>
                                                                        <p style={{ fontSize: "0.7rem" }}>{DadosContatoAndamento[0].porte}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <h6 id="st-01">Atividade econômica</h6>
                                                                        <p style={{ margin: "5px" }}>{DadosContatoAndamento[0].atividadE_ECONOMICA}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px", minWidth: "200px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <p id="st-01">Endereço</p>
                                                                        <h6 style={{ margin: "5px" }}>
                                                                            <p>Logradouro:</p>{`${DadosContatoAndamento[0].endereco} Nº${DadosContatoAndamento[0].numero}`}
                                                                            <br />
                                                                            <br />
                                                                            <p>Bairro:</p>{`${DadosContatoAndamento[0].bairro}`}
                                                                            <br />
                                                                            <br />
                                                                            <p>UF/Cidade:</p>{`${DadosContatoAndamento[0].uf}/${DadosContatoAndamento[0].cidade}`}
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="expanded-table-normal-cell" style={{ margin: "5px", minWidth: "200px" }}>
                                                                <div className="mr-2 mb-4">
                                                                    <div className="bp01">
                                                                        <h6 id="st-01">Contato</h6>
                                                                        <p>Celular 1:</p>{`${DadosContatoAndamento[0].ceL1}`}
                                                                        <p>Celular 2:</p>{`${DadosContatoAndamento[0].ceL2}`}
                                                                        <p>Telefone 1:</p>{`${DadosContatoAndamento[0].teL1}`}
                                                                        <p>Telefone 2:</p>{`${DadosContatoAndamento[0].teL2}`}
                                                                        <p>Telefone adicional:</p>{`${DadosContatoAndamento[0].fonE_ADICIONAL}`}
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

export default TabelaEmAndamento;