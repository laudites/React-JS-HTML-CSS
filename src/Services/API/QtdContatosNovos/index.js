import api from ".."

async function QuantidadeContatosNovos(status) {
    const result = await api.get('Crm/lista_novos',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                REPRESENTANTE: localStorage.getItem('Cod')
            }
        }).catch(() => console.log("ERRO QuantidadeContatos"))
    return result.data;
}
export default QuantidadeContatosNovos;