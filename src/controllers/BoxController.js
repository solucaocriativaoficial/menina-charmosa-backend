const Model = require('../models/Box');
const connection_pg = require('../Database/connection_pg');
module.exports = {
    async find(req,res){
        try {
            const content = await connection_pg.query(`SELECT * FROM box_complete WHERE person=${req.person_current} AND purchase='not'`);
            const {rowCount, rows} = content;
            if(!rowCount)
            res.status(200).json({
                success: false,
                message: "Sua caixinha está vázia!"
            })

            res.status(200).json({
                success: true,
                content: rows
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async countBox(req,res){
        try {
            const content = await Model.count({
                where: {
                    person: req.person_current
                }
            });
            
            res.status(200).json({
                success: true,
                content: content
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                content: 'x'
            })
        }
    },
    async create(req,res){
        try {
            const join_data = Object.assign(req.body, {person: req.person_current})
            const content = await Model.create(join_data);
            if(!content)
            res.status(200).json({
                success: false,
                message: "Erro ao adicionar produto na caixinha!"
            })

            res.status(200).json({
                success: true,
                message: "Produto adicionado a caixinha!"
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
                    person: req.person_current
                }
            });
            if(!content)
            res.status(200).json({
                success: false,
                message: "Erro ao atualizar sua caixinha!"
            })

            res.status(200).json({
                success: true,
                message: "Alteração feita!"
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