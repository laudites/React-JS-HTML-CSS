import api from ".."


async function PedidosDetalhes(status, numPedido, grupo) {

    const result = await api.get('Integra/pedidosDetalhes',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                cod_representante: localStorage.getItem('Cod'),
                status: status,
                pedido: numPedido,
                grupo: grupo
            }
        }).catch(() => console.log("ERRO PedidosDetalhes"))
    return result.data;
}
export default PedidosDetalhes;