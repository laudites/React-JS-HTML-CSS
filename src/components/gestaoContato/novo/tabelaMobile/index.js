import { useEffect, useState } from "react";
import './tabelaMobile.css';
import QuantidadeContatosNovos from '../../../../Services/API/QtdContatosNovos';
import DadosContatos from '../../../../Services/API/DadosContatos';

function TabelaNaoIniciadoMobile(content) {

    const [ListaContatoNovo, setListaContatoNovo] = useState();
    const [DadosContatoNovo, setDadosContatoNovo] = useState();

    useEffect(() => {
        QuantidadeContatosNovos().then(itens => { setListaContatoNovo(itens) });
    }, []);


    //----------------------------//----------------------------//----------------

    const [showPedidoArrow, setShowPedidoArrow] = useState('odd');
    const [showPedido, setShowPedido] = useState(false);

    const [numPedido, setNumPedido] = useState();
    const [loading, setLoading] = useState(false);

    async function SubPedido(cnpj) {
        await DadosContatos(cnpj).then(itens => { setDadosContatoNovo(itens) });
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
                {ListaContatoNovo?.map((e) =>
                    <>
                        <tr className="nd01 ps01">
                            <td className="nd01">
                                {loading && e.cnpj === numPedido && (<div className="lds-ring_login"><div></div><div></div><div></div><div></div></div>)}
                            </td>
                        </tr>

                        <tr key={e.cnpj} className={showPedidoArrow} id='cbp01' >

                            {<td>{e.cnpj}</td>}
                            {<td>{e.razao_social}</td>}
                            <td className="details-control" onClick={() => SubPedido(e.cnpj)}></td>
                        </tr>

                        {showPedido && e.cnpj === numPedido &&
                            <tr>
                                <td colSpan="8">
                                    <table cellPadding="5" cellSpacing="0" border="0" style={{ width: "100%" }}>
                                        <tbody >
                                            <tr className="expanded-row" >
                                                <td colSpan={8} className="row-bg" >
                                                    <div >
                                                        <div className="d-flex justify-content-between c-tabela" >

                                                            <div className="expanded-table-normal-cell">
                                                                <div className="cell-hilighted subtelaroxo" style={{ display: "grid", margin: "5px", minWidth: "200px" }}>
                                                                    {/*} <div className="d-flex mb-2"> */}
                                                                    <div className="mr-2 min-width-cell" style={{ display: "grid" }}>
                                                                        <div>
                                                                            <h6 id="st-01">Nome fantasia</h6>
                                                                            <p style={{ fontSize: "0.7rem" }}>{DadosContatoNovo[0].nomE_FANTASIA}</p>
                                                                        </div>
                                                                        <div>
                                                                            <h6 id="st-01">Porte</h6>
                                                                            <p style={{ fontSize: "0.7rem" }}>{DadosContatoNovo[0].porte}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="expanded-table-normal-cell" style={{ margin: "5px" }}>
                                                                    <div className="mr-2 mb-4">
                                                                        <div className="bp01">
                                                                            <h6 id="st-01">Atividade econômica</h6>
                                                                            <p style={{ margin: "5px" }}>{DadosContatoNovo[0].atividadE_ECONOMICA}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="expanded-table-normal-cell" style={{ margin: "5px", minWidth: "200px" }}>
                                                                    <div className="mr-2 mb-4">
                                                                        <div className="bp01">
                                                                            <p id="st-01">Endereço</p>
                                                                            <h6 style={{ margin: "5px", fontSize: "0.7rem" }}>
                                                                                <p>Logradouro:</p>{`${DadosContatoNovo[0].endereco} Nº${DadosContatoNovo[0].numero}`}
                                                                                <br />
                                                                                <br />
                                                                                <p>Bairro:</p>{`${DadosContatoNovo[0].bairro}`}
                                                                                <br />
                                                                                <br />
                                                                                <p>UF/Cidade:</p>{`${DadosContatoNovo[0].uf}/${DadosContatoNovo[0].cidade}`}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="expanded-table-normal-cell" style={{ margin: "5px", minWidth: "200px" }}>
                                                                    <div className="mr-2 mb-4">
                                                                        <div className="bp01">
                                                                            <h6 id="st-01" >Contato</h6>
                                                                            <p>Celular 1:</p>{`${DadosContatoNovo[0].ceL1}`}
                                                                            <p>Celular 2:</p>{`${DadosContatoNovo[0].ceL2}`}
                                                                            <p>Telefone 1:</p>{`${DadosContatoNovo[0].teL1}`}
                                                                            <p>Telefone 2:</p>{`${DadosContatoNovo[0].teL2}`}
                                                                            <p>Telefone adicional:</p>{`${DadosContatoNovo[0].fonE_ADICIONAL}`}
                                                                        </div>
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
                    </>

                )


                }


            </tbody>
        </table>
    )
}
export default TabelaNaoIniciadoMobile;