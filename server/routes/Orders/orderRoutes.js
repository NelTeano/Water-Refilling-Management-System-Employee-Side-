import { Router } from "express";
import orderModel from "../../models/Orders.js";

const OrderRoutes = Router();

// GET ALL ORDERS
OrderRoutes.get('/orders', async (req, res)=>{
    try {
        
        const getOrders = await orderModel.find({status: "confirmed"});
        res.json(getOrders);
        console.log("Successfully get the Orders")
        
    } catch (error) {
        res.status(500).json({ message: "Fetch Orders Failed " , error });
        console.log(error);
    }
});




// GET ORDER DIRECTION
OrderRoutes.get('/orders/:id', async (req, res)=>{

    const orderId = req.params.id;
    console.log(orderId)

    try {
        
        const order = await orderModel.findById({_id: orderId});

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.send(order);
    } catch (error) {
        res.status(500).json({ message: "Fetch Orders Failed " , error });
        console.log("Fetch Specific Orders")
    }
});

export default OrderRoutes;