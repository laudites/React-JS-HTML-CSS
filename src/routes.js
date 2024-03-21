import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from "./Pages/Login";
import TelaHome from './Pages/Home';
import TelaPedido from './Pages/Pedido';
import TelaEmAndamento from './Pages/Pedido/EmAndamento';
import TelaFinalizado from './Pages/Pedido/Finalizado';
import TelaNaoIniciado from './Pages/Pedido/NaoIniciado';
import GestaoContato from './Pages/GestaoContato/index';
import Orcamento from './Pages/Orcamento';
import OrcamentoAberto from './Pages/Orcamento/EmAberto'
import OrcamentoFechado from './Pages/Orcamento/Fechado'

import OrcamentoPerdido from './Pages/Orcamento/Perdido'
import OrcamentoCancelado from './Pages/Orcamento/Cancelado'
import OrcamentoNegociacao from './Pages/Orcamento/Negociacao'

import TelaContatoNovos from './Pages/GestaoContato/Novos';
import TelaContatoAndamento from './Pages/GestaoContato/Andamento';
import TelaContatoPendentes from './Pages/GestaoContato/Pendentes';

function RouteApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TelaLogin />} />
                <Route path='/home' element={<TelaHome />} />
                <Route path='/gestaocontato' element={<GestaoContato />} />
                <Route path='/gestaocontato/novo' element={<TelaContatoNovos />} />
                <Route path='/gestaocontato/andamento' element={<TelaContatoAndamento />} />
                <Route path='/gestaocontato/pendentes' element={<TelaContatoPendentes />} />
                <Route path='/orcamento' element={<Orcamento />} />
                <Route path='/orcamento/aberto' element={<OrcamentoAberto />} />
                <Route path='/orcamento/fechado' element={<OrcamentoFechado />} />

                <Route path='/orcamento/perdido' element={<OrcamentoPerdido />} />
                <Route path='/orcamento/cancelado' element={<OrcamentoCancelado />} />
                <Route path='/orcamento/negociacao' element={<OrcamentoNegociacao />} />

                <Route path='/pedido' element={<TelaPedido />} />
                <Route path='/pedido/naoiniciado' element={<TelaNaoIniciado />} />
                <Route path='/pedido/andamento' element={<TelaEmAndamento />} />
                <Route path='/pedido/finalizado' element={<TelaFinalizado />} />
            </Routes>
        </BrowserRouter>
    )
}
export default RouteApp;