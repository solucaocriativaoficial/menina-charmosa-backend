const Model = require('../models/Person');
const bcrypt = require('bcrypt');

module.exports = {
    async find(req,res){
        try {
            const content = await Model.findAll();
            if(!content.length)
            res.status(200).json({
                success: false,
                message: "Nenhum registro encontrado"
            })

            res.status(200).json({
                success: true,
                content: content
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async create(req,res){
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

            res.status(200).json({
                success: true,
                message: "Registro adicionado com sucesso!"
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async update(req,res){
        try {
            const content = await Model.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if(!content)
            res.status(200).json({
                success: false,
                message: "Erro ao atualizar registro!"
            })

            res.status(200).json({
                success: true,
                message: "Registro atualizado com sucesso!"
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async delete(req,res){
        try {
            const content = await Model.destroy({
                where: {
                    id: req.params.id
                }
            });
            if(!content)
            res.status(200).json({
                success: false,
                message: "Erro ao deletar registro!"
            })

            res.status(200).json({
                success: true,
                message: "Registro deletado com sucesso!"
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}