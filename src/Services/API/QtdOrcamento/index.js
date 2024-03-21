import api from ".."

async function QuantidadeOrcamento(status, numorcamento) {
    const result = await api.get('Integra/listaOrcamento',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                cod_representante: localStorage.getItem('Cod'),
                status: status,
                numorcamento: numorcamento
            }
        }).catch(() => console.log("ERRO Quantidade de orçamento"))
    return result.data;
}
export default QuantidadeOrcamento;