const express = require('express');
const router = express.Router()
const Model = require('../model/order');
const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    next();
};
router.use(express.json())
router.use(cors)

router.get('/', (req, res) => {
    res.send("Cron")
})

router.get('/get_orders', async (req, res) => {
    try {
        const orders = await Model.find().sort({"sortFodder": -1})
        res.json(orders)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/save_order', async (req, res) => {
    let fullDateOrder = new Date()
    fullDateOrder.setTime(fullDateOrder.getTime() + 7 * 60 * 60 * 1000)
    let dateOrder = fullDateOrder.getDate()
    let monthOrder = fullDateOrder.getMonth() + 1
    let hourOrder = fullDateOrder.getHours()
    let minuteOrder = fullDateOrder.getMinutes()
    let secondOrder = fullDateOrder.getSeconds()
    if (dateOrder < 10) {
        dateOrder = "0" + dateOrder
    }
    if (monthOrder < 10) {
        monthOrder = "0" + monthOrder
    }
    if (hourOrder < 10) {
        hourOrder = "0" + hourOrder
    }
    if (minuteOrder < 10) {
        minuteOrder = "0" + minuteOrder
    }
    if (secondOrder < 10) {
        secondOrder = "0" + secondOrder
    }
    const order = new Model({
        sortFodder: fullDateOrder.getTime(),
        date: dateOrder + "/" + monthOrder + "/" + fullDateOrder.getFullYear() + " " 
                + hourOrder + ":" + minuteOrder + ":" + secondOrder,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        quantity: req.body.quantity,
        note: req.body.note,
        status: "Chưa giao hàng"
    })
    try {
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const result = await Model.findByIdAndUpdate(
            req.params.id, {status: req.body.status}, { new: true }
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;