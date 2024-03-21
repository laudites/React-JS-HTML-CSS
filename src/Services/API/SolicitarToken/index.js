import api from "..";
import { save_token } from "../api_token";

async function SolicitarToken(user) {
    const response = await api.post('Integra/login', {
        integra: true
    })
    save_token(response.data.token, user);
    return response.data.token
}
export default SolicitarToken;