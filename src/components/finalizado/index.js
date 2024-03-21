import { useState, useEffect } from "react";
import './Finalizado.css';
import TabelaFinalizadoPC from "./tabelaPC";
import TabelaFinalizadoMobile from './tabelaMobile';

function Finalizado(content) {
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
                            <p className="card-title">Pedidos finalizado</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        {width > 600 && (
                                            <TabelaFinalizadoPC content={content}></TabelaFinalizadoPC>
                                        )}
                                        {width < 600 && (
                                            <TabelaFinalizadoMobile content={content}></TabelaFinalizadoMobile>
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

export default Finalizado;