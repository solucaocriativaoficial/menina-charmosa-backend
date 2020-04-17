const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.auth;
    if(token === undefined)
    res.status(401).json({
        success: false,
        message: "Ops! Parece que vc não esta logado para fazer essa ação! Por favor, faça seu login!"
    })

    jwt.verify(token, process.env.SECRET_KEY_APPLICATION, (err, decoded)=>{
        if(err)
        res.status(401).json({
            success: false,
            message: "Eita! Está faltando algumas informações no seu acesso, tente novamente, por favor!"
        })

        req.person_current = decoded.person_current;

        next();
    })
}