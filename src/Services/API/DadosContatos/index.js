import api from ".."

async function DadosContatos(status) {
    const result = await api.get('Crm/Dados_representate',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                CNPJ: status
            }
        }).catch(() => console.log("ERRO DadosContatos"))
    return result.data;
}
export default DadosContatos;