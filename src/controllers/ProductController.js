const Product = require('../models/Product');

module.exports = {
    async store(req, res) {

        const product = req.body;

        const response = await Product.create(product)

        return res.json(response)
    },

    async index(req, res) {
        const result = await Product.find();

        return res.json(result);
    },
    async edit(req, res) {

        const product = req.body;

        const response = await Product.findOneAndUpdate({ id: product.id }, product).update();

        return res.json(response)

    },
    async delete(req, res) {
        const product = req.body;

        const response = await Product.findOneAndDelete({ id: product.id }, product);

        return res.json(response)
    },
}