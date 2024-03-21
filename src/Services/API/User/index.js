import api from "..";

/*async function BuscarUser(usuario) {
    const response = await api.get('Integra/User', {
        params: {
            cod_representante: usuario
        }
    });
    return response.data[0];
}
export default BuscarUser; */
async function BuscarUser(usuario, senha) {

    const response = await api.post('Login/LoginDesc', {
        login: usuario,
        senha: senha
    });

    return response.data;
}
export default BuscarUser;


