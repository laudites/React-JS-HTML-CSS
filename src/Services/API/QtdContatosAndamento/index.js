import api from ".."

async function QuantidadeContatosAndamento(status) {
    const result = await api.get('Crm/lista_andamento',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                REPRESENTANTE: localStorage.getItem('Cod')
            }
        }).catch(() => console.log("ERRO QuantidadeContatosAndamento"))
    return result.data;
}
export default QuantidadeContatosAndamento;