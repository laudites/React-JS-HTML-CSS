export async function save_token(token, user) {
    let token_real = await token;
    let usuario = await user;
    localStorage.setItem('token', token_real);
    localStorage.setItem('user', usuario);

    return (token_real, usuario);
}