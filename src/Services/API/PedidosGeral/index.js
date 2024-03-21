import api from ".."

async function PedidosGeral(status) {
    const result = await api.get('Integra/pedidosGeral',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                cod_representante: localStorage.getItem('Cod'),
                status: status
            }
        }).catch(() => console.log("ERRO PedidosGeral"))

    return result.data;
}
export default PedidosGeral;