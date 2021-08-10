const express = require('express')
const router= express.Router()
const Goods = require('../models/goods')
const goodsController = require('../controllers/goods')

// Get all
router.get('/', goodsController.getAll)

// Get one
router.get('/:id', getGoods, goodsController.getId)

// Create one
router.post('/', goodsController.createData)

// Update one
router.patch('/:id', getGoods, goodsController.patch)

// Delete one
router.delete('/:id', getGoods, goodsController.deleteData)


// Middleware
async function getGoods(req, res, next){
    let goods = await Goods.findById(req.params.id)
    try{
        if(goods == null){
            return res.status(404).json({message: "cant find goods"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.goods = goods
    next()
}

module.exports = router