const { Op } = require("sequelize")
const productModel = require("../Modal/productMOdel")

exports.addProduct = async (req, res) => {
    try {
        console.log('this is copy')
        const { pname, price, category, id } = req.body
        console.log("id=", id)
        const product = await productModel.create({
            Name: pname,
            Category: category,
            Price: price,
            RiyaReactAssignmentUserModelId: id
        })
        return res.status(200).json({ success: true, msg: "PRODUCT ADDED" })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "Error" })
    }
}

exports.getProduct = async (req, res) => {
    const { id } = req.query
    console.log(id)
    try {
        const product = await productModel.findAll({ where: { RiyaReactAssignmentUserModelId: id } })
        console.log("product=", product)
        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: 'Error' })
    }
}

exports.searchProduct = async (req, res) => {

    const { pname } = req.query
    console.log("pname=", pname)
    try {
        const product = await productModel.findAll({
            where: {
                [Op.and]: [
                    { RiyaReactAssignmentUserModelId: req.query.userId },
                    {
                        Name: {
                            [Op.like]: "%" + pname + "%"
                        }
                    }
                ]
            }
        })
        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: true, msg: "Error" })
    }
}

exports.updateProduct = async (req, res) => {
    const { dname, dprice, dcategory, d_id } = req.body
    console.log(dname, dprice, dcategory, d_id)
    try {
        const product = await productModel.update({
            Name: dname,
            Category: dcategory,
            Price: dprice
        },
            { where: { Id: d_id } })

        return res.status(200).json({ success: true, product: product })
    }
    catch (e) {
        return res.status(404).json({ success: false, msg: "Can't Update" })
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.query
    try {
        const product = await productModel.destroy({
            where: {
                Id: id
            }
        })
        return res.status(200).json({ success: true })
    }
    catch {
        return res.status(404).json({ success: false, msg: "Error" })
    }

}