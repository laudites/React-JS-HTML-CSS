import { useState, useEffect } from "react";
import './orcamentoperdido.css';
import TabelaNaoIniciadoPC from "./tabelaPC";
import TabelaNaoIniciadoMobile from './tabelaMobile';

function OrcamentoPerdido(content) {
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
                            <p className="card-title">Orçamento perdido</p>
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        {width > 600 && (
                                            <TabelaNaoIniciadoPC content={content}></TabelaNaoIniciadoPC>
                                        )}
                                        {width < 600 && (
                                            <TabelaNaoIniciadoMobile content={content}></TabelaNaoIniciadoMobile>
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

export default OrcamentoPerdido;