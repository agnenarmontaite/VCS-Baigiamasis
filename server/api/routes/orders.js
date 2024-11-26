import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders retrieved successfully',
    })
    
})
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Orders registered successfully',
        order: order
    })

})
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    })

})
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    })

})

export default router;