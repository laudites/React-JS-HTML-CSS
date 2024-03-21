import { useState, useEffect } from "react";
import './emAndamento.css';
import TabelaEmAndamentoPC from "./tabelaPC";
import TabelaEmAndamentoMobile from './tabelaMobile';

function EmAndamento(content) {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-title">Pedidos em processo</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        {width > 600 && (
                                            <TabelaEmAndamentoPC content={content}></TabelaEmAndamentoPC>
                                        )}
                                        {width < 600 && (
                                            <TabelaEmAndamentoMobile content={content}></TabelaEmAndamentoMobile>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EmAndamento;