import bcrypt from 'bcryptjs';
//var bcrypt = require('bcryptjs');
function EncryptService(senha, crypt) {
    /* 
    //COMO CRIPTOGRAFAR SENHA
    bcrypt.genSalt(10, function (err, salt) {
         bcrypt.hash(senha, salt, function (err, hash) {
             // Store hash in your password DB.
             console.log(hash)
         });
     });*/

    /*bcrypt.compare(senha, crypt, function (err, res) {
        // res === true 
        console.log("EncryptService: " + res)
        return res;
    })*/

    bcrypt.compareSync(senha, crypt)

}
export default EncryptService;

