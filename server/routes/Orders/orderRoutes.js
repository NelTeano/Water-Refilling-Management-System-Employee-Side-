import { Router } from "express";
import orderModel from "../../models/Orders.js";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";
const OrderRoutes = Router();

// GET ALL ORDERS

OrderRoutes.get("/orders", async (req, res) => {
  try {
    const getOrders = await orderModel.find({ status: "for delivery" });
    res.json(getOrders);
    console.log(getOrders);
    console.log("Successfully get the Orders");
  } catch (error) {
    res.status(500).json({ message: "Fetch Orders Failed ", error });
    console.log(error);
  }
});

OrderRoutes.put("/orders/:id", async (req, res) => {

  try {
    const orderId = new mongoose.Types.ObjectId(req.params.id);

    // Validate that the properties in req.body match the schema
  
    const orders = await orderModel.updateOne({_id: orderId},{ $set: {status: "delivered"} })
    
    res.send({
      message: "successfully delivered the orders",
      successful: true,
    });
    console.log("Successfully delivered the orders", orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET ORDER DIRECTION
OrderRoutes.get("/orders/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);

  try {
    const order = await orderModel.findById({ _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.send(order);
  } catch (error) {
    res.status(500).json({ message: "Fetch Orders Failed ", error });
    console.log("Fetch Specific Orders");
  }
});

export default OrderRoutes;
