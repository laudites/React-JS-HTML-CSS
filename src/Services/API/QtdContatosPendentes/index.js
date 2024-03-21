import api from ".."

async function QuantidadeContatosPendentes(status) {
    const result = await api.get('Crm/lista_pendente',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                REPRESENTANTE: localStorage.getItem('Cod')
            }
        }).catch(() => console.log("ERRO QuantidadeContatosPendentes"))
    return result.data;
}
export default QuantidadeContatosPendentes;