const pg = require('../Database/connection_pg');

module.exports = {
    async find(req,res){
        const product = req.params.product_id;
        try {
            const content = await pg.query(`SELECT * FROM comment_complete where product=${product}`);
            console.log(content)
            if(!content.rowCount)
            res.status(200).json({
                success: false,
                message: "Nenhum registro encontrado"
            })

            res.status(200).json({
                success: true,
                content: content.rows
            })
        } catch (error) {
            res.status(400).json({message: error.message})
        }
   }
}