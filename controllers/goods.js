const Goods = require('../models/goods')

exports.getAll = async (req, res, next) => {
    try{
        const currentPage = req.query.page || 1;
        const perPage = req.query.perPage || 5;
        let totalItems;

        await Goods
            .find()
            .countDocuments()
            .then(count => {
                totalItems = count
                return Goods.find()
                    .skip((parseInt(currentPage)-1) * parseInt(perPage))
                    .limit(parseInt(perPage))
            })
            .then(result => {
                res.status(200).json({
                    message: "data gathered",
                    data: result,
                    total_item: parseInt(totalItems),
                    current_page: parseInt(currentPage)
                })
            })
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
    next();
}

exports.getId = async (req, res) => {
    res.send(res.goods)
}

exports.createData = async (req, res) => {
    const goods = new Goods({
        name: req.body.name,
        goodsToChannel: req.body.goodsToChannel
    })
    try{
        const newGoods = await goods.save()
        res.status(201).json(newGoods)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
}

exports.patch = async (req, res) => {
    if(req.body.name != null){
        res.goods.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.goods.subscribedToChannel = req.body.subscribedToChannel
    }
    try{
        const updatedGoods = await res.goods.save()
        res.json(updatedGoods)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

exports.deleteData = async (req, res) => {
    try {
        await res.goods.remove()
        res.send('Goods Deleted')
    }catch (err){
        res.status(500).json({message: err.message})
    }
}