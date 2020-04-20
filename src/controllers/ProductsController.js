const {Op} = require('sequelize');
const Model = require('../models/Product');
module.exports = {
    async find(req,res){
        try {
            const query_filter = req.query.search === undefined ? '' : req.query.search;
            const content = await Model.findAll({
                attributes: {
                    exclude: ["person_modification", "createdAt", "updatedAt"]
                },
                where: {
                    product_name: {
                        [Op.iLike]: `%${query_filter}%`
                    }
                },
            });
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
    async findById(req,res){
        try {
            const content = await Model.findAll({
                where: {
                    id: req.params.id
                }
            });
            if(!content.length)
            res.status(200).json({
                success: false,
                message: "Nenhum registro encontrado"
            })

            res.status(200).json({
                success: true,
                content: content[0]
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async create(req,res){
        try {
            const join_data = Object.assign(req.body, {person_modification: req.person_current})
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
            const join_data = Object.assign(req.body, {person_modification: req.person_current})
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