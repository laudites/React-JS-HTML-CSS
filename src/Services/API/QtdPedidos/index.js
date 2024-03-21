import api from ".."

async function QuantidadePedidos(status) {
    const result = await api.get('Integra/qtdpedidos',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                cod_representante: localStorage.getItem('Cod'),
                status: status
            }
        }).catch(() => console.log("ERRO QuantidadePedidos"))
    return result.data;
}
export default QuantidadePedidos;