const Model = require('../models/Comment');
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
        try {
            console.log(req.person_current,"Estou aqui")
            const join_data = Object.assign(req.body, {person: req.person_current})
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
            const join_data = Object.assign(req.body, {person: req.person_current})
            const content = await Model.update(join_data, {
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