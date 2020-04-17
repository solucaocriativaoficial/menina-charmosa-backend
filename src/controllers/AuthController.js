const Model = require('../models/Person');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (data) => {
    const {id} = data
    return jwt.sign({
        person_current: id
    }, process.env.SECRET_KEY_APPLICATION, {
        expiresIn: 2592000
    })
}

module.exports = {
    async signin(req,res,next){
        const {password, mail} = req.body;
        if(mail === undefined || password === undefined)
        res.status(400).json({
            success: false,
            message: "Desculpe! Mas precisamos mesmo de seu e-mail e senha para verificarmos quem você é!"
        })

        try {
            const content = await Model.findAll({mail: mail});            
            if(!content.length)
            res.status(401).json({
                success: false,
                message: "Ops! E-mail ou senha estão incorretos!"
            })

            const checkPassword = await bcrypt.compare(password, content[0].password_crypt);
            if(!checkPassword)
            res.status(401).json({
                success: false,
                message: "Ops! E-mail ou senha estão incorretos!"
            })

            const token = generateToken(content[0]);
            res.status(200).json({
                success: true,
                content: token
            })

        } catch (error) {
            res.status(400).json({message: error.message})
        }
   },
   async registration(req,res){
    const {password, ...rest} = req.body;
    const password_crypt = bcrypt.hashSync(password, 15);
    const join_data = Object.assign(rest, {password_crypt: password_crypt})

    try {
        const content = await Model.create(join_data);
        if(!content)
        res.status(200).json({
            success: false,
            message: "Erro ao adicionar registro!"
        })

        const getDataPerson = await Model.findAll({mail: content.mail});

        const token = generateToken(getDataPerson[0]);

        res.status(200).json({
            success: true,
            content: token
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
},
}