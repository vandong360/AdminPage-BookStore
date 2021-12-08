import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import products from "./routes/product.route.js";
import orders from "./routes/order.route.js";
import auth from "./routes/auth.route.js";
import cart from "./routes/cart.route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 4000;
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rsm6n.mongodb.net/Boostore?retryWrites=true&w=majority`;

//connect to server
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()
app.use(express.json());
app.use(cors())

app.use("/", auth);
//for admin page
app.use("/dashboard", products);
app.use("/", orders);
//for app
app.use("/cart", cart);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    

