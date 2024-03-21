

import api from "..";

async function SalvandoRegistro(codRepresentante, logIn, token) {

    const result = await api.post('Integra/logRegistro', null,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                codRepresentante: codRepresentante,
                evento: logIn
            }
        }).catch(() => console.log(result))
    //window.location.reload()

}
export default SalvandoRegistro;